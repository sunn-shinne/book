import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  pagesCount!: number;
  pagesList: string[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    const routesCount: number | undefined = activatedRoute.routeConfig?.children?.length;
    this.pagesCount = routesCount ? routesCount - 1 : 0;
  }

  createList(count: number): string[] {
    return Array(count).fill(0).map((e, i) => (i + 1).toString());
  }

  ngOnInit(): void {
    this.pagesList = this.createList(this.pagesCount)
  }
}
