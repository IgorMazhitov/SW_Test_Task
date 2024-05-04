import { useContext, useEffect, useState } from "react";
import { GiveItemToUserFromAdminDto, IItem } from "../../interfaces/IItem";
import { IUser } from "../../interfaces/IUser";
import { Context } from "../..";
import ActionsService from "../../services/actionsService";
import { ActionRequest } from "../../interfaces/ActionRequest";
import { ActionType } from "../../interfaces/IAction";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";

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
      <div>
        <div>No items to give</div>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  return (
    <Card
      sx={{
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "10px",
        maxWidth: "max-content",
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="h4">Give item</Typography>
          </Grid>
          <Grid item xs={4}>
            <FormControl>
              <InputLabel>Item</InputLabel>
              <Select
                value={selectedItem.id}
                size="small"
                label="Item"
                onChange={(e) => {
                  setSelectedItem(
                    items.find((item) => item.id === +e.target.value)!
                  );
                }}
              >
                {items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              Who will get: {userReceiving.userName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              Who gives: {store.user.userName}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button variant="outlined" onClick={onClose}>Close</Button>
        <Button variant="contained" onClick={() => handleGiveItem()}>Give item</Button>
      </CardActions>
    </Card>
  );
};

export default GivingItemModal;
