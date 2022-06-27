import { Button, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import CreateGroup from "./CreateGroup";
import { useState, useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Groups = () => {
  const { userGroups, fetchUserGroups } = useContext(AppContext);

  useEffect(() => {
    fetchUserGroups();
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const openGroupMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeGroupMenu = () => {
    setAnchorEl(null);
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
      <Typography component="h2" variant="h4" align="center" mb={2}>
        Current groups
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableBody>
            {userGroups.map((group, index) => (
              <TableRow key={index}>
                <TableCell>{group.group.name}</TableCell>
                <TableCell align="right">
                  <IconButton component="button" onClick={openGroupMenu}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
                <Menu anchorEl={anchorEl} open={open} onClose={closeGroupMenu}>
                  <MenuItem onClick={closeGroupMenu}>Invite users</MenuItem>
                  <MenuItem onClick={closeGroupMenu}>Edit name</MenuItem>
                  <MenuItem onClick={closeGroupMenu}>Leave group</MenuItem>
                  <MenuItem onClick={closeGroupMenu}>Delete group</MenuItem>
                </Menu>
              </TableRow>
            ))}
            <TableRow>
              <TableCell align="center" colSpan={2}>
                <CreateGroup />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography component="h2" variant="h4" align="center" mt={8} mb={2}>
        Invites
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell>Group #1</TableCell>
              <TableCell align="right">
                <Button color="error">Decline</Button>
                <Button variant="outlined">Accept</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Groups;
