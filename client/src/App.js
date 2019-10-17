import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from "./Movies/UpdateMovieForm";
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [listMovies, setListMovies] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const setMovieList = data => {
    setListMovies(data);
  };

  const updateMovie = movie => {
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        fetchMovies();
      })
      .catch(error => {
        debugger;
      });
  };

  const fetchMovies = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        setListMovies(res.data);
      })
      .catch(err => alert(err.response));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <SavedList list={savedList} />
      <Route
        exact
        path="/"
        render={props => {
          return (
            <MovieList
              {...props}
              setMovieList={setMovieList}
              listMovies={listMovies}
            />
          );
        }}
      />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => {
          return (
            <UpdateMovieForm
              {...props}
              listMovies={listMovies}
              updateMovie={updateMovie}
            />
          );
        }}
      />
    </>
  );
};

export default App;
