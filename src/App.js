import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import MovieSearch from './components/MovieSearch'
import MovieList from './components/MovieList'
import PageHeader from './components/PageHeader'

const My404 = () =>{
  return(
    <div>
      You're lost, bro! Or lady! I'm not biased
    </div>
  )
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      movies: [],
      logged: false,
    }
  }
  findMovies = async (title) =>{
    const words = title.split(" ")
    title = words.join('+')
    console.log(title)
    try{
      const url = await 'http://localhost:8000/watch/v1/search/' + title
      // console.log(url)
      // const req = new Request(url);
      const movies = await fetch(url , {
        method: 'GET',
        credentials: 'include'
      });
      const parsedMovies = await movies.json();
      console.log(parsedMovies.data.results);
      if(parsedMovies.data.results.length){
        this.setState({
          movies: [...parsedMovies.data.results]
        })
        console.log(this.state.movies);
      } else if (parsedMovies.status.code === 200){
        console.log('No movies or shows found with that title')
        return ("No results")
      }
      else {
        console.log("There was an error returning your search results")
        return ("Fetch error")
      }
    } catch(err){
      console.log(err)
      return err;
    }
  }

  handleLogin(e){

  }

  handleRegister(e){

  }

  render(){
    return (
      <div className="App">
        <PageHeader handleLogin={this.handleLogin} handleRegister={this.handleRegister}/>
          {/* <Route exact path='/register' component={Register}/> */}
        <MovieSearch findMovies={this.findMovies}/>
        <MovieList movies={this.state.movies}/>
        {/* </Switch> */}
      </div>
      
    );
  }
}

export default App;
