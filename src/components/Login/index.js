import React, { Component } from 'react';
import { Form, Label, Header, Modal } from 'semantic-ui-react';


class Login extends Component{
    constructor(){
        super()
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
            <Modal trigger={this.props.trigger}
                size = 'small'
            >
                <Modal.Header>Log in to your account</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Header>Log in</Header>
                        <Form onSubmit={this.handleLogin}>
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