import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "..";
import { IRole } from "../interfaces/IUser";
import { observer } from "mobx-react-lite";

interface SignupProps {}

const SignupComponent: React.FC<SignupProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const roles: IRole[] = [
    {
      id: 1,
      name: "Admin",
    },
    {
      id: 2,
      name: "User",
    },
  ];
  const [selectedRole, setSelectedRole] = useState(2);

  const { store } = useContext(Context);

  return (
    <div
      style={{
        width: "max-content",
        height: "max-content",
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        padding: "20px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        borderRadius: "5px",
        textAlign: "center",
        backgroundColor: "#f8f9fa", // Fancy background color
      }}
    >
      <input
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
        type="text"
        placeholder="Username"
        style={{
          marginBottom: "10px",
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid #ced4da", // Fancy input border color
        }}
      />
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="Email"
        style={{
          marginBottom: "10px",
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid #ced4da", // Fancy input border color
        }}
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Password"
        style={{
          marginBottom: "10px",
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid #ced4da", // Fancy input border color
        }}
      />
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="role" style={{ marginRight: "10px" }}>
          Select a Role:
        </label>
        <select
          id="role"
          value={selectedRole}
          onChange={(e) => setSelectedRole(Number(e.target.value))}
          style={{
            marginRight: "10px",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ced4da", // Fancy select border color
          }}
        >
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={() => store.signup(email, password, selectedRole, userName)}
        style={{
          padding: "10px 20px",
          borderRadius: "5px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)", // Fancy button shadow
        }}
      >
        SignUp
      </button>
    </div>
  );
};

export default observer(SignupComponent);
