import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import HistoryList from '../HistoryList'
import Edit from '../Edit'



class Profile extends Component{
    constructor(){
        super()
        this.state = {
            user : {},
            history : []
        }
    }
    searchUser = async (name) => {
        try {
            const foundUser = await fetch(process.env.REACT_APP_BACKEND_URL+'/user/v1/'+name, {
                method: 'GET',
                credentials: 'include'
            })
          const parsedFoundUser = await foundUser.json();
          console.log(parsedFoundUser, '<--parsedFoundUser in searchUser/profile');
          if(parsedFoundUser.status.code === 200){
              this.setState({
                  user: parsedFoundUser.data
              })
            return
          }
        } catch(err){
          console.log(err)
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
        if(parsedResponse.status.code === 200){
        this.setState({
            history: parsedResponse.data,
            editModal: false
        })
        
        }

    } catch(err) {
        console.log(err)
    }
    }

    updateUser = async (id, data) => {
    try{
        const updatedUser = await fetch(process.env.REACT_APP_BACKEND_URL+'/user/v1/'+id, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
        })

        const parsedUpdate = await updatedUser.json();
        console.log(parsedUpdate, 'parsedUpdate in updateUser in app.js')
        if(parsedUpdate.status.code === 200){
            this.setState({
                ...parsedUpdate.data,
                })
            this.props.getUsers()
        }
        
        return parsedUpdate
    } catch(err){
        console.log(err)
    }
    }
    
    deleteUser = async (id) => {
    try{
        const deletedUser = await fetch(process.env.REACT_APP_BACKEND_URL+'/user/v1/'+id, {
        method: 'DELETE',
        credentials: 'include'
        })
        const parsedUser = await deletedUser.json();
        console.log(parsedUser, '<---parsedUsers in deleteUser in app.js')
        if(parsedUser.status.code === 200){
            this.props.getUsers()
        }
        return
    } catch(err){
        console.log(err)
        return err
    }
    }
    toggleEdit = () =>{
        this.setState({
            editModal: true
        })
    }
    componentDidMount = () => {
        let name = this.props.match.params.name
        console.log(name, "<---name (this.props.match.params.name");
        this.searchUser(name);
        this.getHistory(name);
    }
    render() {
        return(
            <Grid columns={2} padded style={{ height: '100vh'}}>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <HistoryList user={this.state.user} userHistory={this.state.history}/>
                    </Grid.Column>
                    <Link onClick={this.toggleEdit}>Edit User</Link>
                    {this.state.editModal ? <Edit user={this.state.user} updateUser={this.updateUser} deleteUser={this.deleteUser}/> : null }
                </Grid.Row>
            </Grid>

        )
    }
}

export default Profile;