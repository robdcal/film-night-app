import { Fragment, useState, useContext, useEffect } from "react";
import { supabase } from "../supabaseClient";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import AppContext from "../contexts/AppContext";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const { setScreen } = useContext(AppContext);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const { user, session, error } = await supabase.auth.signIn({
        provider: "google",
      });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") setScreen("groups");
    });
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography component="h1" variant="h3" align="center" mt={4}>
        Film Night
      </Typography>
      {loading ? (
        "Signing in..."
      ) : (
        <Button variant="contained" onClick={signInWithGoogle} sx={{ mt: 4 }}>
          Sign in with Google
        </Button>
      )}
    </Box>
  );
}
