import { createContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const AppContext = createContext({
  session: null,
  items: [],
  setItems: () => {},
  fetchItems: () => {},
});

export const AppContextProvider = (props) => {
  const [session, setSession] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    fetchItems().catch(console.error);
  }, []);

  const fetchItems = async () => {
    let { data: items, error } = await supabase
      .from("items")
      .select("*")
      .order("item_id", { ascending: false });
    if (error) console.log("error", error);
    else setItems(items);
  };

  return (
    <AppContext.Provider
      value={{
        session: session,
        items: items,
        setItems: setItems,
        fetchItems: fetchItems,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
