import React, { useState } from "react";
import {
  Button,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import ActionsService from "../services/actionsService";

type ItemCreationFormProps = {
  onCreation: () => void;
};

function ItemCreationForm({ onCreation }: ItemCreationFormProps) {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  const handleCreateItem = async () => {
    try {
      if (!itemName.trim() || !itemDescription.trim()) {
        throw new Error("All fields should not be empty");
      }

      await ActionsService.createItem(itemName, itemDescription);

      setItemName("");
      setItemDescription("");

      onCreation();
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <Grid
      container
      gap={2}
      sx={{
        padding: "10px",
      }}
      component={Paper}
      elevation={5}
    >
      <Grid item xs={2}>
        <TextField
          type="text"
          value={itemName}
          size="small"
          label="Item Name"
          onChange={(e) => setItemName(e.target.value)}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          type="text"
          size="small"
          value={itemDescription}
          label="Item Description"
          onChange={(e) => setItemDescription(e.target.value)}
        />
      </Grid>
      <Grid item xs={2} sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Button
          variant="contained"
          size="small"
          className="btn btn-primary"
          onClick={() => handleCreateItem()}
        >
          Create Item
        </Button>
      </Grid>
    </Grid>
  );
}

export default ItemCreationForm;
