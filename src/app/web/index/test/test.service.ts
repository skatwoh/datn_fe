import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";

const API_AU_URL = `${environment.apiUrl}/dat-phong`;
@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) {
  }

  createBookings(datPhongDTOList: any[]): Observable<any> {
    return this.http.post<any>(`${API_AU_URL}/create-list-room-order`, datPhongDTOList)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return new Observable<never>();
  }
}
