import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = 'https://657557d7b2fbb8f6509cff56.mockapi.io/image';

  constructor(private http: HttpClient) { }

  getAvatarUrls(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
