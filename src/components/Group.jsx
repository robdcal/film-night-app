import { useContext } from "react";
import AppContext from "../contexts/AppContext";
import ItemList from "./ItemList";
import BottomBar from "./BottomBar";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const Group = () => {
  const { session } = useContext(AppContext);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography component="h2" variant="h5" align="center" mt={4} mb={2}>
        Group name here
      </Typography>
      <ItemList key={session.user.id} session={session} />
      <BottomBar session={session} />
    </Box>
  );
};

export default Group;
