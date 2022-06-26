import { supabase } from "../supabaseClient";
import Button from "@mui/material/Button";
import AppContext from "../contexts/AppContext";
import { useContext } from "react";

const DeleteFilm = ({ id, handleClose }) => {
  const { films, setFilms } = useContext(AppContext);

  const deleteFilm = async (id) => {
    try {
      const { data, error } = await supabase
        .from("films")
        .delete()
        .match({ id: id });
      setFilms(films.filter((x) => x.id !== id));
      handleClose();
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
