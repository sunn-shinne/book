import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartData } from 'src/interfaces/ChartData';
import { ChartsService } from './charts.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  data!: CartData[];
  officeName!: string;
  isError = false;

  constructor(private chartsService: ChartsService) {}

  ngOnInit(): void {
    this.chartsService.getData().subscribe({
      next: (data) => {
        this.data = data;
        this.officeName = data[0].office_name;
      },
      error: () => {
        this.isError = true;
      },
    });
  }

  reloadPage() {
    window.location.reload();
  }
}
