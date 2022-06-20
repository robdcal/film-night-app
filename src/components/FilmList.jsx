import { supabase } from "../supabaseClient";
import { Fragment, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteFilm from "./DeleteFilm";

const FilmList = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetchFilms().catch(console.error);
  }, [films]);

  const fetchFilms = async () => {
    let { data: films, error } = await supabase
      .from("films")
      .select("*")
      .order("id", { ascending: false });
    if (error) console.log("error", error);
    else setFilms(films);
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
