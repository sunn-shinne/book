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
  authProccessState = 'entering';
  errorMessage: string | null = null;

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
    const { email, password, name } = this.signupForm.getRawValue();
    this.authProccessState = 'loading';

    this.authService
      .SignUp(email!, password!)
      .then(() => {
        this.authProccessState = 'fulfilled';
        this.errorMessage = null;
      })
      .then(() => this.authService.SetUserName(name!))
      .catch((e) => {
        this.authProccessState = 'failed';
        this.errorMessage = this.authService.GetErrorMessage(e.code);
      });
  }

  login(e: SubmitEvent) {
    e.preventDefault();
    const { email, password } = this.loginForm.getRawValue();
    this.authProccessState = 'loading';

    this.authService
      .SignIn(email!, password!)
      .then(() => {
        this.authProccessState = 'fulfilled';
        this.errorMessage = null;
      })
      .catch((e) => {
        this.authProccessState = 'failed';
        this.errorMessage = this.authService.GetErrorMessage(e.code);
      });
  }
}
