import {environment} from "../../../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AccountUserModel} from "../../../models/account-user.model";

const API_AU_URL = `${environment.apiUrl}/tai-khoan`;

@Injectable({
  providedIn: 'root'
})
export class AccountUserService{
  constructor(private http: HttpClient) {
  }

  getAccountUserList(page: number, size: number): Observable<any> {
    const params = {page, size};
    return this.http.get<any>(`${API_AU_URL}/list`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  get(id: number): Observable<AccountUserModel> {
    const params = {id};
    return this.http.get<any>(`${API_AU_URL}/detail`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }
}
