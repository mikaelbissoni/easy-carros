import Cookie from "js-cookie";
import Router from "next/router";
import { LoginInputs } from "../pages/index";
import { post } from "./rest_service";

export const COOKIES = {
  authToken: "token"
};

export async function login(data: LoginInputs): Promise<string | void> {
  const result = await post("/api/auth", data );

  if (result.error) {
    return result.error.message;
  } else if (!result.data && !result.token) {
    return "Something went wrong!";
  }
  const { token } = result.data;

  Cookie.set(COOKIES.authToken, token);
  await Router.push("/vehicle");
}
