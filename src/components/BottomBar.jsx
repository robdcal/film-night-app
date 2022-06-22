import { supabase } from "../supabaseClient";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import AddFilm from "./AddFilm";

const BottomBar = () => {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <AddFilm />
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit" onClick={() => supabase.auth.signOut()}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default BottomBar;
