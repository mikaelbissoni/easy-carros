import React, { useState } from "react";
import { Vehicle } from "../interfaces";
import ListItem from "./ListItem";

import { makeStyles } from "@material-ui/core/styles";
import ListMaterial from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import { authService } from "../services/rest_service";
import Grid from "@material-ui/core/Grid/Grid";

export type VehicleInputs = {
  plate: string;
};

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  container: {
    padding: "30px 15px 0",
    maxWidth: "328px",
    margin: "auto"
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    padding: "30px 15px 0"
  },
  inputPlate: {
    maxWidth: "229px"
  },
  submit: {
    margin: "16px 0 8px 5px",
    height: "56px",
    fontSize: "x-large"
  }
}));

type Props = {
  items: Vehicle[];
};

const List: React.FunctionComponent<Props> = ({ items }) => {
  const classes = useStyles();

  const [vehicles, setVehicles] = useState(items);

  const callback = async (id: number) => {
    setVehicles(vehicles.filter(item => item.id !== id));
  };

  const initialValues: VehicleInputs = { plate: "" };

  const [inputs, setInputs] = useState(initialValues);
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      !/^[a-zA-Z]{3}[0-9]{4}$/.exec(inputs.plate) &&
      !/^[a-zA-Z]{3}[0-9]{1}[a-zA-Z]{1}[0-9]{2}$/.exec(inputs.plate)
    ) {
      setError("Por favor insira uma placa válida.");
      return false;
    }

    const result = await authService.create(inputs);
    if (result.error) {
      setError(result.error.message);
      return false;
    } else if (!result.data && !result.token) {
      return "Something went wrong!";
    }

    setError("");
    setInputs(initialValues);

    const { data } = result;
    setVehicles([...vehicles, data]);
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    e.persist();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value.substring(0, 7)
    });
  };

  return (
    <Grid className={classes.container}>
      <div>
        <Typography variant="h2" className={classes.title}>
          Adicionar novo veículo
        </Typography>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
        >
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              error={error != ""}
              className={classes.inputPlate}
              variant="outlined"
              margin="normal"
              required
              name="plate"
              label="Placa"
              helperText={error != "" ? error : ""}
              type="plate"
              id="plate"
              onChange={handleInputChange}
              value={inputs.plate}
            />
            <Button
              type="submit"
              className={classes.submit}
              variant="contained"
              color="primary"
            >
              +
            </Button>
          </form>
        </Grid>
      </div>

      <div>
        <Typography variant="h1" className={classes.title}>
          Veículos
        </Typography>
        <ListMaterial>
          {(vehicles.length) ? vehicles.map(item => (
            <ListItem parentCallback={callback} data={item} key={item.id} />
          )):(
            <div>Nenhum veículo encontrado.</div>
          )}
        </ListMaterial>
      </div>
    </Grid>
  );
};

export default List;
