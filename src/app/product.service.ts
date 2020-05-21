import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Car } from './car.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private carsUrl = 'assets/api/cars-small.json';

  constructor(private http: HttpClient) {}

  public getCars(): Observable<Car[]> {

      return this.http.get<Car[]>(this.carsUrl)
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    return throwError(errorMessage);
  }
}
