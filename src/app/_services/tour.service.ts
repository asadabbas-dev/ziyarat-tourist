import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:5000/api/tour/';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  constructor(private http: HttpClient) {}

  getAllTour(): Observable<any> {
    return this.http.get(API_URL + 'getTours');
  }
}
