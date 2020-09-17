import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setMovieList, movieList }) {
  const history = useHistory();
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

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const updateHandler = (e) => {
    e.preventDefault();
    history.push(`/update-movie/${params.id}`);
  };

  const handleDelete = (e) => {
    //Getting "movies.map is not a function" - I am guessing this is from put request
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        setMovieList(
          movieList.filter((movie) => {
            return movie.id != params.id;
          })
        );
        history.push(`/`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <button
        className="save-button"
        style={{ right: "42px" }}
        onClick={saveMovie}
      >
        Save
      </button>
      <button
        className="save-button"
        style={{ right: "100px" }}
        onClick={updateHandler}
      >
        Edit
      </button>
      <button
        className="save-button"
        style={{ right: "150px" }}
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}

export default Movie;
