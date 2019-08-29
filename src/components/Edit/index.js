import React, { Component } from 'react'
import { Label, Form, Grid, Header } from 'semantic-ui-react'
import { withRouter, Link } from 'react-router-dom'

class Edit extends Component{
    constructor(){
        super();
        this.state = {
            username: '',
            email: ''
        }
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const update = this.props.updateUser(this.props.user.id, this.state);
        // console.log(this.state, "this.state in Edit handlesubmit")
        update.then((data)=>{
            if(data.status.code === 200){
                this.props.history.push('/')
            }
        })
        
    }
    componentDidMount(){
        this.setState({
            username: this.props.user.username,
            email: this.props.user.email
        })
    }
    render(){
        return(
            <div>
                <Header>Edit account info</Header>
                <Form onSubmit={this.handleSubmit}>
                    <Label>Email Address</Label>
                    <Form.Input name='email' value={this.state.email} type='text' placeholder={this.props.user.email} onChange={this.handleChange}/>
                    <Label>Username</Label>
                    <Form.Input name='username' value={this.state.username} type='text' placeholder={this.props.user.username} onChange={this.handleChange}/>
                    {/* <Label>Profile Picture</Label> */}
                    {/* <Form.Input name='image' type='file' onChange={this.handleChange}/> */}
                    <Form.Input type='submit' value='Edit'/>
                    <Link style={{color:'red'}} onClick={this.props.deleteUser.bind(null, this.props.user.id)} to='/'>Delete User</Link>
                </Form>
            </div>
        )
    }
}

export default withRouter(Edit)