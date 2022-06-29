import CssBaseline from "@mui/material/CssBaseline";
import { useContext } from "react";
import Welcome from "./components/Welcome";
import { Container } from "@mui/system";
import AppContext from "./contexts/AppContext";
import Groups from "./components/Groups";
import Group from "./components/Group";

const App = () => {
  const { session, screen } = useContext(AppContext);

  const screenSwitch = () => {
    switch (screen) {
      case "welcome":
        return <Welcome />;
      case "groups":
        return <Groups />;
      case "group":
        return <Group />;
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
