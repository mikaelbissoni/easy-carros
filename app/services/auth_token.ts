import jwtDecode from "jwt-decode";

export type DecodedToken = {
  readonly email: string;
  readonly exp: number;
}

export class AuthToken {
  readonly decodedToken: DecodedToken;
  readonly authorizationString: string;
  readonly expiresAt: Date | null;

  constructor(readonly token?: string) {
    this.decodedToken = { email: "", exp: 0 };
    this.authorizationString = '';
    this.expiresAt = null;
    
    try {
      if (token) {
        this.decodedToken = jwtDecode(token);
        this.authorizationString = `Bearer ${token}`;
        this.expiresAt = new Date(this.decodedToken.exp * 1000);
      }
    } catch (e) { }
  }
}