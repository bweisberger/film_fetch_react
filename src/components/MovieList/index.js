import React, { Component} from 'react';
import { Grid, Card, Feed, Image } from 'semantic-ui-react'

const MovieList = (props) =>{
    const movieMap = props.movies.map((result)=>{
        return (
            result.locations.map((location)=>{
                console.log(result.locations, '<--from inside movielist')
                return(
                    <Grid.Column>
                        <Card key={location.id} style={{overflow: 'hidden'}}>
                            <Image src={result.picture} wrapped ui={false} size='small'/>
                            <Card.Content className="movie-card">
                                <Card.Header style={{fontSize: "24pt"}}>{result.name}</Card.Header>
                                {/* <Card.Meta>
                                    <span className='data'
                                </Card.Meta> */}
                                <Feed>
                                    <a href={location.url} target="_blank">
                                    <Feed.Event onClick={props.addHistory.bind(null, result.name, location.id)}>
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
                        </Card>  
                    </Grid.Column>       
                ) 
            })
        )
          
    })
        
    
    return(
        <Grid centered stackable columns={4}>
            {movieMap}
        </Grid> 
    )
}

export default MovieList;