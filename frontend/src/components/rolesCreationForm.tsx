import { useState } from "react";
import { CreationContainerB } from "../UI/styled/cards";
import { BluePinkButton } from "../UI/styled/buttons";
import { BasicInput, BasicLable } from "../UI/styled/inputs";

function RolesCreationForm() {
  const [roleName, setRoleName] = useState<string>("");

  const handleRoleNameChange = (e: any) => {
    // logic to be implemented
  };

  const handleSubmit = async (e: any) => {
    // logic to be implemeted
  };

  return (
    <CreationContainerB>
      <h3 style={{ marginRight: "20px" }}>Create New Role</h3>
      <BasicLable htmlFor="roleName">Role Name:</BasicLable>
      <BasicInput
        disabled
        type="text"
        id="roleName"
        name="roleName"
        value={roleName}
        placeholder="Role name"
        onChange={(e) => handleRoleNameChange(e)}
        required
      />
      <BluePinkButton disabled type="submit" onClick={(e) => handleSubmit(e)}>
        Create User
      </BluePinkButton>
      <span style={{ marginLeft: "10px", fontSize: "16px", fontWeight: "bold", color: "red" }}>
        (Role creation will be added in next versions)
      </span>
    </CreationContainerB>
  );
}

export default RolesCreationForm;
