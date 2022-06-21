import { supabase } from "../supabaseClient";
import { Fragment, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteFilm from "./DeleteFilm";
import EditFilm from "./EditFilm";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";

const FilmList = () => {
  const [films, setFilms] = useState([]);
  const [watchedToggle, setWatchedToggle] = useState("watchlist");

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

  const toggleWatchedFilms = () => {
    setWatchedToggle(watchedToggle === "watchlist" ? "watched" : "watchlist");
  };

  const filteredFilms = films.filter(
    watchedToggle === "watched"
      ? (film) => film.watched
      : (film) => !film.watched
  );

  return (
    <Fragment>
      <Box sx={{ my: 2 }} style={{ textAlign: "center" }}>
        <ToggleButtonGroup
          color="primary"
          value={watchedToggle}
          exclusive
          onChange={toggleWatchedFilms}
        >
          <ToggleButton value="watchlist">Watch List</ToggleButton>
          <ToggleButton value="watched">Watched</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <TableContainer sx={{ my: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Film Name</TableCell>
              <TableCell>Owner</TableCell>
              {watchedToggle === "watched" && <TableCell>Rating</TableCell>}
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFilms.map((film, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {film.name}
                </TableCell>
                <TableCell>{film.owner}</TableCell>
                {watchedToggle === "watched" && (
                  <TableCell>{film.c_rating + film.r_rating}</TableCell>
                )}
                <TableCell>
                  <EditFilm
                    index={index}
                    film={film}
                    films={films}
                    setFilms={setFilms}
                  />
                </TableCell>
                <TableCell>
                  <DeleteFilm films={films} setFilms={setFilms} id={film.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default FilmList;
