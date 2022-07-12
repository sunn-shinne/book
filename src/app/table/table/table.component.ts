import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
// import { ExtendedData } from 'src/interfaces/ExtendedData';
// import EXTENDED_DATA from '../extended-data';
import DATA from '../data';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  data = new MatTableDataSource(DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  ngOnInit(): void {}

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.data.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
