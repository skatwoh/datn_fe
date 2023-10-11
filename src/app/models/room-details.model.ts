import { RoomCategoryModel } from "./room-category.model";

export interface RoomDetailsModel{
  id: string;
  tang: string;
  tienIch: string;
  dichVu: string;
  soLuongNguoi: number;
  dienTich: number;
  trangThai: number;
  idLoaiPhong: string;
  tenLoaiPhong: string;
}
