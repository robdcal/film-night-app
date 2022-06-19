import { supabase } from "../supabaseClient";
import { Fragment, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const FilmList = () => {
  const [films, setFilms] = useState([]);

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

  const deleteFilm = async (id) => {
    try {
      await supabase.from("film").delete().eq("id", id);
      setFilms(films.filter((x) => x.id !== id));
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Fragment>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Film Name</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {films.map((film) => (
              <TableRow key={film.id}>
                <TableCell component="th" scope="row">
                  {film.name}
                </TableCell>
                <TableCell>{film.owner}</TableCell>
                <TableCell>{film.c_rating + film.r_rating}</TableCell>
                <TableCell>
                  {" "}
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
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
