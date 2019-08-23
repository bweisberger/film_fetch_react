import React, { Component} from 'react';
import { Card, Feed, Image } from 'semantic-ui-react'

const MovieList = (props) =>{
    const movieMap = props.movies.map((result)=>{
        return (
            result.locations.map((location)=>{
                console.log(result.locations, '<--from inside movielist')
                return(
                    <Card key={location.id} style={{overflow: 'hidden'}}>
                        <Card.Content>
                            <Card.Header style={{fontSize: "24pt"}}>{result.name}</Card.Header>
                            {/* <Card.Meta>
                                <span className='data'
                            </Card.Meta> */}
                            <Feed>
                                <a href={location.url}>
                                <Feed.Event>
                                {console.log(location.display_name, "<----from inside locations loop return")}
                                    <Feed.Label image={location.icon}/> 
                                    <Feed.Content>
                                        <Feed.Summary>
                                            {location.display_name}
                                        </Feed.Summary>
                                    </Feed.Content>
                                </Feed.Event>
                                </a>  
                            </Feed>
                        </Card.Content>
                        <Image src={result.picture} wrapped ui={false} size='small'/>
                    </Card>         
                ) 
            })
        )   
    })
        
    
    return(
        <div>
            {movieMap}  
        </div> 
    )
}

export default MovieList;