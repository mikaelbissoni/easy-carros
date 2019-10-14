import fetch from 'isomorphic-unfetch';
import { COOKIES } from "../services/login_service";
import Cookie from "js-cookie";

const dev = process.env.NODE_ENV !== 'production';

class AuthService {
  readonly authorizationString: String = '';

  constructor(readonly authToken?: string) {
    try {
      if (authToken) {
        this.authorizationString = authToken;
      } else {
        this.authorizationString = this.getAuth();
      }
    } catch (e) { }
  }

  private baseURL(url: string) {
    const baseURL = dev ? process.env.devURL : process.env.prodURL;
    const result = (baseURL) ? `${baseURL + url}/` : `${url}/`;
    return result;
  }

  private getAuth(): string {
    const token = Cookie.get(COOKIES.authToken);
    return `Bearer ${token}`;
  }

  public async loginPost(data: any) {
    this.getAuth();
    const res = await fetch(this.baseURL(`/api/auth`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    return result;
  }

  public async create(data: any, authToken?: string) {
    this.getAuth();
    const res = await fetch(this.baseURL(`/api/vehicle/`), {
      method: 'POST',
      headers: {
        Authorization: (authToken) ? authToken : this.getAuth(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    return result;
  }

  public async readAll(authToken?: string) {
    const res = await fetch(this.baseURL(`/api/vehicle/`), {
      method: 'GET',
      headers: {
        Authorization: (authToken) ? authToken : this.getAuth(),
        'Content-Type': 'application/json'
      }
    });

    const result = await res.json();
    return result;
  }

  public async update(data: any, authToken?: string) {
    const id = data.id;
    delete data.id;
    const res = await fetch(this.baseURL(`/api/vehicle/${id}`), {
      method: 'PUT',
      headers: {
        Authorization: (authToken) ? authToken : this.getAuth(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    return result;
  }

  public async del(id: string, authToken?: string) {
    const res = await fetch(this.baseURL(`/api/vehicle/${id}`), {
      method: 'DELETE',
      headers: {
        Authorization: (authToken) ? authToken : this.getAuth(),
        'Content-Type': 'application/json'
      }
    });

    return res.ok;
  }
}

export const authService = new AuthService();