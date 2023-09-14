import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthModel} from '../models/auth.model';
import {UserModel} from '../models/user.model';
import {RegistrationModel} from '../models/registration.model';

const API_AUTH_URL = `${environment.apiUrl}/auth`;
const API_USER_URL = `${environment.apiUrl}/user`;

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {

  constructor(private http: HttpClient) {
  }

  signup(payload: RegistrationModel): Observable<any> {
    return this.http.post<UserModel>(`${API_AUTH_URL}/signup`, payload);
  }

  login(email: string, password: string): Observable<any> {
    const payload = {email, password};
    return this.http.post<AuthModel>(`${API_AUTH_URL}/login`, payload);
  }

  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_AUTH_URL}/forgot-password`, {email,});
  }

  getUserByToken(jwt: string): Observable<UserModel> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${jwt}`,
    });
    return this.http.get<UserModel>(`${API_USER_URL}/me`, {
      headers: httpHeaders,
    });
  }
}
