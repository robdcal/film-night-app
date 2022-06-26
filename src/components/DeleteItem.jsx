import { supabase } from "../supabaseClient";
import Button from "@mui/material/Button";
import AppContext from "../contexts/AppContext";
import { useContext } from "react";

const DeleteItem = ({ item_id, handleClose }) => {
  const { items, setItems } = useContext(AppContext);

  const deleteItem = async (item_id) => {
    try {
      const { data, error } = await supabase
        .from("items")
        .delete()
        .match({ item_id: item_id });
      setItems(items.filter((x) => x.item_id !== item_id));
      handleClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Button
      aria-label="delete"
      component="button"
      color="error"
      onClick={() => deleteItem(item_id)}
    >
      Delete
    </Button>
  );
};

export default DeleteItem;
