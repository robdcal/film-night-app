import { supabase } from "../supabaseClient";
import Button from "@mui/material/Button";

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
    <Button
      aria-label="delete"
      component="button"
      color="error"
      onClick={() => deleteFilm(id)}
    >
      Delete
    </Button>
  );
};

export default DeleteFilm;
