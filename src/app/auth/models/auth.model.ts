export class AuthModel {
  accessToken: string;
  refreshToken: string;
  tokenType: string;

  setAuth(auth: AuthModel) {
    this.accessToken = auth.accessToken;
    this.refreshToken = auth.refreshToken;
    this.tokenType = auth.tokenType;
  }

  constructor() {
    this.accessToken = '';
    this.refreshToken = '';
    this.tokenType = '';
  }
}
