import React from 'react'
import { List, Image } from 'semantic-ui-react'

const UserList = (props) => {
    const userList = props.users.map((user)=>{
            return(
                <List.Item>
                    {/* <Image avatar src={'http://localhost:8000/profile_pics/'+user.image} /> */}
                    <List.Content>
                        <List.Header as='a' onClick={props.searchUser.bind(null, user.username)}>{user.username}</List.Header>
                        <List.Description>
                        Last seen watching{' '}
                        <a>
                            <b>{user.lastWatched}</b>
                        </a>{' '}
                        just now.
                        </List.Description>
                    </List.Content>
                </List.Item>
            )
        })
    return(
        <List>
            {userList}
        </List>
    )
}

export default UserList;