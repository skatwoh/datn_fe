import {environment} from "../../../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {RoomOrder} from "../../../models/room-order";

const API_AU_URL = `${environment.apiUrl}/dat-phong`;

@Injectable({
  providedIn: 'root'
})
export class RoomManagerService {
  constructor(private http: HttpClient) {
  }

  getListRoomManager(page: number, size: number): Observable<any> {
    const params = {page, size};
    return this.http.get<any>(`${API_AU_URL}/list`, {params}).pipe(map(res => {
      if (res.body && res.body) {
        return res.body;
      }
      return null;
    }));
  }

  // getRoomInformationListSearch(page: number, size: number, input: string): Observable<any> {
  //   const params = {page, size, input};
  //   return this.http.get<any>(`${API_AU_URL}/search`, {params}).pipe(map(res => {
  //     if (res.body && res.body) {
  //       return res.body;
  //     }
  //     return null;
  //   }));
  // }

  create(data: any): Observable<any> {
    return this.http.post(`${API_AU_URL}/create`, data);
  }

  get(id: any): Observable<RoomOrder> {
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

  exportPDF(id:any): Observable<any> {
    const params = {id};
    return this.http.get(`${API_AU_URL}/pdf/generate`, {params});
  }

  generateInvoice(id: any) {
    const params = {id};
    return this.http.get(`${API_AU_URL}/generate-bill`, {params})
      .pipe(
        map((response: any) => response.data),
        catchError((error: any) => throwError(error))
      );
  }
}
