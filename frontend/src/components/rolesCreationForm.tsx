import { Button, Chip, Grid, Paper, TextField } from "@mui/material";
import { useState } from "react";

function RolesCreationForm() {
  const [roleName, setroleName] = useState<string>("");

  const handleRoleNameChange = (e: any) => {
    // logic to be implemented
  };

  const handleSubmit = async (e: any) => {
    // logic to be implemeted
  };

  return (
    <Grid container component={Paper} elevation={5} sx={{
      padding: "10px",
      gap: "10px",
    }}>
      <Grid item xs={2}>
        <TextField
          disabled
          type="text"
          id="role.name"
          label="Role name"
          value={roleName}
          size="small"
          placeholder="Role name"
          onChange={(e) => handleRoleNameChange(e)}
          required
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="outlined"
          disabled
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Create Role
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Chip label="Role creation will be added in next versions" variant="outlined"/>
      </Grid>
    </Grid>
  );
}

export default RolesCreationForm;
