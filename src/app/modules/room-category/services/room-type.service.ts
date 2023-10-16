import {environment} from "../../../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {RoomTypeModel} from "../../../models/room-type.model";

const API_AU_URL = `${environment.apiUrl}/loai-phong`;

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {
  constructor(private http: HttpClient) {
  }

  getRoomTypeList(page: number, size: number): Observable<any> {
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

  get(id: number): Observable<RoomTypeModel> {
    const params = {id};
    return this.http.get<any>(`${API_AU_URL}/detail`, {params});
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${API_AU_URL}/update/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${API_AU_URL}/${id}`);
  }
}
