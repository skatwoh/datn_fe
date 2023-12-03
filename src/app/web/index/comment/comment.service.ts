import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = 'https://643eafd46c30feced8304742.mockapi.io/skatwoh/comment';

  constructor(private http: HttpClient) { }

  getComments(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addComment(comment: any): Observable<any> {
    return this.http.post(this.apiUrl, comment);
  }

  getRecentComments(count: number): Observable<Comment[]> {
    const url = `${this.apiUrl}?_limit=${count}&_sort=createdAt&_order=desc`;
    return this.http.get<Comment[]>(url);
  }
}
