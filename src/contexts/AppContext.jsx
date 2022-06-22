import { createContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const AppContext = createContext({
  session: null,
  films: [],
  setFilms: () => {},
});

export const AppContextProvider = (props) => {
  const [session, setSession] = useState(null);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    fetchFilms().catch(console.error);
  }, []);

  const fetchFilms = async () => {
    let { data: films, error } = await supabase
      .from("films")
      .select("*")
      .order("id", { ascending: false });
    if (error) console.log("error", error);
    else setFilms(films);
  };

  return (
    <AppContext.Provider
      value={{
        session: session,
        films: films,
        setFilms: setFilms,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
