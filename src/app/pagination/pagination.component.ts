import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() pagesCount?: number;
  selectedPage: number = 1;
  pagesList: number[] = []

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.pagesList = Array(this.pagesCount).fill(0).map((e, i) => i + 1);
  }

  ngDoCheck() {
    this.setSelectedPage();
  }

  setSelectedPage() {
    const splitedUrl = this.router.url.split('/');
    const currentPage = Number(splitedUrl[splitedUrl.length - 1])
    this.selectedPage = currentPage;
  }
}
