import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthModel} from "../../../auth/models/auth.model";

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

  setUser(id: number): Observable<any> {
    return this.http.put<any>(`${API_USER_URL}/${id}/set-permission-user`, {});
  }

  setAdmin(id: number): Observable<any> {
    return this.http.put<any>(`${API_USER_URL}/${id}/set-permission-admin`, {});
  }

  setGuest(id: number): Observable<any> {
    return this.http.put<any>(`${API_USER_URL}/${id}/set-permission-guest`, {});
  }

  getUsersDetail(email: string): Observable<any> {
    return this.http.get<any>(`${API_USER_URL}/detail/${email}`, {});
  }

  updatePassWord(email: any, data: any): Observable<any> {
    const params = {email};
    return this.http.post(`${environment.apiUrl}/auth/update-pass`, data, {params});
  }

  updatePass(email: string, password: string): Observable<any> {
    const payload = {email, password};
    return this.http.post<AuthModel>(`${environment.apiUrl}/auth/update-pass`, payload);
  }
}
