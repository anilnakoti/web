import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RewardsService {
  apiUrl = `https://api.springuplabs.com/api/nomination`;
  constructor(private _http: HttpClient) {}

  getNomination(empID: any): Observable<any> {
    return this._http.get(`${this.apiUrl}/${empID}`);
  }

  createNomination(nominations: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/create`, nominations);
  }

  getAllNomination(): Observable<any> {
    return this._http.get(`${this.apiUrl}`);
  }
}
