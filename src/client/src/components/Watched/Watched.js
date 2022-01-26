import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {CircularProgress, Grid, Typography, Container} from "@material-ui/core";
import WatchedMovie from './WatchedMovies/WatchedMovie'
import useStyles from "./styles";
import mobiscroll from "../../images/mobiscroll/js/mobiscroll.react.min";
import "../../images/mobiscroll/css/mobiscroll.react.min.css"


const Watched = () =>{
    const classes = useStyles();
    const {id} = useParams()
    const [watchlist, setWatchList] = useState([])
    useEffect(() => {
        fetch("/facebook/" + id)
          .then(async (response) => {
            const data = await response.json()
            if (!response.ok) {
              const error = (data && data.message) || response.status;
              alert(error);
              return Promise.reject(error);
            }
            setWatchList(data.watched_movies);
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      }, []);

    
    return(
        !watchlist.length ? <CircularProgress/> : (
          <div>
              <Container style={{padding: 0}}>
                  <Typography
                      variant="h2"
                      className={classes.heading}
                      gutterBottom
                  >
                      Previously watched...
                  </Typography>
                  <Typography
                      variant="h5"
                      className={classes.sub}
                      gutterBottom
                  >
                      Keep track of all movies you watched.
                  </Typography>
              </Container>



              <mobiscroll.ScrollView layout="fixed" itemWidth={400}  snap={false}>
                  {watchlist.map((movie) => movie==null ? <div/>:(

                              <WatchedMovie movie={movie}/>

                      )
                  )}
              </mobiscroll.ScrollView>


          </div> 
        ));
}

export default Watched