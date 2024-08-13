export class BillModel{
  id: number | undefined ;
  ma: string | undefined ;
  ngayTao: string | undefined;
  ngayThanhToan: string | undefined;
  tongTien?: number ;
  trangThai: number | undefined;
  ghiChu: string | undefined;
  idKhachHang: number | undefined;
  tenKhachHang: string | undefined;
  tienCoc: number = 0;
  thoiGianCoc: string | undefined;
  tienPhong: number = 0;
  tienDichVu: number = 0;
  tienPhat: number = 0;
  tienTichDiem: number = 0;
  tienThanhToan: number = 0;
  tienHoanLai: number = 0;
}
