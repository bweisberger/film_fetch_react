import React, { Component } from 'react';
import { Header, Modal, Button, Label } from 'semantic-ui-react';
import Login from '../Login'
import Register from '../Register';

class LoginFailed extends Component{
    constructor(){
        super()
        this.state = {
            open: true
        }
    }
    close = () =>{
        this.setState({
            open: false
        })
    }
    render(){
        return(
            <Modal 
                open={this.state.open}
                onClose={this.close}
                size = 'small'
            >
                <Modal.Header>Login Failed</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Header>Incorrect username or password.</Header>
                        <Login 
                            handleLogin={this.props.handleLogin} 
                            trigger={<Button>Retry</Button>}
                        />
                        <Button onClick={this.close}>
                            Cancel
                        </Button>
                        <Header>No Account?</Header>
                        <Register
                            handleRegister={this.props.handleRegister}
                            trigger={<Button>Sign Up</Button>}
                        />                        
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

export default LoginFailed;