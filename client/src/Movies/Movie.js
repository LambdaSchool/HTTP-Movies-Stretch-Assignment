import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { Button } from '@material-ui/core'
import MovieCard from "./MovieCard";


function Movie({ addToSavedList, setMovieList, movieList }) {
  const history = useHistory()
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const editMovie = () => {
    history.push(`/update-movie/${params.id}`, movie)
  }

  const deleteMovie = () => {
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(res => {
        const newMovieList = movieList.filter(m => m.id !== movie.id)

        setMovieList(newMovieList)

        history.push("/")
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Saved
      </div>

      <Button onClick={() => editMovie()} variant="contained" color="primary">Edit</Button>
      <Button onClick={() => deleteMovie()} variant="contained" color="secondary">Delete</Button>
    </div>
  );
}

export default Movie;
