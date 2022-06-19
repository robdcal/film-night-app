import logo from "./logo.svg";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { Fragment } from "react";
import Auth from "./components/Auth";
import FilmList from "./components/FilmList";
import { Container } from "@mui/system";
import Typography from "@mui/material/Typography";
import BottomBar from "./components/BottomBar";

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <Typography component="h1" variant="h3" align="center" mt={4}>
        Film Night
      </Typography>
      {!session ? (
        <Auth />
      ) : (
        <Fragment>
          <FilmList key={session.user.id} session={session} />
          <BottomBar />
        </Fragment>
      )}
    </Container>
  );
};

export default App;
