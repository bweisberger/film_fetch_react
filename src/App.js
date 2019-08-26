import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import MovieList from './components/MovieList'
import PageHeader from './components/PageHeader'
import Profile from './components/Profile'
import Feed from './components/Feed'
import RegisterFailed from './components/RegisterFailed'
import RegisterPassed from './components/RegisterPassed'

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
      username: '',
      email: '',
      image: '',
      logged: false,
      loading: true
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

  handleLogin = async (loginData) =>{
    try{
      const loginResponse = await fetch('http://localhost:8000/user/v1/login', {
        method: 'POST',
        credential: 'include',
        body: JSON.stringify(loginData),
        header: {
          'Content-Type': 'application/json'
        }
      })

      const parsedResponse = await loginResponse.json();

      this.setState(() => {
        return {
          ...parsedResponse.data,
          loading: false 
        }
      })

      return parsedResponse

    } catch (err) {
      console.log(err)
    }
  }

  handleRegister = async (data) => {
    try {

      const registerResponse = await fetch('http://localhost:8000/user/v1/register', {
        method: 'POST',
        credentials: 'include',
        body: data,
        header: {
          'enctype': 'multipart/form-data'
        }
      })

      const parsedResponse = await registerResponse.json();

      console.log(parsedResponse, "parsedResponse in handleRegister in app.js")

      this.setState({
        ...parsedResponse.data,
        loading: false
      })

      return parsedResponse;

    } catch(err) {
      console.log(err)
    }
  }

  render(){
    return (
      <main className="App">
        <PageHeader findMovies={this.findMovies} handleLogin={this.handleLogin} handleRegister={this.handleRegister}/>
        <Switch>
          <Route exact path='/profile' render={(props) => <Profile {...props} userInfo={this.state} /> }/>
          <Route exact path='/feed' render={(props) => <Feed {...props} />}/>
          <Route exact path='/register-failed' render={(props) => <RegisterFailed {...props} handleRegister={this.handleRegister}/>}/>
          <Route exact path='/success' render={(props) => <RegisterPassed {...props} />}/>
          <Route component={My404}/>
        </Switch>
        <MovieList movies={this.state.movies}/>
      </main>
      
    );
  }
}

export default App;
