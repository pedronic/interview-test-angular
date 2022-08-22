import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import IAppointment from '../models/appointment.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_URL = 'api/';

  constructor(private http: HttpClient) {}

  public getChannels(): Observable<any> {
    return this.http.get(`${this.API_URL}channels`);
  }

  public getSchedules(): Observable<any> {
    return this.http.get(`${this.API_URL}schedules`);
  }

  public postSchedules(body: IAppointment): Observable<any> {
    return this.http.post(`${this.API_URL}schedules`, body, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json'
    });
  }
}
