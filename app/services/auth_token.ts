import jwtDecode from "jwt-decode";

export type DecodedToken = {
  readonly email: string;
  readonly exp: number;
}

export class AuthToken {
  readonly decodedToken: DecodedToken;
  readonly authorizationString: String | null;
  readonly expiresAt: Date | null;

  constructor(readonly token?: string) {
    this.decodedToken = { email: "", exp: 0 };
    this.authorizationString = null;
    this.expiresAt = null;
    
    try {
      if (token) {
        this.decodedToken = jwtDecode(token);
        this.authorizationString = `${process.env.secret} ${token}`;
        this.expiresAt = new Date(this.decodedToken.exp * 1000);
      }
    } catch (e) { }
  }
}