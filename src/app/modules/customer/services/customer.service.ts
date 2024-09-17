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

  create(data: any): Observable<any> {
    return this.http.post(`${API_AU_URL}/create`, data);
  }

  getIdByCCCD(cccd: any): Observable<any>{
    const params = {cccd};
    return this.http.get<any>(`${API_AU_URL}/find-by-cccd`, {params});
  }

  getKhachHangByUser(id: any): Observable<any>{
    const params = {id};
    return this.http.get<any>(`${API_AU_URL}/get-khach-hang-by-user`, {params});
  }
  updateCustomer(id: any, data: any): Observable<any> {
    const params = {id};
    return this.http.put(`${API_AU_URL}/update-customer`, data, {params});
  }

  updateTichDiem(ghiChu: any, id : any): Observable<any> {
    const params = {id};
    return this.http.put(`${API_AU_URL}/update-ghi-chu`, ghiChu, {params});
  }

  tinhLaiGiamGia(ghiChu: any, id : any): Observable<any> {
    const params = {id};
    return this.http.put(`${API_AU_URL}/tinh-lai-giam-gia`, ghiChu, {params});
  }

  getListKHBySearch(page: number, size: number, inputSearch: string): Observable<any> {
    const params = {page, size, inputSearch};
    return this.http.get<any>(`${API_AU_URL}/list-by-search`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  sendPointsToCustommer(id: any): Observable<any>{
    const params = {id};
    return this.http.get<any>(`${API_AU_URL}/send-point-to-customer`, {params});
  }

}
