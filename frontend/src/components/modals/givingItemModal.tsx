import { useContext, useEffect, useState } from "react";
import { GiveItemToUserFromAdminDto, IItem } from "../../interfaces/IItem";
import { IUser } from "../../interfaces/IUser";
import { BasicRow } from "../../UI/styled/cards";
import { BluePinkButton, PinkBlueButton } from "../../UI/styled/buttons";
import { Modal } from "../../UI/styled/modals";
import { Context } from "../..";
import ActionsService from "../../services/actionsService";
import { BasicLable, BasicSelect } from "../../UI/styled/inputs";
import { ActionRequest } from "../../interfaces/ActionRequest";
import { ActionType } from "../../interfaces/IAction";

interface GivingItemModalProps {
  userReceiving: IUser;
  onClose: () => void;
}

const GivingItemModal: React.FC<GivingItemModalProps> = ({
  userReceiving,
  onClose,
}) => {
  const { store } = useContext(Context);
  const isUserAdmin = store.user.role.name === "Admin";
  const [items, setItems] = useState<IItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<IItem>(items[0]);
  console.log(items);
  const fetchItems = async () => {
    try {
      const items = await ActionsService.getItems(store.user.id);
      console.log(items);
      setItems(items);
      setSelectedItem(items[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleGiveItem = async () => {
    try {
      if (isUserAdmin) {
        const request: GiveItemToUserFromAdminDto = {
          itemId: selectedItem.id,
          userId: userReceiving.id,
          adminId: store.user.id,
        };
        await ActionsService.giveItemAdmin(request);
        onClose();
      } else {
        const request: ActionRequest = {
          userId: store.user.id,
          type: ActionType.TYPE_1,
          userGetId: userReceiving.id,
          itemId: selectedItem.id,
          description: `Giving item with id = ${selectedItem.id} from User with id = ${store.user.id} to User with id = ${userReceiving.id}`,
        };
        await ActionsService.requestActionUser(request);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!items.length) {
    return (
      <Modal>
        <BasicLable>No items to give</BasicLable>
        <BluePinkButton onClick={onClose}>Close</BluePinkButton>
      </Modal>
    );
  }

  return (
    <Modal>
      <BasicRow>
        <BasicLable>
          Choose item to give to user: {userReceiving.userName} with id -{" "}
          {userReceiving.id}
        </BasicLable>
        <BasicSelect
          value={selectedItem.id}
          onChange={(e) => {
            setSelectedItem(items.find((item) => item.id === +e.target.value)!);
          }}
        >
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </BasicSelect>
      </BasicRow>
      <BasicRow>
        <PinkBlueButton onClick={() => handleGiveItem()}>
          Give item
        </PinkBlueButton>
        <BluePinkButton onClick={onClose}>Close</BluePinkButton>
      </BasicRow>
    </Modal>
  );
};

export default GivingItemModal;
