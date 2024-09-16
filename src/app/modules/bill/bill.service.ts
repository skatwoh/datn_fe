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

  checkOutMuon(id: any, data: any): Observable<any> {
    const params = {id};
    return this.http.put<any>(`${environment.apiUrl}/dat-phong/check-out-muon`, data, {params});
  }

  deleteBill(): Observable<any> {
    return this.http.post(`${API_AU_URL}/delete`, null);
  }

  getBillsBySearch(page: number, size: number, input: string, trangThai: any, startDate: any, endDate: any): Observable<any> {
    const params = {page, size, input, trangThai, startDate, endDate};
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

  updateRankKhachHang(id: any, data: any ) :Observable<any>{
    const params = {id};
    return this.http.post<any>(`${API_AU_URL}/up-rank-customer`,data, {params});
  }

  getTongTienByKhachHang(id : any): Observable<any> {
    const params = {id};
    return this.http.get(`${API_AU_URL}/get-tong-tien-by-customer`, {params});
  }

  getBillsByCustomer(page: number, size: number, id: any): Observable<any> {
    const params = {page, size, id};
    return this.http.get<any>(`${API_AU_URL}/find-by-customer`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  getDatPhongByKH(page: number, size: number, id: any): Observable<any> {
    const params = {page, size, id};
    return this.http.get<any>(`${environment.apiUrl}/dat-phong/list-order-of-customer`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  updateTienCoc(id: any, tienCoc: any) :Observable<any>{
    const params = {id};
    return this.http.post<any>(`${API_AU_URL}/update-tien-coc`,tienCoc, {params});
  }

  huyDichVu(id: any): Observable<any> {
    const params = {id};
    return this.http.delete(`${environment.apiUrl}/chi-tiet-dich-vu/delete`, {params});
  }

  updateTienPhat(id: any, tienCoc: any) :Observable<any>{
    const params = {id};
    return this.http.post<any>(`${API_AU_URL}/update-tien-phat`,tienCoc, {params});
  }

  updateTienDichVu(id: any, tienDichVu: any) :Observable<any>{
    const params = {id};
    return this.http.post<any>(`${API_AU_URL}/update-tien-dich-vu`,tienDichVu, {params});
  }

  updateTienPhong(id: any, tienPhong: any) :Observable<any>{
    const params = {id};
    return this.http.post<any>(`${API_AU_URL}/update-tien-phong`,tienPhong, {params});
  }

  updateTienTichDiem(id: any, tienTichDiem: any) :Observable<any>{
    const params = {id};
    return this.http.post<any>(`${API_AU_URL}/update-tien-tich-diem`,tienTichDiem, {params});
  }

  updateTienHoanLai(id: any, tienHoanLai: any) :Observable<any>{
    const params = {id};
    return this.http.post<any>(`${API_AU_URL}/update-tien-hoan-lai`,tienHoanLai, {params});
  }

  getBillsXacNhan(page: number, size: number): Observable<any> {
    const params = {page, size};
    return this.http.get<any>(`${API_AU_URL}/list-xac-nhan`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  updateTienHoaDon(id: any, data: any) :Observable<any>{
    const params = {id};
    // const data = {tongTien, tienCoc, tienDichVu}
    return this.http.post<any>(`${API_AU_URL}/update-tien-hoa-don`, data, {params});
  }

}
