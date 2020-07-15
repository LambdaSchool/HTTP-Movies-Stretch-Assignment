import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      {props.save ? 
      <>
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      </>
      :
      <div className="save-wrapper">
        <MovieCard update={true} movie={movie} />
      </div>
      }
    </div>
  );
}

export default Movie;
