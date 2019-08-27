import React, { Component } from 'react';
import './App.css';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import MovieList from './components/MovieList'
import PageHeader from './components/PageHeader'
import Profile from './components/Profile'
import Feed from './components/Feed'
import RegisterFailed from './components/RegisterFailed'
import RegisterPassed from './components/RegisterPassed'
import LoginFailed from './components/LoginFailed'
import LoginSuccess from './components/LoginSuccess'
// import { addSyntheticLeadingComment } from 'typescript';

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
      users: [],
      userHistory: [],
      movies: [],
      lastWatched: '',
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
      const url = await process.env.REACT_APP_BACKEND_URL+'/watch/v1/search/'+title
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
      this.props.history.push('/search')
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
    console.log(loginData, "<---in handleLogin, in App.js")
    try{
      const loginResponse = await fetch(process.env.REACT_APP_BACKEND_URL+'/user/v1/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(loginData),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const parsedResponse = await loginResponse.json();
      console.log(parsedResponse, "<----parsedResponse in handleLogin, app.js");
      this.setState(() => {
        return {
          ...parsedResponse.data,
          loading: false,
          logged: true
        }
      })
    
      return parsedResponse;

    } catch (err) {
      console.log(err)
    }
  }

  handleRegister = async (data) => {
    try {

      const registerResponse = await fetch(process.env.REACT_APP_BACKEND_URL+'/user/v1/register', {
        method: 'POST',
        credentials: 'include',
        body: data,
        headers: {
          'enctype': 'multipart/form-data'
        }
      })

      const parsedResponse = await registerResponse.json();

      console.log(parsedResponse, "parsedResponse in handleRegister in app.js")

      this.setState({
        ...parsedResponse.data,
        loading: false,
        logged: true
      })

      return parsedResponse;

    } catch(err) {
      console.log(err)
    }
  }

  searchUser = async(name) => {
    try {
      const foundUser = await fetch(process.env.REACT_APP_BACKEND_URL+'/user/v1/search/'+name, {
        method: 'GET',
        credentials: 'include'
      })
      const parsedFoundUser = await foundUser.json();
      console.log(parsedFoundUser, '<--parsedFoundUser');
      return parsedFoundUser.data;
    } catch(err){
      console.log(err)
    }
  }

  updateUser = async (name, data) => {
    if(this.state.logged){
      try{
        const updatedUser = await fetch(process.env.REACT_APP_BACKEND_URL+'/user/v1/'+name, {
          method: 'PUT',
          credentials: 'include',
          body: data,
          headers: {
            'enctype': 'multipart/form-data'
          }
        })
  
        const parsedUpdate = await updatedUser.json();
        console.log(parsedUpdate, 'parsedUpdate in updateUser in app.js')
  
        this.setState({
          ...parsedUpdate.data,
          loading: false,
          logged: true
        })
        return parsedUpdate
      } catch(err){
        console.log(err)
      }
    } else {
      console.log('this.state.logged, ', this.state.logged)
    }
  }

  deleteUser = async (name) => {
    if(this.state.logged){
      try{
        const deletedUser = await fetch(process.env.REACT_APP_BACKEND_URL+'/user/v1/'+name, {
          method: 'DELETE',
          credentials: 'include'
        })
        const parsedUser = await deletedUser.json();
        console.log(parsedUser, '<---parsedUsers in deleteUser in app.js')
        this.setState({
          userHistory: [],
          username: '',
          email: '',
          image: '',
          logged: false,
          loading: true
        })
        return
      } catch(err){
        console.log(err)
        return err
      }
    } else {
      console.log(this.state.logged, "<--this.state.logged in app.js")
      return 
    }
    
  }
  handleLogout = async () => {
    try{
      const logoutUser = await fetch(process.env.REACT_APP_BACKEND_URL+'/user/v1/logout', {
        method: 'GET',
        credentials: 'include'
      })
      const parsedLogout = await logoutUser.json();
      console.log(parsedLogout, '<--parsedLogout in app.js')
      if (parsedLogout.status.code === 200){
        this.props.history.push('/feed')
      }
      this.setState({
        userHistory: [],
        username: '',
        email: '',
        image: '',
        logged: false,
        loading: true
      })
      return parsedLogout;
      
    } catch(err){
      console.log(err)
      return err;
    }
  }

  getUsers = async () => {
    try {
      const allUsers = await fetch(process.env.REACT_APP_BACKEND_URL+'/user/v1/', {
        method: 'GET',
        credentials: 'include'
      })
      const parsedUsers = await allUsers.json()
      console.log(parsedUsers, "<---parsedUsers in getUsers in app.js")
      return parsedUsers.data;
    } catch(err){
      console.log(err)
      return err
    }
  }

  getHistory = async (name) => {
    try {
      const historyResponse = await fetch(process.env.REACT_APP_BACKEND_URL+'/user/v1/'+name+'/history', {
        method: 'GET',
        credentials: 'include'
      })
      const parsedResponse = await historyResponse.json();
      console.log(parsedResponse, '<---parsedResponse in getHistory in app.js')
      this.setState({
          history: [...parsedResponse.data]
      })
      return parsedResponse.data;

    } catch(err) {
      console.log(err)
    }
  }

  addHistory = async (title, id) => {
    this.setState({
      lastWatched: title
    })
    try {
      const historyResponse = await fetch(process.env.REACT_APP_BACKEND_URL+'/watch/v1/'+title+'/us/'+id, {
        method: 'GET',
        credentials: 'include',
      })
      const parsedResponse = await historyResponse.json();
      console.log(parsedResponse, '<--parsedResponse in addHistory in app.js')
      return parsedResponse.data;

    } catch(err){
      console.log(err)

    }
  }

  componentDidMount = async() => {
    const users = await this.getUsers()
    console.log(users, "<----users in componentDidMount")
    this.setState({
      users: [...users]
    })
  }

  render(){
    return (

      <Grid className="App">
        <PageHeader findMovies={this.findMovies} handleLogin={this.handleLogin} handleRegister={this.handleRegister}/>
        <Grid.Row columns={12}>
          <Grid.Column></Grid.Column>
          <Grid.Column width={10} centered>
            <Switch>
              <Route exact path='/profile' render={(props) => <Profile {...props} userInfo={this.state} userHistory={this.state.userHistory} /> }/>
              <Route exact path='/' render={(props) => <Feed {...props} users={this.state.users} searchUser={this.searchUser}/>}/>
              <Route exact path='/register-failed' render={(props) => <RegisterFailed {...props} handleRegister={this.handleRegister}/>}/>
              <Route exact path='/success' render={(props) => <RegisterPassed {...props} />}/>
              <Route exact path='/login-failed' render={(props) => <LoginFailed {...props} handleRegister={this.handleRegister} handleLogin={this.handleLogin}/>}/>
              <Route exact path='/login-success' render={(props) => <LoginSuccess {...props} />}/>
              <Route exact path = '/search' render={(props) => <MovieList addHistory={this.addHistory} movies={this.state.movies}/>}/>
              <Route component={My404}/>
            </Switch>
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid.Row>
      </Grid>
      
    );
  }
}

export default withRouter(App);
