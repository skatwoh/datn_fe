import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

const API_AU_URL = `${environment.apiUrl}/hoa-don`;

@Injectable({
  providedIn: 'root'
})
export class BillService{
  constructor(private http: HttpClient) {
  }

  getBillList(page: number, size: number): Observable<any> {
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

  // updateStatus(id: any, data: number): Observable<any> {
  //   const params = {id};
  //   return this.http.put<any>(`${API_AU_URL}/delete`, data, {params});
  // }

  create(data: any): Observable<any> {
    return this.http.post(`${API_AU_URL}/create`, data);
  }

  createOrUpdate(data: any): Observable<any> {
    return this.http.post(`${API_AU_URL}/create-or-update`, data);
  }

  updateTongTien(data: any): Observable<any> {
    return this.http.put(`${API_AU_URL}/update-tong-tien`, data);
  }

  updateStatus(id: any, data: any): Observable<any> {
    const params = {id};
    return this.http.put<any>(`${API_AU_URL}/update-status`, data, {params});
  }

  exportPDF(id:any): Observable<any> {
    const params = {id};

    return this.http.get(`${API_AU_URL}/generate-hoa-don`, {params});
  }

  getDatPhongByHoaDon(page: number, size: number, id: any): Observable<any> {
    const params = {page, size, id};
    return this.http.get<any>(`${environment.apiUrl}/dat-phong/list-order-of-bill`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  updateStatusRoomOrder(id: any, data: any): Observable<any> {
    const params = {id};
    return this.http.put<any>(`${environment.apiUrl}/dat-phong/update-stt`, data, {params});
  }

  deleteBill(data: any): Observable<any> {
    return this.http.post(`${API_AU_URL}/delete`, data);
  }

  getBillsBySearch(page: number, size: number, input: string): Observable<any> {
    const params = {page, size, input};
    return this.http.get<any>(`${API_AU_URL}/list-by-search`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  createOrUpdateTaiQuay(data: any): Observable<any> {
    return this.http.post(`${API_AU_URL}/create-or-update-tai-quay`, data);
  }

  addDichVu(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/chi-tiet-dich-vu/create`, data);
  }

  getAllChiTietDichVuByDatPhong(page: number, size: number,id: any): Observable<any> {
    const params = {page, size, id};
    return this.http.get<any>(`${environment.apiUrl}/chi-tiet-dich-vu/list-by-dat-phong`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  tinhTienDichVu(id: any, data: any): Observable<any> {
    const params = {id};
    return this.http.put(`${API_AU_URL}/tinh-tien-dich-vu`, data, {params});
  }
}
