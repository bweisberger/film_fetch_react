import React, { Component } from 'react';
import { Form, Button, Grid, Header, Input } from 'semantic-ui-react'

class MovieSearch extends Component{
    constructor(){
        super();
        this.state = {
            title: "",
        }
    }
    handleClick = (e) =>{
        this.setState({
            title: ""
        })
    }
    handleChange = (e) =>{
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        });
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        // console.log(this.state.title)
        this.props.findMovies(this.state.title);
        // this.setState({
        //     title: ""
        // })
        
    }
    render(){
        return(
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input action={{ icon: 'search'}}type='text' name='title' value={this.state.title} fluid style={{minWidth: '75vw'}} size='small' placeholder="Search movies or shows" onChange={this.handleChange} onClick={this.handleClick}/>
                    {/* <Button type='submit'>Search</Button> */}
                </Form>
                
            </div>
        )
    }
}

export default MovieSearch;
