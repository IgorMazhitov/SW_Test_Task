/**
 * ActionRequestForm molecule for creating new action requests
 */
import React, { useContext, useState } from "react";
import {
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Context } from "../../../";
import { ActionHelpers } from "../../../shared/utils/helpers";
import TextInput from "../../atoms/TextInput";
import Button from "../../atoms/Button";
import { ActionRequest } from "../../../types/api-interfaces/ActionsApi.interface";

/**
 * ActionRequestForm props
 */
export interface ActionRequestFormProps {
  /** Callback to handle action request creation */
  handleActionRequest: (request: ActionRequest) => void;
}

/**
 * Form for creating new action requests
 * @param props Component properties
 * @returns React component
 */
const ActionRequestForm: React.FC<ActionRequestFormProps> = ({
  handleActionRequest,
}) => {
  const { store } = useContext(Context);
  const [actionType, setActionType] = useState<string>("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    type: false,
    description: false,
  });

  /**
   * Validate form inputs
   */
  const validateForm = (): boolean => {
    const newErrors = {
      type: !actionType,
      description: !description.trim(),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const request: ActionRequest = {
        type: actionType as any,
        description,
        userId: store.user.id,
      };

      await handleActionRequest(request);

      // Reset form
      setActionType("");
      setDescription("");
    } catch (error) {
      console.error("Error submitting action request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper elevation={5} sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth error={errors.type}>
            <InputLabel id="action-type-label">Action Type</InputLabel>
            <Select
              labelId="action-type-label"
              value={actionType}
              label="Action Type"
              onChange={(e) => setActionType(e.target.value)}
            >
              {Object.keys(ActionHelpers.typeMapping).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
            {errors.type && (
              <TextInput
                name="typeError"
                label="Action Type Error"
                onChange={() => {}}
                value="Action type is required"
                error={true}
                disabled
                style={{ display: "none" }}
                helperText="Action type is required"
              />
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextInput
            name="description"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={errors.description}
            helperText={errors.description ? "Description is required" : ""}
            multiline
            rows={4}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            customVariant="primary"
            onClick={handleSubmit}
            disabled={isLoading}
            loading={isLoading}
            fullWidth
          >
            Submit Request
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ActionRequestForm;
