import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";

const API_AU_URL = `${environment.apiUrl}/phong`;
const API = `${environment.apiUrl}/dat-phong`;
@Injectable({
  providedIn: 'root'
})
export class CaseService {
  constructor(private http: HttpClient) {
  }

  getRoomOfFloar(page: number, size: number): Observable<any> {
    const params = {page, size};
    return this.http.get<any>(`${API_AU_URL}/list-room-of-floar`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  createBookings(datPhongDTOList: any[]): Observable<any> {
    return this.http.post<any>(`${API}/create-list-room-order`, datPhongDTOList)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return new Observable<never>();
  }

  getRoomActive(page: number, size: number, checkIn: any, checkOut: any): Observable<any> {
    const params = {page, size, checkIn, checkOut};
    return this.http.get<any>(`${API_AU_URL}/list-room-active`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }
}
