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

interface ExpandedElement extends Data {
  extendedData: ExtendedData;
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
  currentData = DATA.map((item: Data, i: number) => ({
    ...item,
    extendedData: EXTENDED_DATA[i],
  }));
  dataSource = new MatTableDataSource(this.currentData);
  displayColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayColumnsWithExpand = [...this.displayColumns, 'expand'];
  expandedElement!: ExpandedElement | null;

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  ngOnInit(): void {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ExpandedElement>;

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
    const randomElIndex = Math.floor(Math.random() * this.currentData.length);
    const randomItem = _.cloneDeep(this.currentData[randomElIndex]);
    this.currentData.push(randomItem);
    this.dataSource = new MatTableDataSource(this.currentData);
    this.table.renderRows();
    this.initSort();
  }

  removeData() {
    this.currentData.pop();
    this.dataSource = new MatTableDataSource(this.currentData);
    this.table.renderRows();
    this.initSort();
  }
}
