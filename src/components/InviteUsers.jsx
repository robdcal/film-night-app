import { supabase } from "../supabaseClient";
import { Fragment, useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, MenuItem, Typography } from "@mui/material";
import AppContext from "../contexts/AppContext";
import { Box } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const InviteUsers = ({ closeGroupMemberMenu, groupName, group_id }) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [groupUsers, setGroupUsers] = useState([]);

  const fetchMembers = async () => {
    let members = [];
    // fetch user_id's from the groups_users table where group_id matches this group
    let { data: userIds, error } = await supabase
      .from("groups_users")
      .select("user_id")
      .match({ group_id: group_id });
    if (error) console.log("error", error);
    // loop through each user_id and fetch their username and email from the users table
    userIds.map(async ({ user_id }) => {
      let { data: userDetails, error } = await supabase
        .from("users")
        .select("username, email")
        .match({ user_id: user_id });
      if (error) console.log("error", error);
      else members.push(userDetails[0]);
    });
    setGroupUsers(members);
  };

  const handleClickOpen = () => {
    setOpen(true);
    fetchMembers();
    setEmail("");
  };

  const handleClose = () => {
    setOpen(false);
    closeGroupMemberMenu();
    setEmail("");
  };

  const inviteUser = async () => {
    try {
      let { data: user, error: user_id_error } = await supabase
        .from("users")
        .select("user_id")
        .match({ email: email });
      const { data, error } = await supabase.from("groups_users").insert([
        {
          group_id: group_id,
          user_id: user[0].user_id,
          status: "pending",
        },
      ]);
    } catch (error) {
      console.error(error.message);
    }
    fetchMembers();
    setEmail("");
  };

  return (
    <Fragment>
      <MenuItem onClick={handleClickOpen}>Invite users</MenuItem>
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
        <DialogTitle>Invite Users</DialogTitle>
        <DialogContent sx={{ width: 500, maxWidth: "100%" }}>
          <Grid container={true} mb={4}>
            <TextField
              label="Enter email address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button variant="contained" onClick={inviteUser}>
              Send
            </Button>
          </Grid>
          <Typography>Current members</Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groupUsers.map((user, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Done</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default InviteUsers;
