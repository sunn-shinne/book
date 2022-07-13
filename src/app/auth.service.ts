import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  someRequest() {
    this.http.get('httрs://ya.ru/').subscribe({
      error: () => console.log('Am I a mock or not?..'),
    });
  }
}
