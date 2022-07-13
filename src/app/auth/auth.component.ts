import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  activeUrl!: string;

  constructor(private router: Router) {}

  ngOnInit() {
    this.activeUrl = this.router.url;
    console.log(this.router.url);
  }
}
