import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "../../../../../environments/environment";
import {VisitorModel} from "../../../../models/visitor.model";


const API_AU_URL = `${environment.apiUrl}/thong-bao`;
const API_RES = `${environment.apiUrl}/api`;
const API_AUTH_URL = `${environment.apiUrl}/auth`;
const API_URL = `${environment.apiUrl}/phong`;
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getListNoti(page: number, size: number, userId: any): Observable<any> {
    const params = {page, size, userId};
    return this.http.get<any>(`${API_AU_URL}/list-notification`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  sendNotification(data: any): Observable<any> {
    return this.http.post(`${API_AU_URL}/send-notification`, data);
  }

  updatePassword(data: any): Observable<any> {
    return this.http.put(`${API_AUTH_URL}/update-password`, data);
  }

  recordVisit(page: string, ipAddress: string) {
    const visitorRequest: VisitorModel = { page, ipAddress };
    return this.http.post(`${API_RES}/record-visit`, visitorRequest);
  }

  getUniqueVisitorsCount(page: string) {
    return this.http.get<number>(`${API_RES}/get-unique-visitors-count?page=${page}`);
  }

  getVisitCount(page: string) {
    return this.http.get<number>(`${API_RES}/get-visit-count?page=${page}`);
  }
  getListByTienIch(page: number, size: number, searchInput: any[], soLuongNguoi: any, input: any , checkIn: any,checkOut: any): Observable<any> {
    const params = {page, size, searchInput,soLuongNguoi,input,checkIn,checkOut};
    return this.http.get<any>(`${API_URL}/get-room-by-tienIch`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  getDoanhThuByTime(checkIn: string, checkOut: string){
    const params = {checkIn, checkOut};
    return this.http.get<any>(`${environment.apiUrl}/hoa-don/doanh-thu-by-day`, {params});
  }

  getDoanhThuByDay(year: any, month: any, day: any){
    const params = {year, month, day};
    return this.http.get<any>(`${environment.apiUrl}/hoa-don/doanh-thu-by-to-day`, {params});
  }

  getDoanhThuByMonth(year: any, month: any){
    const params = {year, month};
    return this.http.get<any>(`${environment.apiUrl}/hoa-don/doanh-thu-by-month`, {params});
  }

  getDoanhThuByYear(year: any){
    const params = {year};
    return this.http.get<any>(`${environment.apiUrl}/hoa-don/doanh-thu-by-year`, {params});
  }

  getAllDoanhThu(){
    return this.http.get<any>(`${environment.apiUrl}/hoa-don/all-doanh-thu`);
  }

  getSoPhongDaDat(checkIn: string, checkOut: string){
    const params = {checkIn, checkOut};
    return this.http.get<any>(`${environment.apiUrl}/dat-phong/so-phong-da-dat`, {params});
  }

  getSoPhongDaDatByToDay(year: any, month: any, day: any){
    const params = {year, month, day};
    return this.http.get<any>(`${environment.apiUrl}/dat-phong/so-phong-da-dat-by-day`, {params});
  }

  getSoPhongDaDatByMonth(year: any, month: any){
    const params = {year, month};
    return this.http.get<any>(`${environment.apiUrl}/dat-phong/so-phong-da-dat-by-month`, {params});
  }

  getSoPhongDaDatByYear(year: any){
    const params = {year};
    return this.http.get<any>(`${environment.apiUrl}/dat-phong/so-phong-da-dat-by-year`, {params});
  }

  getCountChiTietDichVu(checkIn: string, checkOut: string){
    const params = {checkIn, checkOut};
    return this.http.get<any>(`${environment.apiUrl}/chi-tiet-dich-vu/get-count`, {params});
  }

  getCountDichVuByToDay(year: any, month: any, day: any){
    const params = {year, month, day};
    return this.http.get<any>(`${environment.apiUrl}/chi-tiet-dich-vu/get-count-by-day`, {params});
  }

  getCountDichVuByMonth(year: any, month: any){
    const params = {year, month};
    return this.http.get<any>(`${environment.apiUrl}/chi-tiet-dich-vu/get-count-by-month`, {params});
  }

  getCountDichVuByYear(year: any){
    const params = {year};
    return this.http.get<any>(`${environment.apiUrl}/chi-tiet-dich-vu/get-count-by-year`, {params});
  }
}
