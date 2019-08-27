import React, { Component } from 'react';
import { Form, Label, Header, Modal } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';


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
        // const data = new FormData()
        // data.append('email', this.state.email)
        // data.append('password', this.state.password)
        const login = this.props.handleLogin({...this.state});

        login.then((data) => {
            if(data.status.code === 200){
                this.props.history.push('/login-success');
            } else {
                this.props.history.push('/login-failed')
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
                        <Form onSubmit={this.handleSubmit}>
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

export default withRouter(Login);