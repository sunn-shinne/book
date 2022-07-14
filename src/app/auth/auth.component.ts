import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  activeUrl!: string;

  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.activeUrl = this.router.url;
  }

  signup(e: SubmitEvent) {
    e.preventDefault();
    console.log(this.signupForm.getRawValue());
    this.signupForm.reset();
    this.authService.someRequest();
  }

  login(e: SubmitEvent) {
    e.preventDefault();
    console.log(this.loginForm.getRawValue());
    this.loginForm.reset();
    this.authService.someRequest().subscribe({
      error: () => console.log('Am I a mock or not?..'),
    });
  }
}
