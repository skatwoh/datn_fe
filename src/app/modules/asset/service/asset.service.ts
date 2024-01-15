import {environment} from "../../../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

const API_AU_URL = `${environment.apiUrl}/tai-san`;

@Injectable({
  providedIn: 'root'
})
export class AssetService{
  [x: string]: any;
  constructor(private http: HttpClient) {
  }

  getAssetList(page: number, size: number): Observable<any> {
    const params = {page, size};
    return this.http.get<any>(`${API_AU_URL}/list`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }
  create(data: any): Observable<any> {
    return this.http.post(`${API_AU_URL}/create`, data);
  }

  get(id: any): Observable<any> {
    const params = {id};
    return this.http.get<any>(`${API_AU_URL}/detail`, {params});
  }

  update(id: any, data: any): Observable<any> {
    const params = {id};
    return this.http.put(`${API_AU_URL}/update`, data, {params});
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${API_AU_URL}/${id}`);
  }
  getAssetListSearch(page: number, size: number, input: string): Observable<any> {
    const params = {page, size, input};
    return this.http.get<any>(`${API_AU_URL}/search`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }
  updateStatus(id: any, data: number): Observable<any> {
    const params = {id};
    return this.http.put<any>(`${API_AU_URL}/delete`, data, {params});
  }
}
