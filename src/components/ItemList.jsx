import { supabase } from "../supabaseClient";
import { Fragment, useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditItem from "./EditItem";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import AppContext from "../contexts/AppContext";

const ItemList = () => {
  const [watchedToggle, setWatchedToggle] = useState("watchlist");
  const { session, items, setItems, fetchItems } = useContext(AppContext);

  useEffect(() => {
    updateUsername();
    fetchItems();
  }, []);

  const updateUsername = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .update({
          username: session.user.user_metadata.name,
        })
        .match({ user_id: session.user.id });
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleWatchedItems = () => {
    setWatchedToggle(watchedToggle === "watchlist" ? "watched" : "watchlist");
  };

  const filteredItems = items.filter(
    watchedToggle === "watched"
      ? (item) => item.watched
      : (item) => !item.watched
  );

  return (
    <Fragment>
      <Box sx={{ my: 2 }} style={{ textAlign: "center" }}>
        <ToggleButtonGroup
          color="primary"
          value={watchedToggle}
          exclusive
          onChange={toggleWatchedItems}
        >
          <ToggleButton value="watchlist">Watch List</ToggleButton>
          <ToggleButton value="watched">Watched</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <TableContainer sx={{ my: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Added by</TableCell>
              {watchedToggle === "watched" && <TableCell>Rating</TableCell>}
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell>{item.owner}</TableCell>
                {watchedToggle === "watched" && (
                  <TableCell>
                    {item.c_rating && item.r_rating
                      ? item.c_rating + item.r_rating
                      : "TBC"}
                  </TableCell>
                )}
                <TableCell>
                  <EditItem
                    index={index}
                    item={item}
                    items={items}
                    setItems={setItems}
                    watchedToggle={watchedToggle}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default ItemList;
