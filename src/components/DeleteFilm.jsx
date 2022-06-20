import { supabase } from "../supabaseClient";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteFilm = ({ films, setFilms, id }) => {
  const deleteFilm = async (id) => {
    try {
      const { data, error } = await supabase
        .from("films")
        .delete()
        .match({ id: id });
      setFilms(films.filter((x) => x.id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <IconButton aria-label="delete" onClick={() => deleteFilm(id)}>
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteFilm;
