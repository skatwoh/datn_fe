import {environment} from "../../../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {RoomInformationModel} from "../../../models/room-information.model";

const API_AU_URL = `${environment.apiUrl}/chi-tiet-phong`;

@Injectable({
  providedIn: 'root'
})
export class RoomInformationService {
  constructor(private http: HttpClient) {
  }

  getRoomInformationList(page: number, size: number): Observable<any> {
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

  get(id: number): Observable<RoomInformationModel> {
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
