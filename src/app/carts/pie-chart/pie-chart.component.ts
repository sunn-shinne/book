import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CartData } from 'src/interfaces/ChartData';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent {
  @Input() data!: CartData[];
  @ViewChild('pie_chart') pieChartRef!: ElementRef;
  pieChart!: Chart;

  constructor() {}

  reduceData(data: CartData[]): number[] {
    const resArr = [0, 0, 0, 0];
    data.forEach((item) => {
      resArr[0] += item.qty_shk_cat1;
      resArr[1] += item.qty_shk_cat2;
      resArr[2] += item.qty_shk_cat3;
      resArr[3] += item.qty_shk_cat4;
    });
    return resArr;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.pieChart = new Chart(this.pieChartRef.nativeElement, {
        type: 'pie',
        data: {
          labels: ['Этап 1', 'Этап 2', 'Этап 3', 'Этап 4'],
          datasets: [
            {
              data: this.reduceData(this.data),
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
    }, 1000);
  }
}
