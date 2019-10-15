import React from "react";
import { AuthProps, privateRoute } from "../components/private_route";
import List from "../components/List";
import { authService } from "../services/rest_service";

import VehicleToolbar from "../components/VehicleToolbar";
import { Vehicle } from "../interfaces";

type Props = AuthProps & {
  message: string;
  vehicles: Vehicle[];
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
  const result: any = await authService.readAll(auth.authorizationString);

  let { data } = result;
  let { error } = result;
  let message = '';
  let vehicles: Vehicle[] = [];
  
  if (data) {
    vehicles = data;
  } else {
    message = error.message;
  }

  return { message, auth, vehicles };
};

export default privateRoute(Page);
