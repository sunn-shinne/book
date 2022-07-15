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

  reduceDataforCart(data: CartData[]): number[] {
    const res = [0, 0, 0, 0];
    data.forEach((item) => {
      res[0] += item.qty_shk_cat1;
      res[1] += item.qty_shk_cat2;
      res[2] += item.qty_shk_cat3;
      res[3] += item.qty_shk_cat4;
    });
    return res;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.pieChart = new Chart(this.pieChartRef.nativeElement, {
        type: 'pie',
        data: {
          labels: ['Этап 1', 'Этап 2', 'Этап 3', 'Этап 4'],
          datasets: [
            {
              data: this.reduceDataforCart(this.data),
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
