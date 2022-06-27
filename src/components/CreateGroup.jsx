import { supabase } from "../supabaseClient";
import { useState, Fragment, useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AppContext from "../contexts/AppContext";

const CreateGroup = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { session, fetchUserGroups, addUserToGroup } = useContext(AppContext);

  const handleClickOpen = () => {
    setName("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addNewGroup = async () => {
    try {
      const newGroup = { name: name, user_id: session.user.id };
      const { data, error } = await supabase.from("groups").insert([newGroup]);
      const add = await addUserToGroup(
        data[0].group_id,
        session.user.id,
        "member"
      );
      fetchUserGroups();
      handleClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <Button
        variant="outlined"
        endIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Create group
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a new group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Group name"
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
            onClick={addNewGroup}
            disabled={name.length === 0}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default CreateGroup;
