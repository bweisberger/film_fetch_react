import React, { Component } from 'react';
import { Header, Modal, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom'

class LoginSuccess extends Component{
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
        this.props.history.push('/profile')
    }
    render(){
        return(
            <Modal 
                open={this.state.open}
                onClose={this.close}
                size = 'small'
            >
                <Modal.Header>Success!</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Header>You have successfully logged in.</Header>
                        <Button onClick={this.close}>
                            Close
                        </Button>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

export default withRouter(LoginSuccess);