import React from "react";
import { AuthProps, privateRoute } from "../components/private_route";
import List from "../components/List";
import Cookie from "js-cookie";
import Router from "next/router";
import { COOKIES } from "../services/login_service";
import { get } from "../services/rest_service";

type Props = AuthProps & {
  message: string;
  vehicles: [];
};

function Page(props: Props) {
  const logout = async () => {
    Cookie.remove(COOKIES.authToken);
    await Router.push("/");
  };

  return (
    <>
      <List items={props.vehicles} />
      <button onClick={logout}>Logout</button>
    </>
  );
}

Page.getInitialProps = async ({ auth }: AuthProps): Promise<Props> => {
  const result: any = await get("/api/vehicle", {
    method: "GET",
    headers: {
      Authorization: auth.authorizationString,
      "Content-Type": "application/json"
    }
  });

  let message = "";
  if (result.error) {
    message = result.error.message;
  }

  const vehicles = result.data;

  return { message, auth, vehicles };
};

export default privateRoute(Page);
