import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  showLogoutBtn: boolean = false;
  constructor(private authService: AuthService) {
    this.authService
      .isLoggedIn()
      .subscribe((isLoggedIn) => (this.showLogoutBtn = isLoggedIn));
  }

  logout() {
    this.authService.SignOut();
  }

  ngOnInit(): void {}
}
