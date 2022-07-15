import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CartData } from 'src/interfaces/ChartData';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: [],
})
export class LineChartComponent {
  @Input() data!: CartData[];
  @ViewChild('line_chart') lineChartRef!: ElementRef;
  lineChart!: Chart;

  constructor() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.lineChart = new Chart(this.lineChartRef.nativeElement, {
        type: 'line',
        data: {
          labels: this.data.map((item) => item.dt_date).sort(),
          datasets: [
            {
              label: 'Всего',
              data: this.data as [],
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
              data: this.data as [],
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
              data: this.data as [],
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
              data: this.data as [],
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
              data: this.data as [],
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
    }, 1000);
  }
}
