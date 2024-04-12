import { useState } from "react";

function RolesCreationForm() {
  const [roleName, setRoleName] = useState<string>("");

  const handleRoleNameChange = (e: any) => {
    // logic to be implemented
  };

  const handleSubmit = async (e: any) => {
    // logic to be implemeted
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        justifyItems: "center",
      }}
    >
      <h3 style={{ marginRight: "20px" }}>Create New Role</h3>
      <form
        id="rolesCreationForm"
        onSubmit={handleSubmit}
        style={{ display: "flex" }}
      >
        <div style={{ marginRight: "10px" }}>
          <label htmlFor="roleName">Role Name:</label>
          <input
            disabled
            type="text"
            id="roleName"
            name="roleName"
            value={roleName}
            placeholder="Role name"
            onChange={(e) => handleRoleNameChange(e)}
            required
          />
        </div>
        <button disabled type="submit" onClick={(e) => handleSubmit(e)}>
          Create User
        </button>
      </form>
      <span style={{ marginLeft: "10px", fontSize: "12px", color: "red" }}>
        (Role creation will be added in next versions)
      </span>
    </div>
  );
}

export default RolesCreationForm;
