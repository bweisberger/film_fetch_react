import React from 'react'
import { List, Image, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const HistoryList = (props) =>{
    console.log(props.userHistory, "props.userHistory")
    console.log(props.user, "props.user")
    const listHistory = props.userHistory.map((movie)=>{
        return(
            <List.Item>
                <Image avatar src={movie.image} />
                <List.Content>
                    {/* <Link to={movie.url}> */}
                        <List.Header >{movie.title}</List.Header>
                    {/* </Link> */}
                </List.Content>
            </List.Item>
        )
    })
    return (
        <List>
            <Header as='h2' textAlign='center'>
                {props.user.username}'s Watch History
            </Header>
            {listHistory}
        </List>
    )
}

export default HistoryList