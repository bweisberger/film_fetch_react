import React, { Component } from 'react'
import Login from '../Login'
import Register from '../Register'
import { Menu } from 'semantic-ui-react'


class PageHeader extends Component{
    constructor(){
        super()
        this.state = {
            openLogin : false,
            username: '',
            email: '',
            password: '',
            image: {}
        }
    }
    handleItemClick = (e, {name}) => {
        this.setState({activeItem: name})
    }   
    render(){
        const { activeItem } = this.state
        return(
            <Menu stackable>
                <Menu.Item
                    name='home'
                    active = {activeItem === 'home'}
                    onClick={this.handleItemClick}
                >
                    Home
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Login handleLogin={this.props.handleLogin} trigger={
                        <Menu.Item 
                                name='login' 
                                active={activeItem==='login'} 
                                onClick={this.handleItemClick}
                            >
                                Login
                        </Menu.Item>
                        }
                    />
                    <Register handleRegister={this.props.handleRegister} trigger={
                        <Menu.Item 
                            name='register' 
                            active={activeItem==='register'} 
                            onClick={this.handleItemClick}
                        >
                            Sign Up
                        </Menu.Item>
                        }
                    /> 
                    <Menu.Item
                        name='help'
                        active={activeItem === 'help'}
                        onClick={this.handleItemClick}
                    >
                        Help
                    </Menu.Item>
                </Menu.Menu>       
            </Menu>
        )
    }
}

export default PageHeader;