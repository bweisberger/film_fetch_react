import React, { Component } from 'react';
import { Header, Modal, Button } from 'semantic-ui-react';
import Register from '../Register'

class RegisterFailed extends Component{
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
                <Modal.Header>Register Failed</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Header>An account with that username or email address already exists.</Header>
                        <Register 
                        handleRegister={this.props.handleRegister} 
                        trigger={<Button>Retry</Button>}
                        /> 
                        <Button onClick={this.close}>
                            Cancel
                        </Button>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

export default RegisterFailed;