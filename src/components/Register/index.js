import React, { Component } from 'react'
import { Modal, Header, Label, Form } from 'semantic-ui-react'

class Register extends Component{
    constructor(){
        super();
        this.state = {

        }
    }
    handleChange = (e) => {
        if(e.target.name !== 'image'){
            this.setState({[e.currentTarget.name]: e.currentTarget.value})
        } else {
            console.log(e.target.files[0])
            this.setState({image: e.target.files[0]});
        }
    }
    render(){
        return(
            <Modal
                        size = 'small'
                        trigger={this.props.trigger}
                    >
                        <Modal.Header>Create an account</Modal.Header>
                        <Modal.Content>
                            <Modal.Description>
                                <Header>Enter an email address and password to create a new account</Header>
                                <Form onSubmit={this.handleSubmit}>
                                    <Label>Email Address</Label>
                                    <Form.Input name='email' value={this.state.email} type='email' placeholder='Enter your email address' onChange={this.handleChange}/>
                                    <Label>Username</Label>
                                    <Form.Input name='username' value={this.state.username} type='text' placeholder="Enter a username" onChange={this.handleChange}/>
                                    <Label>Password</Label>
                                    <Form.Input name='password' value={this.state.password} type='password' placeholder='Enter your password' onChange={this.handleChange}/>
                                    <Label>Profile Picture</Label>
                                    <Form.Input name='image' type='file' onChange={this.handleChange}/>
                                    <Form.Input type='submit'/>
                                </Form>
                            </Modal.Description>
                        </Modal.Content>
                    </Modal>
        )
    }
}

export default Register