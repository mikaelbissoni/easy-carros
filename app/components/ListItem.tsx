import * as React from "react";

import { Vehicle } from "../interfaces";

type Props = {
  data: Vehicle;
};

const ListItem: React.FunctionComponent<Props> = ({ data }) => (
  <>{data.plate}</>
);

export default ListItem;
