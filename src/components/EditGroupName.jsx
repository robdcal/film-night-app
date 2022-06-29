import { supabase } from "../supabaseClient";
import { Fragment, useState, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { MenuItem } from "@mui/material";
import AppContext from "../contexts/AppContext";

const EditGroupName = ({ closeGroupMemberMenu, groupName, group_id }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { fetchUserGroups } = useContext(AppContext);

  const handleClickOpen = () => {
    setOpen(true);
    setName(groupName);
  };

  const handleClose = () => {
    closeGroupMemberMenu();
    setOpen(false);
  };

  const updateGroup = async () => {
    try {
      const { data, error } = await supabase
        .from("groups")
        .update({
          name: name,
        })
        .match({ group_id: group_id });
      fetchUserGroups();
      handleClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <MenuItem onClick={handleClickOpen}>Edit name</MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle>Update group name</DialogTitle>
        <DialogContent sx={{ width: 500, maxWidth: "100%" }}>
          <TextField
            margin="normal"
            label="Group name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateGroup} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default EditGroupName;
