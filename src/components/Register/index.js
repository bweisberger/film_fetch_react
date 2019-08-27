import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Header, Label, Form } from 'semantic-ui-react';

class Register extends Component{
    constructor(){
        super();
        this.state = {
            modalOpen: false,
            username: '',
            password: '',
            email: '',
            image: {}
        }
    }
    // handleClose = () => {
    //     this.setState({
    //         modalOpen: false
    //     })
    // }
    handleChange = (e) => {
        if(e.target.name !== 'image'){
            this.setState({[e.currentTarget.name]: e.currentTarget.value})
        } else {
            console.log(e.target.files[0])
            this.setState({image: e.target.files[0]});
        }
    }
    handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('image', this.state.image);
        data.append('username', this.state.username);
        data.append('password', this.state.password);
        data.append('email', this.state.email);

        console.log(data.entries(), '<---data')
        for (let pair of data.entries()){
            console.log(pair[0] ,', ', pair[1])
        }

        const registerCall = this.props.handleRegister(data);

        registerCall.then((data) => {
            console.log(data)
            if (data.status.message === 'Success'){
                this.props.history.push('/success');
            } else {
                this.props.history.push('/register-failed')
            }
        })
    }
    render(){
        return(
            <Modal 
                size = 'small' 
                // open = {this.state.modalOpen}
                trigger={this.props.trigger}
                // onClose={this.handleClose}
                // actions={['Snooze', { key: 'done', content: 'Done', positive: true }]}
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
                            <Form.Input type='submit' value='Sign Up' onClick={this.handleClose}/>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

export default withRouter(Register);