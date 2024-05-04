import React, { useContext, useState } from "react";
import { Context } from "..";
import { ActionType } from "../interfaces/IAction.interface";
import ActionsService from "../services/actionsService";
import { ActionRequest } from "../interfaces/api-interfaces/ActionsApi.interface";
import { typeMapping } from "../common/helpers";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";

type ActionRequestPropsType = {
  handleActionRequest: (formData: ActionRequest) => void;
};

const NewActionRequest = ({ handleActionRequest }: ActionRequestPropsType) => {
  const { store } = useContext(Context);
  const [description, setDescription] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("type_3");

  const handleSubmit = async () => {
    try {
      const actionRequest: ActionRequest = {
        userId: store.user.id,
        type: typeMapping[selectedType],
        description: description,
      };
      handleActionRequest(actionRequest);
      setDescription("");
      setSelectedType("TYPE_1");
    } catch (error) {
      console.error("Error requesting action:", error);
    }
  };

  return (
    <Grid container component={Paper} sx={{ padding: "10px" }}>
      <Grid item xs={2}>
        <FormControl>
          <InputLabel>Type</InputLabel>
          <Select
            id="actionType"
            value={selectedType}
            size="small"
            label="Type"
            onChange={(e) => setSelectedType(e.target.value)}
            required
          >
            {Object.values(ActionType)
              .filter((type) => type !== "item" && type !== "message")
              .map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FormControl>
          <TextField
            type="text"
            id="description"
            value={description}
            variant="standard"
            label="Description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </FormControl>
      </Grid>
      <Grid
        item
        xs={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button variant="contained" onClick={() => handleSubmit()}>
          Request Action
        </Button>
      </Grid>
    </Grid>
  );
};

export default NewActionRequest;
