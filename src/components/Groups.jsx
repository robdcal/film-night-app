import { supabase } from "../supabaseClient";
import { Fragment, useState, useContext, useEffect } from "react";
import CreateGroup from "./CreateGroup";
import AppContext from "../contexts/AppContext";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Chip,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import EditGroupName from "./EditGroupName";
import LeaveGroup from "./LeaveGroup";
import DeleteGroup from "./DeleteGroup";
import InviteUsers from "./InviteUsers";

const Groups = () => {
  const { session, userGroups, fetchUserGroups, setScreen, setCurrentGroup } =
    useContext(AppContext);

  useEffect(() => {
    fetchUserGroups();
  }, []);

  const [anchorElMember, setAnchorElMember] = useState(null);
  const openMember = Boolean(anchorElMember);
  const openGroupMemberMenu = (event) => {
    setAnchorElMember(event.currentTarget);
  };
  const closeGroupMemberMenu = () => {
    setAnchorElMember(null);
  };
  const [anchorElPending, setAnchorElPending] = useState(null);
  const openPending = Boolean(anchorElPending);
  const openGroupPendingMenu = (event) => {
    setAnchorElPending(event.currentTarget);
  };
  const closeGroupPendingMenu = () => {
    setAnchorElPending(null);
  };

  const openGroup = (group_id, name) => {
    setCurrentGroup({ group_id: group_id, name: name });
    setScreen("group");
  };

  const acceptInvite = async (group_id) => {
    // accept the invite
    // update the status column in the groups_users table
    try {
      const { data, error } = await supabase
        .from("groups_users")
        .update({
          status: "member",
        })
        .match({ group_id: group_id, user_id: session.user.id });
      fetchUserGroups();
      closeGroupPendingMenu();
    } catch (error) {
      console.error(error.message);
    }
  };

  const declineInvite = async (group_id) => {
    // decline the invite
    // remove the user from the groups_users table
    try {
      const { data, error } = await supabase
        .from("groups_users")
        .delete()
        .match({ group_id: group_id, user_id: session.user.id });
      fetchUserGroups();
      closeGroupPendingMenu();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography component="h2" variant="h5" align="center" mb={2}>
        Your Clubs
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableBody>
            {userGroups.map((group, index) => (
              <TableRow key={index}>
                <TableCell>{group.group.name}</TableCell>
                {group.status === "member" && (
                  <Fragment>
                    <TableCell align="right">
                      <Button
                        onClick={() =>
                          openGroup(group.group_id, group.group.name)
                        }
                      >
                        Open
                      </Button>
                      <IconButton
                        component="button"
                        onClick={openGroupMemberMenu}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                    <Menu
                      anchorEl={anchorElMember}
                      open={openMember}
                      onClose={closeGroupMemberMenu}
                    >
                      <InviteUsers
                        closeGroupMemberMenu={closeGroupMemberMenu}
                        groupName={group.group.name}
                        group_id={group.group_id}
                      />
                      <EditGroupName
                        closeGroupMemberMenu={closeGroupMemberMenu}
                        groupName={group.group.name}
                        group_id={group.group_id}
                      />
                      <LeaveGroup
                        closeGroupMemberMenu={closeGroupMemberMenu}
                        groupName={group.group.name}
                        group_id={group.group_id}
                      />
                      <DeleteGroup
                        closeGroupMemberMenu={closeGroupMemberMenu}
                        groupName={group.group.name}
                        group_id={group.group_id}
                      />
                    </Menu>
                  </Fragment>
                )}
                {group.status === "pending" && (
                  <Fragment>
                    <TableCell align="right">
                      <Chip
                        label="Invited"
                        color="primary"
                        variant="outlined"
                        icon={<MailOutlineIcon />}
                        size="small"
                      />
                      <IconButton
                        component="button"
                        onClick={openGroupPendingMenu}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                    <Menu
                      anchorEl={anchorElPending}
                      open={openPending}
                      onClose={closeGroupPendingMenu}
                    >
                      <MenuItem onClick={() => acceptInvite(group.group_id)}>
                        Accept invite
                      </MenuItem>
                      <MenuItem onClick={() => declineInvite(group.group_id)}>
                        Decline invite
                      </MenuItem>
                    </Menu>
                  </Fragment>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateGroup />
    </Box>
  );
};

export default Groups;
