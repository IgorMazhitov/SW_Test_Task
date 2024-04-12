import React, { useContext, useState } from "react";
import { Context } from "..";
import { ActionType } from "../interfaces/IAction";
import ActionsService from "../services/actionsService";
import { ActionRequest } from "../interfaces/ActionRequest";
import { typeMapping } from "../common/helpers";

const NewActionRequest = () => {
  const { store } = useContext(Context);
  const [description, setDescription] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("type_2");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const actionRequest: ActionRequest = {
        userId: store.user.id,
        type: typeMapping[selectedType],
        description: description,
      };
      console.log(typeMapping, selectedType)
      await ActionsService.requestActionUser(actionRequest);

      // Clear form fields
      setDescription("");
      setSelectedType("TYPE_1");

      // Optionally, you can handle success feedback to the user
      console.log("Action requested successfully!");
    } catch (error) {
      console.error("Error requesting action:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "20px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          border: "2px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          background: "#f9f9f9",
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
          Request New Action
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "20px",
            marginRight: "20px",
          }}
        >
          <label htmlFor="actionType" style={{ marginRight: "10px" }}>
            Action Type:
          </label>
          <select
            id="actionType"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            required
          >
            {Object.values(ActionType).filter(type => type !== 'item').map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <label htmlFor="description" style={{ marginRight: "10px" }}>
            Description:
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ width: "300px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            background: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default NewActionRequest;
