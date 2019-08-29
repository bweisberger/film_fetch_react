import React, { Component } from 'react';
import UserList from '../UserList';
import { Header } from 'semantic-ui-react'


class Feed extends Component{
    constructor(){
        super()
        this.state = {
            
        }
    }
    
    render(){
        console.log(this.props.users, '<----this.props.users in Feed')
        return(
            <div>
                <Header>Home</Header>
                <UserList users={this.props.users} searchUser={this.props.searchUser}/>  
            </div>
        )
    }
}

export default Feed;