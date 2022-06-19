import { Fragment, useState } from "react";
import { supabase } from "../supabaseClient";
import Button from "@mui/material/Button";

export default function Auth() {
  const [loading, setLoading] = useState(false);

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

  return (
    <Fragment>
      {loading ? (
        "Signing in..."
      ) : (
        <Button variant="contained" onClick={signInWithGoogle}>
          Sign in with Google
        </Button>
      )}
    </Fragment>
  );
}
