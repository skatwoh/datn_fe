export class AccountUserModel{
  id: number | undefined;
  ten: string | undefined;
  email: string | undefined;
  matKhau: string | undefined;
  trangThai: number | undefined;
  maKhachHang: string | undefined;


  constructor(id: number | undefined, ten: string | undefined, email: string | undefined, matKhau: string | undefined, trangThai: number | undefined, maKhachHang: string | undefined) {
    this.id = id;
    this.ten = ten;
    this.email = email;
    this.matKhau = matKhau;
    this.trangThai = trangThai;
    this.maKhachHang = maKhachHang;
  }
}
