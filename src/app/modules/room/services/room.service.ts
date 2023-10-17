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

  create(data: any): Observable<any> {
    return this.http.post(`${API_AU_URL}/create`, data);
  }

  get(id: any): Observable<any> {
    const params = {id};
    return this.http.get<any>(`${API_AU_URL}/detail`, {params});
  }

  update(id: any, data: any): Observable<any> {
    const params = {id};
    return this.http.put(`${API_AU_URL}/update`, {params}, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${API_AU_URL}/${id}`);
  }

  // singleListRoomType() {
  //   this.http.get<any>(`${API_AU_URL}`).subscribe(data => {
  //     this.roomType = data; // Gán dữ liệu lấy được vào biến roomType
  //   });
  // }
}
