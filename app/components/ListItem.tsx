import * as React from "react";

import { Vehicle } from "../interfaces";

import ListItemMaterial from "@material-ui/core/ListItem";
import ListItemTextMaterial from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton/IconButton";
import HighlightOff from "@material-ui/icons/HighlightOff";
import Divider from "@material-ui/core/Divider";
import { authService } from "../services/rest_service";

type Props = {
  parentCallback: any;
  data: Vehicle;
};

const ListItem: React.FunctionComponent<Props> = ({ data, parentCallback }) => {
  const deleteHandler = async (id: number) => {
    const _id = id.toString();
    const result = await authService.del(_id);
    if (result) {
      parentCallback(id);
    }
  };

  return (
    <>
      <ListItemMaterial>
        <ListItemTextMaterial primary={data.plate} />
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => deleteHandler(data.id)}
            edge="end"
            aria-label="delete"
          >
            <HighlightOff color="error" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItemMaterial>
      <Divider light />
    </>
  );
};

export default ListItem;
