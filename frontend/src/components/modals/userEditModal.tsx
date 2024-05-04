import { useState } from "react";
import { BluePinkButton, PinkBlueButton } from "../../UI/styled/buttons";
import { BasicRow } from "../../UI/styled/cards";
import { BasicInput, BasicLable, BasicSelect } from "../../UI/styled/inputs";
import { Modal } from "../../UI/styled/modals";
import { IRole, IUser } from "../../interfaces/IUser";

interface UserEditModalProps {
  user: IUser;
  roles: IRole[];
  onClose: () => void;
  onSave: (user: IUser) => void;
}
const UserEditModal: React.FC<UserEditModalProps> = ({
  user,
  onClose,
  roles,
  onSave,
}) => {
  const [userName, setUserName] = useState<string>(user.userName);
  const [email, setEmail] = useState<string>(user.email);
  const [password, setPassword] = useState<string>(user.password);
  const [role, setRole] = useState<number>(user.role.id);
  console.log(user);
  const handleSave = () => {
    const newUser: IUser = {
      ...user,
      userName,
      email,
      password,
      role: roles.find((r) => r.id === role)!,
    };
    onSave(newUser);
  }
  return (
    <Modal>
      <BasicRow>
        <BasicLable>Username:</BasicLable>
        <BasicInput
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </BasicRow>
      <BasicRow>
        <BasicLable>Email:</BasicLable>
        <BasicInput value={email} onChange={(e) => setEmail(e.target.value)} />
      </BasicRow>
      <BasicRow>
        <BasicLable>Password:</BasicLable>
        <BasicInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </BasicRow>
      <BasicRow>
        <BasicLable>Username:</BasicLable>
        <BasicSelect
          value={role}
          onChange={(e) => setRole(Number(e.target.value))}
        >
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </BasicSelect>
      </BasicRow>
      <BasicRow>
        <BluePinkButton onClick={onClose}>Cancel</BluePinkButton>
        <PinkBlueButton onClick={() => handleSave()}>Save</PinkBlueButton>
      </BasicRow>
    </Modal>
  );
};

export default UserEditModal;
