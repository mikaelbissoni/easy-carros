import React from "react";
import { AuthProps, privateRoute } from "../components/private_route";
import List from "../components/List";
import { authService } from "../services/rest_service";

import VehicleToolbar from "../components/VehicleToolbar";

type Props = AuthProps & {
  message: string;
  vehicles: [];
};

function Page(props: Props) {
  return (
    <>
      <VehicleToolbar />
      <List items={props.vehicles} />
    </>
  );
}

Page.getInitialProps = async ({ auth }: AuthProps): Promise<Props> => {
  const result: any = await authService.readAll();

  let message = "";
  if (result.error) {
    message = result.error.message;
  }

  const vehicles = result.data;

  return { message, auth, vehicles };
};

export default privateRoute(Page);
