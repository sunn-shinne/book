import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { registerables } from 'chart.js';
import { ChartData } from 'src/interfaces/ChartData';
import { ChartsService } from './charts.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  @ViewChild('line_chart') lineChartRef!: ElementRef;
  @ViewChild('pie_chart') pieChartRef!: ElementRef;

  data!: ChartData[];
  officeName!: string;
  isError = false;

  constructor(private chartsService: ChartsService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.chartsService.getData().subscribe({
      next: (data) => {
        console.log(data);
        this.data = data;
        this.officeName = data[0].office_name;
      },
      error: () => {
        this.isError = true;
      },
      complete: () => {
        this.createLineChart();
        this.createPieChart();
      },
    });
  }

  reloadPage() {
    window.location.reload();
  }

  createLineChart() {
    const lineChartEl = this.lineChartRef.nativeElement;

    new Chart(lineChartEl, {
      type: 'line',
      data: {
        labels: this.data.map((item: ChartData) => item.dt_date).sort(),
        datasets: [
          {
            label: 'Всего',
            data: this.data,
            parsing: {
              xAxisKey: 'dt_date',
              yAxisKey: 'qty_shk',
            },
            backgroundColor: 'rgba(224, 47, 47, .8)',
            borderColor: 'rgb(224, 47, 47)',
            tension: 0.5,
          },
          {
            label: 'Этап 1',
            data: this.data,
            parsing: {
              xAxisKey: 'dt_date',
              yAxisKey: 'qty_shk_cat1',
            },
            backgroundColor: 'rgba(230, 255, 3, .8)',
            borderColor: 'rgb(230, 255, 3)',
            tension: 0.5,
          },
          {
            label: 'Этап 2',
            data: this.data,
            parsing: {
              xAxisKey: 'dt_date',
              yAxisKey: 'qty_shk_cat2',
            },
            backgroundColor: 'rgba(47, 224, 86, .8)',
            borderColor: 'rgb(47, 224, 86)',
            tension: 0.5,
          },
          {
            label: 'Этап 3',
            data: this.data,
            parsing: {
              xAxisKey: 'dt_date',
              yAxisKey: 'qty_shk_cat3',
            },
            backgroundColor: 'rgba(50, 47, 224, .8)',
            borderColor: 'rgb(50, 47, 224)',
            tension: 0.5,
          },
          {
            label: 'Этап 4',
            data: this.data,
            parsing: {
              xAxisKey: 'dt_date',
              yAxisKey: 'qty_shk_cat4',
            },
            backgroundColor: 'rgba(145, 47, 224, .8)',
            borderColor: 'rgb(145, 47, 224)',
            tension: 0.5,
          },
        ],
      },
      options: {
        scales: {
          y: {
            min: 0,
            max: 30000,
          },
        },
      },
    });
  }

  createPieChart() {
    const pieChartEl = this.pieChartRef.nativeElement;

    new Chart(pieChartEl, {
      type: 'pie',
      data: {
        labels: ['Этап 1', 'Этап 2', 'Этап 3', 'Этап 4'],
        datasets: [
          {
            data: this.prepareDataforPieChart(this.data),
            backgroundColor: [
              'rgb(230, 255, 3)',
              'rgb(47, 224, 86)',
              'rgb(50, 47, 224)',
              'rgb(145, 47, 224)',
            ],
            hoverOffset: 4,
          },
        ],
      },
    });
  }

  prepareDataforPieChart(data: ChartData[]): number[] {
    const res = [0, 0, 0, 0];
    data.forEach((item) => {
      res[0] += item.qty_shk_cat1;
      res[1] += item.qty_shk_cat2;
      res[2] += item.qty_shk_cat3;
      res[3] += item.qty_shk_cat4;
    });
    return res;
  }
}
