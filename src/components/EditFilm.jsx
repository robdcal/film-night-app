import { supabase } from "../supabaseClient";
import { Fragment, useState, useContext } from "react";
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
import Box from "@mui/material/Box";
import DeleteFilm from "./DeleteFilm";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Typography } from "@mui/material";
import AppContext from "../contexts/AppContext";

const EditFilm = ({ index, film, watchedToggle }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [watched, setWatched] = useState(false);
  const [cRating, setCRating] = useState(0);
  const [rRating, setRRating] = useState(0);
  const [notes, setNotes] = useState("");
  const { films, setFilms } = useContext(AppContext);

  const createdDate = new Date(film.created_at)
    .toDateString()
    .toLocaleString("en-GB");

  const handleClickOpen = () => {
    setName(film.name || "");
    setOwner(film.owner || "");
    setWatched(film.watched || false);
    setCRating(film.c_rating || "");
    setRRating(film.r_rating || "");
    setNotes(film.notes || "");
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
          c_rating: parseInt(cRating) || null,
          r_rating: parseInt(rRating) || null,
          notes: notes || null,
        })
        .match({ id: film.id });
      const updatedFilm = {
        id: film.id,
        name: name,
        owner: owner,
        watched: watched,
        c_rating: parseInt(cRating),
        r_rating: parseInt(rRating),
        notes: notes,
      };
      const newFilms = [...films];
      newFilms[index] = updatedFilm;
      setFilms(newFilms);
      handleClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <IconButton component="button" onClick={handleClickOpen}>
        {watchedToggle === "watched" ? <EditIcon /> : <VisibilityIcon />}
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
          <Typography>{`Added on ${createdDate}`}</Typography>
          <Typography>{`by ${owner}`}</Typography>
          {/* <TextField
            margin="normal"
            label="Owner"
            variant="outlined"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            fullWidth
          /> */}
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
            <Fragment>
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                  margin="normal"
                  label="Claire's rating"
                  variant="outlined"
                  value={cRating}
                  onChange={(e) => setCRating(e.target.value)}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  // fullWidth
                />
                <TextField
                  margin="normal"
                  label="Rob's rating"
                  variant="outlined"
                  value={rRating}
                  onChange={(e) => setRRating(e.target.value)}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  // fullWidth
                />
              </Box>
              <TextField
                label="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                multiline
                minRows={4}
                variant="outlined"
                fullWidth
              />
            </Fragment>
          )}
        </DialogContent>
        <DialogActions>
          <Box sx={{ mr: "auto" }}>
            <DeleteFilm films={films} setFilms={setFilms} id={film.id} />
          </Box>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateFilm} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default EditFilm;
