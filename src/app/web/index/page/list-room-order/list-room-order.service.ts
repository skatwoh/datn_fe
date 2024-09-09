import {environment} from "../../../../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

const API_AU_URL = `${environment.apiUrl}/dat-phong`;

@Injectable({
  providedIn: 'root'
})
export class ListRoomOrderService{
  constructor(private http: HttpClient) {
  }

  getListRoomOrder(page: number, size: number, id: any): Observable<any> {
    const params = {page, size, id};
    return this.http.get<any>(`${API_AU_URL}/list-room-order-by-user`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }
  getListRoomByUpperPrice(page: number, size: number, giaPhong: any, checkIn: any, checkOut: any, id: any): Observable<any> {
    const params = {page, size, giaPhong, checkIn, checkOut, id};
    return this.http.get<any>(`${API_AU_URL}/list-room-order-by-upper-price`, {params}).pipe(map(res => {
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

  updateStatus(id: any, data: number): Observable<any> {
    const params = {id};
    return this.http.put<any>(`${API_AU_URL}/update-status`, data, {params});
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${API_AU_URL}/${id}`);
  }

  // singleListRoomType() {
  //   this.http.get<any>(`${API_AU_URL}`).subscribe(data => {
  //     this.roomType = data; // Gán dữ liệu lấy được vào biến roomType
  //   });
  // }
  getLichSuDatPhong(page: number, size: number, id: any): Observable<any> {
    const params = {page, size, id};
    return this.http.get<any>(`${API_AU_URL}/lich-su-dat-phong`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  getRoomOfBill(page: number, size: number, userId: any): Observable<any> {
    const params = {page, size, userId};
    return this.http.get<any>(`${API_AU_URL}/list-room-of-bill`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  listRoomBooks(cccd: any): Observable<any> {
    const params = {cccd};
    return this.http.post<any>(`${API_AU_URL}/list-room-books`, params)
  }

  updateCheckout(id: any, checkOut: any, checkIn: any, idPhong: any): Observable<any> {
    const params = {id, checkOut, checkIn, idPhong};
    return this.http.put(`${API_AU_URL}/update-checkout`, params);
  }

  listCustomerUseRoom(): Observable<any> {
    return this.http.get<any>(`${API_AU_URL}/customer-use-room`);
  }
}
