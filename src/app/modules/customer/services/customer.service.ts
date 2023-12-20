import {environment} from "../../../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

const API_AU_URL = `${environment.apiUrl}/khach-hang`;

@Injectable({
  providedIn: 'root'
})
export class CustomerService{
  constructor(private http: HttpClient) {
  }

  getCustomerList(page: number, size: number): Observable<any> {
    const params = {page, size};
    return this.http.get<any>(`${API_AU_URL}/list`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  get(id: any): Observable<any> {
    const params = {id};
    return this.http.get<any>(`${API_AU_URL}/detail`, {params});
  }

  update(id: any, data: any): Observable<any> {
    const params = {id};
    return this.http.put(`${API_AU_URL}/update`, data, {params});
  }
}
