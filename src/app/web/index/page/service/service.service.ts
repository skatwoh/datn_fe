import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "../../../../../environments/environment";


const API_AU_URL = `${environment.apiUrl}/thong-bao`;
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getListNoti(page: number, size: number, userId: any): Observable<any> {
    const params = {page, size, userId};
    return this.http.get<any>(`${API_AU_URL}/list-notification`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }
}
