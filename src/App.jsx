import CssBaseline from "@mui/material/CssBaseline";
import { useContext } from "react";
import { Fragment } from "react";
import Welcome from "./components/Welcome";
import ItemList from "./components/ItemList";
import { Container } from "@mui/system";
import Typography from "@mui/material/Typography";
import BottomBar from "./components/BottomBar";
import AppContext from "./contexts/AppContext";
import Groups from "./components/Groups";

const App = () => {
  const { session, screen } = useContext(AppContext);

  const screenSwitch = () => {
    switch (screen) {
      case "welcome":
        return <Welcome />;
      case "groups":
        return <Groups />;
      case "group":
        return (
          <Fragment>
            <ItemList key={session.user.id} session={session} />
            <BottomBar session={session} />
          </Fragment>
        );
      default:
        return <Welcome />;
    }
  };

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      {screenSwitch()}
    </Container>
  );
};

export default App;
