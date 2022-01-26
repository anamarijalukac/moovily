import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CircularProgress, Container, Grid, Typography, Avatar } from "@material-ui/core";
import ForYouMovie from './ForYouMovie/ForYouMovie';
import axios from 'axios';
import useStyles from "./styles";
import mobiscroll from "../../images/mobiscroll/js/mobiscroll.react.min";
import "../../images/mobiscroll/css/mobiscroll.react.min.css"
import img from "../../images/erik-mclean-U-Vu_r6qyyU-unsplash.jpg"

const ForYou = () =>{
  const {id} = useParams()
  const [reccomended, setReccomended] = useState([])
  const classes = useStyles();
  const [user, setUser] = useState({})
  useEffect(() => {
    axios.get(`http://localhost:5000/facebook/${id}`)
    .then(res =>{
        setUser(res.data)
    })
    .catch((error)=>{
        console.error("Error was made!",error)
    })
    }, []);

  useEffect(() => {
    axios.get(`http://localhost:5000/facebook/${id}/recommended`)
    .then(res =>{
        setReccomended(res.data)
    })
    .catch((error)=>{
        console.error("Error was made!",error)
    })
    }, []);

    
    return(
        !reccomended.length ? <CircularProgress/> : (
          <div>
            <Container style={{padding: 0}}>
                    <Typography
                        variant="h2"
                        className={classes.heading}
                        gutterBottom
                    >
                        For you...
                    </Typography>

                </Container>

                <Container className={classes.card}>

                    <Avatar className={classes.card__image}
                            src={user?.picture}/>

                    <p className={classes.card__name}> {user?.name}</p>
                    <div className={classes.grid_container}>
                        <Typography
                            variant="h5"
                            gutterBottom
                        > Wishlist length: {user?.wishlist?.length}</Typography>

                        <Typography
                            variant="h5"
                            gutterBottom
                        > Previously watched: {user?.watched_movies?.length}
                        </Typography>


                    </div>


                </Container>

                <Typography
                    variant="body1"
                    className={classes.heading2}
                    gutterBottom
                >
                    In the section below, you can find movies that are based on your preferences. The more you
                    fill your wishlist and watchlist, the recommendations will get better!
                </Typography>
            <mobiscroll.ScrollView layout="fixed" itemWidth={400}  snap={false}>
                {reccomended.map((movie) => movie==null ? <div/>:(
                    <ForYouMovie movie={movie}/>
                )
                )}
              </mobiscroll.ScrollView>
          </div>
        ));
}

export default ForYou