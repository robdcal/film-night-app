import { supabase } from "../supabaseClient";
import { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/system";
import FilmList from "./FilmList";

const EditFilm = ({ index, film, films, setFilms }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [watched, setWatched] = useState(false);
  const [cRating, setCRating] = useState(0);
  const [rRating, setRRating] = useState(0);

  const handleClickOpen = () => {
    setName(film.name || "");
    setOwner(film.owner || "");
    setWatched(film.watched || false);
    setCRating(film.c_rating || "");
    setRRating(film.r_rating || "");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateFilm = async () => {
    try {
      const { data, error } = await supabase
        .from("films")
        .update({
          name: name,
          owner: owner || null,
          watched: watched,
          c_rating: cRating || null,
          r_rating: rRating || null,
        })
        .match({ id: film.id });
      console.log(films);
      setFilms([
        ...films,
        (films[index] = {
          name: name,
          owner: owner,
          watched: watched,
          c_rating: cRating,
          r_rating: rRating,
        }),
      ]);
      handleClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <IconButton component="button" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle>Update Film</DialogTitle>
        <DialogContent sx={{ width: 500, maxWidth: "100%" }}>
          <TextField
            margin="normal"
            label="Film name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            margin="normal"
            label="Owner"
            variant="outlined"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={watched}
                onChange={(e) => {
                  setWatched(e.target.checked);
                }}
              />
            }
            label="Watched"
          />
          {watched && (
            <Box>
              <TextField
                margin="normal"
                label="Claire's rating"
                variant="outlined"
                value={cRating}
                onChange={(e) => setCRating(e.target.value)}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
              <TextField
                margin="normal"
                label="Rob's rating"
                variant="outlined"
                value={rRating}
                onChange={(e) => setRRating(e.target.value)}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={updateFilm} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default EditFilm;
