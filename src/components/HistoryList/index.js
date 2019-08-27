import React from 'react'
import { List, Image } from 'semantic-ui-react'

const HistoryList = (props) =>{
    const listHistory = props.userHistory.map((movie)=>{
        return(
            <List.Item>
                    <Image avatar src={movie.image} />
                    <List.Content>
                        <List.Header as='a' href={movie.url}>{movie.name}</List.Header>
                    </List.Content>
                </List.Item>
        )
    })
    return (
        <List>
            {listHistory}
        </List>
    )
}

export default HistoryList