import { createContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const AppContext = createContext({
  session: null,
  items: [],
  setItems: () => {},
  fetchItems: () => {},
  screen: "welcome",
  fetchUserGroups: () => {},
  userGroups: [],
  addUserToGroup: () => {},
});

export const AppContextProvider = (props) => {
  const [session, setSession] = useState(null);
  const [items, setItems] = useState([]);
  const [screen, setScreen] = useState("welcome");
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    // fetchItems().catch(console.error);
  }, []);

  const fetchItems = async () => {
    let { data: items, error } = await supabase
      .from("items")
      .select("*")
      .order("item_id", { ascending: false });
    if (error) console.log("error", error);
    else setItems(items);
  };

  const fetchUserGroups = async () => {
    let { data: userGroups, error } = await supabase
      .from("groups_users")
      .select(
        `
      *,
      group:groups (
        name
      )
      `
      )
      .match({ user_id: session.user.id, status: "member" })
      .order("group_id", { ascending: false });
    if (error) console.log("error", error);
    else setUserGroups(userGroups);
  };

  const addUserToGroup = async (group_id, user_id, status) => {
    try {
      const newEntry = { group_id: group_id, user_id: user_id, status: status };
      const { data, error } = await supabase
        .from("groups_users")
        .insert([newEntry]);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <AppContext.Provider
      value={{
        session: session,
        items: items,
        setItems: setItems,
        fetchItems: fetchItems,
        screen: screen,
        setScreen: setScreen,
        userGroups: userGroups,
        fetchUserGroups: fetchUserGroups,
        addUserToGroup: addUserToGroup,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
