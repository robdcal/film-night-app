import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { Fragment } from "react";
import Auth from "./components/Auth";
import FilmList from "./components/FilmList";
import { Container } from "@mui/system";
import Typography from "@mui/material/Typography";

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
      <Typography component="h1" variant="h3">
        Film Night
      </Typography>
      {!session ? (
        <Auth />
      ) : (
        <FilmList key={session.user.id} session={session} />
      )}
    </Container>
  );
};

export default App;
