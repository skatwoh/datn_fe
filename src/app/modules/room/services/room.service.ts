import {environment} from "../../../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {RoomModel} from "../../../models/room.model";

const API_AU_URL = `${environment.apiUrl}/phong`;

@Injectable({
  providedIn: 'root'
})
export class RoomService{
  constructor(private http: HttpClient) {
  }

  getRoomList(page: number, size: number): Observable<any> {
    const params = {page, size};
    return this.http.get<any>(`${API_AU_URL}/list`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  getRoomListOrder(page: number, size: number): Observable<any> {
    const params = {page, size};
    return this.http.get<any>(`${API_AU_URL}/list-room`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  getRoomListSearch(page: number, size: number, input: string): Observable<any> {
    const params = {page, size, input};
    return this.http.get<any>(`${API_AU_URL}/search`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  getListRoomSame(page: number, size: number, idPhong: any): Observable<any> {
    const params = {page, size, idPhong};
    return this.http.get<any>(`${API_AU_URL}/list-room-same`, {params}).pipe(map(res => {
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
    return this.http.put<any>(`${API_AU_URL}/delete`, data, {params});
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${API_AU_URL}/${id}`);
  }

  getRoomBySearch(page: number, size: number, searchInput: string): Observable<any> {
    const params = {page, size, searchInput};
    return this.http.get<any>(`${API_AU_URL}/get-room-by-string`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  getRoomMapping(checkIn: any, checkOut: any): Observable<any> {
    const params = {checkIn, checkOut};
    return this.http.get<any>(`${API_AU_URL}/list-mapper`, {params}).pipe(map(res => {
      return res;
    }))
  }

  // singleListRoomType() {
  //   this.http.get<any>(`${API_AU_URL}`).subscribe(data => {
  //     this.roomType = data; // Gán dữ liệu lấy được vào biến roomType
  //   });
  // }

  getOneMapping(id: any): Observable<any>{
    const params = {id};
    return this.http.get<any>(`${API_AU_URL}/get-by-id`, {params});
  }

  getSoLanDatPhong(id: any, checkIn: any, checkOut: any): Observable<any> {
    const params = { id, checkIn, checkOut };
    return this.http.get<any>(`${API_AU_URL}/get-so-lan-dat-phong`, { params })
  }

  getListDoiPhong(tenLoaiPhong: any, id: any, checkIn: any, checkOut: any): Observable<any> {
    const params = {tenLoaiPhong, id, checkIn, checkOut};
    return this.http.get<any>(`${API_AU_URL}/list-doi-phong`, {params}).pipe(map(res => {
      return res;
    }))
  }

  getListThemPhong(id: any, checkIn: any, checkOut: any): Observable<any> {
    const params = {id, checkIn, checkOut};
    return this.http.get<any>(`${API_AU_URL}/list-them-phong`, {params}).pipe(map(res => {
      return res;
    }))
  }
}
