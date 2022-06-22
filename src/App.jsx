import CssBaseline from "@mui/material/CssBaseline";
import { useContext } from "react";
import { Fragment } from "react";
import Auth from "./components/Auth";
import FilmList from "./components/FilmList";
import { Container } from "@mui/system";
import Typography from "@mui/material/Typography";
import BottomBar from "./components/BottomBar";
import AppContext from "./contexts/AppContext";

const App = () => {
  const { session } = useContext(AppContext);

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
          <BottomBar session={session} />
        </Fragment>
      )}
    </Container>
  );
};

export default App;
