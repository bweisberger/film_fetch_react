import React from 'react'
import { List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const UserList = (props) => {
    const userList = props.users.map((user)=>{
            return(
                <List.Item>
                    {/* <Image avatar src={'http://localhost:8000/profile_pics/'+user.image} /> */}
                    <List.Content>
                        <Link to={`/profile/${user.username}`}>
                            <List.Header>{user.username}</List.Header>
                        </Link>
                        <List.Description>
                        Last seen watching something spectacular just now.
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