import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "../../../../../environments/environment";

const API_AU_URL = `${environment.apiUrl}/phong`;

@Injectable({
  providedIn: 'root'
})
export class HomeService{
  constructor(private http: HttpClient) {
  }

  // getRoomList(page: number, size: number): Observable<any> {
  //   const params = {page, size};
  //   return this.http.get<any>(`${API_AU_URL}/list`, {params}).pipe(map(res => {
  //     if (res.body && res.body) {
  //       return res.body;
  //     }
  //     return null;
  //   }));
  // }

  getRoomListSearch(page: number, size: number, soLuongNguoi: string, input: string, checkIn: string, checkOut: string, minGia: any, maxGia: any): Observable<any> {
    const params = {page, size, soLuongNguoi, input, checkIn, checkOut, minGia, maxGia};
    return this.http.get<any>(`${API_AU_URL}/get-room-by-search`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  getListTopRoomBooking(page: number, size: number): Observable<any> {
    const params = {page, size};
    return this.http.get<any>(`${API_AU_URL}/list-top-room-booking`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

}
