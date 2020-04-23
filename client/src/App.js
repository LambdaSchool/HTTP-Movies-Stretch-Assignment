import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateForm from "./Movies/UpdateForm"

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const setMovie = updatedMovie => {
    const updatedMovies = [...movieList];
    const index = updatedMovies.findIndex(item => item.id === updatedMovie.id);
    updatedMovies[index] = updatedMovie;
    setMovieList(newMovies);
  };

  const deleteMovies = deletedMovie => {
    const newMovies = [...movieList];
    const filteredMovies = newMovies.filter(item => item.id !== deletedMovie)
    setMovieList(filteredMovies);
  };

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} deleteMovies={deleteMovies} />
      </Route>

      <Route exact path="/update-movie/:id"
          render={props => <UpdateForm {...props} movies={movieList} setMovie={setMovie} /> } />
    </>
  );
};

export default App;
