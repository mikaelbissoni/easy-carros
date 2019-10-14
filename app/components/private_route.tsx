import ServerCookie from "next-cookies";
import React, { Component } from "react";
import { COOKIES } from "../services/login_service";
import { AuthToken } from "../services/auth_token";

export type AuthProps = {
  auth: AuthToken;
};

export function privateRoute(WrappedComponent: any) {
  return class extends Component<AuthProps> {
    static async getInitialProps(ctx: any) {
      const token = ServerCookie(ctx)[COOKIES.authToken];
      const auth = new AuthToken(token);
      const initialProps = { auth };
      const isExpired = auth.expiresAt ? new Date() > auth.expiresAt : null;

      if (isExpired || !token) {
        ctx.res.writeHead(302, {
          Location: "/"
        });
        ctx.res.end();
      }
      if (WrappedComponent.getInitialProps)
        return WrappedComponent.getInitialProps(initialProps);
      return initialProps;
    }

    get auth() {
      return new AuthToken(this.props.auth.token);
    }

    render() {
      return <WrappedComponent auth={this.auth} {...this.props} />;
    }
  };
}
