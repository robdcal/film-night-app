import { Fragment } from "react";
import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";

const Groups = () => {
  return (
    <Fragment>
      <Typography component="h1" variant="h3" align="center" mt={4}>
        Your groups
      </Typography>
      <Typography>
        Open group + delete group + leave group + edit name
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Group name</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Group #1</TableCell>
              <TableCell align="right">
                <IconButton component="button">
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography>Create group</Typography>
                  <AddIcon />
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography component="h1" variant="h3" align="center" mt={4}>
        Invites
      </Typography>
      <Typography>Accept invite + delete invite</Typography>
    </Fragment>
  );
};

export default Groups;
