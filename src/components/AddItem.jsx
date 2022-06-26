import { supabase } from "../supabaseClient";
import { useState, Fragment, useContext } from "react";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AppContext from "../contexts/AppContext";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

const AddItem = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { session, items, setItems, fetchItems } = useContext(AppContext);

  const handleClickOpen = () => {
    setName("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addNewItem = async () => {
    try {
      const newItem = { name: name, owner: session.user.user_metadata.name };
      const { data, error } = await supabase.from("items").insert([newItem]);
      fetchItems();
      handleClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <StyledFab color="secondary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </StyledFab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Item name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={addNewItem}
            disabled={name.length === 0}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default AddItem;
