// React
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Components
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie'
import MovieCreate from './Movies/MovieCreate';

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      savedList: []
    }
  }

  addToSavedList = movie => {
    const savedList = this.state.savedList;
    savedList.push(movie);
    this.setState({savedList});
  }

  deleteFromSavedList = id => {
    const newState = this.state;
    newState.savedList = newState.savedList.filter(movie => movie.id !== id);
    
    this.setState(newState);
  }

  render(){
    return (
      <div>
        <SavedList list={this.state.savedList} />
        <Route exact path="/" component={MovieList} />
        <Route path="/movies/:id" render={ (props) => {
          return(<Movie {...props} deleteFromSavedList = { this.deleteFromSavedList } addToSavedList={this.addToSavedList}/>)
        }} />
        <Route path = '/movie/add' component = { MovieCreate } />
      </div>
    )
  }
}
