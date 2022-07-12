import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import DATA from '../data';
import EXTENDED_DATA from '../extended-data';
import { Data } from 'src/interfaces/Data';
import { ExtendedData } from 'src/interfaces/ExtendedData';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import * as _ from 'lodash';

interface FullElement extends Data {
  extendedData: ExtendedData[];
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class TableComponent implements OnInit {
  fullData!: FullElement[];
  dataSource!: MatTableDataSource<FullElement>;

  displayColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayColumnsWithExpand = [...this.displayColumns, 'expand'];
  expandedElement!: FullElement | null;

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  ngOnInit(): void {
    this.fullData = DATA.map((item: Data) => ({
      ...item,
      extendedData: EXTENDED_DATA,
    }));
    this.dataSource = new MatTableDataSource(this.fullData);
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Element>;

  initSort() {
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.initSort();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  addData() {
    const randomElIndex = Math.floor(Math.random() * this.fullData.length);
    const randomItem = _.cloneDeep(this.fullData[randomElIndex]);
    this.fullData.push(randomItem);
    this.dataSource = new MatTableDataSource(this.fullData);
    this.table.renderRows();
    this.initSort();
  }

  removeData() {
    this.fullData.pop();
    this.dataSource = new MatTableDataSource(this.fullData);
    this.table.renderRows();
    this.initSort();
  }
}
