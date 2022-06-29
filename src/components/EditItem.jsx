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
import DeleteItem from "./DeleteItem";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Typography } from "@mui/material";
import AppContext from "../contexts/AppContext";

const EditItem = ({ index, item, watchedToggle }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [addedBy, setAddedBy] = useState("");
  const [watched, setWatched] = useState(false);
  const [cRating, setCRating] = useState(0);
  const [rRating, setRRating] = useState(0);
  const [notes, setNotes] = useState("");
  const { items, setItems } = useContext(AppContext);

  const createdDate = new Date(item.created_at)
    .toDateString()
    .toLocaleString("en-GB");

  const handleClickOpen = () => {
    setName(item.name || "");
    setAddedBy(item.added_by || "");
    setWatched(item.watched || false);
    setCRating(item.c_rating || "");
    setRRating(item.r_rating || "");
    setNotes(item.notes || "");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateItem = async () => {
    try {
      const { data, error } = await supabase
        .from("items")
        .update({
          name: name,
          added_by: addedBy || null,
          watched: watched,
          c_rating: parseInt(cRating) || null,
          r_rating: parseInt(rRating) || null,
          notes: notes || null,
        })
        .match({ item_id: item.item_id });
      const updatedItem = {
        item_id: item.item_id,
        name: name,
        added_by: addedBy,
        watched: watched,
        c_rating: parseInt(cRating),
        r_rating: parseInt(rRating),
        notes: notes,
      };
      const newItems = [...items];
      newItems[index] = updatedItem;
      setItems(newItems);
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
        <DialogTitle>Update Item</DialogTitle>
        <DialogContent sx={{ width: 500, maxWidth: "100%" }}>
          <TextField
            margin="normal"
            label="Item name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <Typography>{`Added on ${createdDate}`}</Typography>
          <Typography>{`by ${addedBy}`}</Typography>
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
            <DeleteItem
              items={items}
              setItems={setItems}
              item_id={item.item_id}
              handleClose={handleClose}
            />
          </Box>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateItem} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default EditItem;
