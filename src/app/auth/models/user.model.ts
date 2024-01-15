import { AuthModel } from './auth.model';

export class UserModel extends AuthModel {
  id: number | null;
  username: string| null;
  name: string | null;
  email: string | null;
  imageUrl: string | null;
  emailVerified: boolean | null;
  role: string | null;
  sdt: string | null;


  setUser(_user: unknown) {
    const user = _user as UserModel;
    this.id = user.id;
    this.username = user.username || '';
    this.email = user.email || '';
    this.imageUrl = user.imageUrl || './assets/media/users/default.jpg';
    this.emailVerified = false;
    this.role = user.role || '';
    this.sdt = user.sdt || '';
  }

  constructor() {
    super();
    this.id = null;
    this.username = null;
    this.name = null;
    this.email = null;
    this.imageUrl = null;
    this.emailVerified = null;
    this.role = null;
    this.sdt = null;
  }
}
