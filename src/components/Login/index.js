import React, { Component } from 'react';
import { Form, Label, Header, Modal } from 'semantic-ui-react';


class Login extends Component{
    constructor(){
        super()
        this.state = {
            email: '',
            password: ''
        }
    }
    handleChange = (e) => {
        this.setState({[e.currentTarget.name]: e.currentTarget.value})
    }
    handleSubmit = async (e) => {
        e.preventDefault();

        const login = this.props.handleLogin(this.state);

        login.then((data) => {
            if(data.status.message === 'Success'){
                this.props.history.push('/profile');
            } else {
                console.log(data, this.props)
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    render(){
        return(
            <Modal trigger={this.props.trigger}
                size = 'small'
            >
                <Modal.Header>Log in to your account</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Header>Log in</Header>
                        <Form onSubmit={this.props.handleLogin}>
                            <Label>Email Address</Label>
                            <Form.Input name='email' value={this.state.email} type='email' placeholder='Enter your email address' onChange={this.handleChange}/>
                            <Label>Password</Label>
                            <Form.Input name='password' value={this.state.password} type='password' placeholder='Enter your password' onChange={this.handleChange}/>
                            <Form.Input type='submit'/>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

export default Login