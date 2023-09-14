import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

const API_USER_URL = `${environment.apiUrl}/user`;

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {
  }

  getUserList(page: number, size: number): Observable<any> {
    const params = {page, size};
    return this.http.get<any>(`${API_USER_URL}/list`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  manualActiveUser(id: number): Observable<any> {
    return this.http.put<any>(`${API_USER_URL}/${id}/manual-active`, {});
  }

  getUsersDetail(email: string): Observable<any> {
    const params = {email};
    return this.http.get<any>(`${API_USER_URL}/detail/${email}`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }
}
