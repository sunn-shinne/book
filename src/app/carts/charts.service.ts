import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { CartData } from 'src/interfaces/ChartData';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http
      .get<{ data: CartData[] }>(
        'https://jsonproject-53629-default-rtdb.firebaseio.com/get-assembly.json'
      )
      .pipe(map((response) => response.data));
  }
}
