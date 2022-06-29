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
import { MenuItem, Typography } from "@mui/material";
import AppContext from "../contexts/AppContext";

const DeleteGroup = ({ closeGroupMemberMenu, groupName, group_id }) => {
  const [open, setOpen] = useState(false);
  const { fetchUserGroups, session } = useContext(AppContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    closeGroupMemberMenu();
    setOpen(false);
  };

  const deleteGroup = async () => {
    try {
      const { data1, error1 } = await supabase
        .from("groups_users")
        .delete()
        .match({ group_id: group_id, user_id: session.user.id });
      const { data2, error2 } = await supabase
        .from("groups")
        .delete()
        .match({ group_id: group_id });
      fetchUserGroups();
      handleClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <MenuItem onClick={handleClickOpen}>Delete group</MenuItem>
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
        <DialogTitle>Delete Group</DialogTitle>
        <DialogContent sx={{ width: 500, maxWidth: "100%" }}>
          <Typography>
            Are you sure you want to delete "{groupName}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deleteGroup} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DeleteGroup;
