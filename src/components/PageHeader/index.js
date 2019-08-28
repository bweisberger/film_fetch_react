import React, { Component } from 'react'
import Login from '../Login'
import Register from '../Register'
import MovieSearch from '../MovieSearch'

import { Menu, Grid, Image } from 'semantic-ui-react'


class PageHeader extends Component{
    constructor(){
        super()
        this.state = {
            // openLogin : false,
            // openRegister: false,
            username: '',
            email: '',
            password: '',
            // image: {}
        }
    }
    handleItemClick = (e, {name}) => {
        this.setState({activeItem: name})
        // if(e.target.name === 'login'){
        //     this.openLoginModal()
        // } else if( e.target.name === 'register'){
        //     this.openRegisterModal()
        // }
    }   
    // openLoginModal = () => {
    //     this.setState({
    //         openLogin: true
    //     })
    // }
    // openRegisterModal = () => {
    //     this.setState({
    //         openRegiser: true
    //     })
    // }
    render(){
        const { activeItem } = this.state
        return(
            // <Grid stackable style={{margin: '0'}}>
            //     <Grid.Row>
                    <Menu fluid stackable>
                            <Menu.Item
                                    as='a'
                                    href='/'
                                >
                               <Image style={{maxWidth: '100px', height: 'auto', margin: '0'}}className='home-image'src='LogoMakr_9vC763.png'/> 
                            </Menu.Item>
                        {/* <Grid.Column width={10}> */}
                            <Menu.Item
                                name='search'
                                active={activeItem === 'search'}
                                onClick={this.handleItemClick}
                                style={{minWidth: '50vw'}}
                                // position='center'
                                >
                                <MovieSearch findMovies={this.props.findMovies}/>
                            </Menu.Item>
                        {/* </Grid.Column> */}
                            
                        
                            <Menu.Menu 
                                position='right'>
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
            //     </Grid.Row> 
            // </Grid>   
        )
    }
}

export default PageHeader;