import React, {useState} from "react";
import {Button,CardHeader, Card, CardMedia, Typography, CardActions, ButtonBase} from "@material-ui/core";
import Flippy, {BackSide, FrontSide} from 'react-flippy';
import picture from "./images/download.png";
import { Add } from "@material-ui/icons";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { addWishList } from "../../../actions/FacebookUser";
import { getRecommended } from "../../../actions/recommended";
import { useLocation, useNavigate } from "react-router-dom";


//sori na dupliciranju koda al ne radi ovo sa show
const ForYouMovie = ({movie}) => {
    const classes = useStyles()
    const [clicked,setClicked] = useState(false)
    const dispatch =useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate()

    const openMovie = (e) => {
        if(Array.isArray(movie)){
            dispatch(getRecommended(movie[0].tmdbID))
            navigate(`/movie/${movie[0].tmdbID}`)
        }else{
            dispatch(getRecommended(movie.tmdbID))
            navigate(`/movie/${movie.tmdbID}`)
        }
    };

    return (
        Array.isArray(movie) ? (
        <Card className={classes.card}>
            <Flippy style={{height:"500px"}}
                flipOnHover={false} // default false
                flipOnClick={true} // default false
                flipDirection="horizontal" // horizontal or vertical
            >
                 <FrontSide>
                    <ButtonBase 
                        component="span"
                        name="see details"
                        onClick={openMovie}
                    >
                        <CardHeader className={classes.title} title={movie[0].title}/>
                    </ButtonBase>
                    <CardMedia className={classes.media} image={'https://image.tmdb.org/t/p/original'+movie[0]?.Poster} title={movie[0]?.title}/>
                </FrontSide>
                <BackSide style={{backgroundColor:'rgba(255,153,0,0.78)',}}>
                    <Typography variant={"h5"} className={classes.text} gutterBottom><b>Title:</b> {movie[0]?.title}</Typography>
                    <b className={classes.text}>Plot:</b><Typography className={classes.text} variant={"body2"} gutterBottom color="textSecondary"> {movie[0]?.Plot}</Typography>
                    <Typography variant={"body2"} className={classes.text} gutterBottom><b>Popularity:</b> {movie[0]?.imdbRating}</Typography>
                    <Typography variant={"body2"} className={classes.text} gutterBottom><b>Release date:</b> {movie[0]?.year}</Typography>
                </BackSide>
            </Flippy>
            {user && (<Button variant="contained" color="primary" disabled={clicked} startIcon={<Add />} onClick={()=>{
                    dispatch(addWishList(user.response.id,movie[0]?.tmdbID))
                    setClicked(true)
                }}>
                    Add to wishlist
                </Button>)}
            </Card>) :
         (
             <Card className={classes.card}>
             <Flippy
                 flipOnHover={true} // default false
                 flipOnClick={true} // default false
                 flipDirection="horizontal" // horizontal or vertical
             >
                <FrontSide>
                    <CardHeader className={classes.title} title={movie[0]?.title}/>
                    <CardMedia className={classes.media} image={'https://image.tmdb.org/t/p/original'+movie[0]?.Poster} title={movie[0]?.title}/>
                </FrontSide>
                <BackSide>
                    <Typography variant={"h5"} className={classes.text} gutterBottom><b>Title:</b> {movie[0]?.title}</Typography>
                    <b className={classes.text}>Plot:</b><Typography className={classes.text} variant={"body2"} gutterBottom color="textSecondary"> {movie[0]?.Plot}</Typography>
                    <Typography variant={"body2"} className={classes.text} gutterBottom><b>Popularity:</b> {movie[0]?.imdbRating}</Typography>
                    <Typography variant={"body2"} className={classes.text} gutterBottom><b>Release date:</b> {movie[0]?.year}</Typography>
                </BackSide>
             </Flippy>
             {user && (<Button variant="contained" color="primary" disabled={clicked} startIcon={<Add />} onClick={()=>{
                     dispatch(addWishList(user.response.id,movie.tmdbID))
                     setClicked(true)
                 }}>
                     Add to wishlist
                 </Button>)}
         </Card>
        )
    )
}
export default ForYouMovie;