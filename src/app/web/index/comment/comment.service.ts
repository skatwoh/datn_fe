import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";

const apiUrl = `${environment.apiUrl}/feed-back`;
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  // private apiUrl = 'https://643eafd46c30feced8304742.mockapi.io/skatwoh/comment';

  constructor(private http: HttpClient) { }

  // getComments(): Observable<any> {
  //   return this.http.get(this.apiUrl);
  // }

  getComments(page: number, size: number, idChiTietPhong: any): Observable<any> {
    const params = {page, size, idChiTietPhong};
    return this.http.get<any>(`${apiUrl}/list`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  // addComment(comment: any): Observable<any> {
  //   return this.http.post(this.apiUrl, comment);
  // }

  addComment(data: any): Observable<any> {
    return this.http.post(`${apiUrl}/create`, data);
  }

  count(): Observable<any> {
    return this.http.get(`${apiUrl}/count`);
  }
}
