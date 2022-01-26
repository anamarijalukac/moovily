import React, {useState, useEffect} from "react";
import useStyles from "./styles";
import {Button,CardHeader, Card, CardActions, CardMedia, Typography,ButtonGroup, ButtonBase} from "@material-ui/core";
import Flippy, {BackSide, FrontSide} from 'react-flippy';
import {useDispatch, useSelector} from "react-redux";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { Check, Add } from "@material-ui/icons";
import {likeMovie} from "../../../actions/movies";
import {addWatchedList, addWishList} from "../../../actions/FacebookUser"
import { useLocation, useNavigate } from "react-router-dom";
import { getRecommended } from "../../../actions/recommended";



const Movie = ({movie}) => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [clickedWishlist, setClicked] = useState(false)
    const [clickedW, setClickedW] = useState(false)
    const wishlist = useSelector((state)=>state.wishlist)
    const [likes,setLikes] = useState(movie?.likes);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const openMovie = (e) => {
        dispatch(getRecommended(movie.tmdbID))
        navigate(`/movie/${movie.tmdbID}`)
    };

    const userId = user?.response.id
    const hasLikedMovie = movie?.likes?.find((like) => like === userId);
    

    const handleLike = async () => {
        dispatch(likeMovie(movie._id));
        if (hasLikedMovie) {
          setLikes(movie.likes.filter((id) => id !== userId));
        } else {
          setLikes([...movie.likes, userId]);
        }
      };

    const Likes = () => {
        if (likes.length > 0) {
          return likes.find((like) => like === userId)
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };

    return (
        <Card className={classes.card}>
            <Flippy
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
                    <CardHeader className={classes.title} title={movie.title}/>
                    </ButtonBase>
                    <CardMedia className={classes.media} image={'https://image.tmdb.org/t/p/original/'+movie.Poster} title="Click to see details"/>
                    {user?.response ? (
                        <ButtonGroup className={classes.buttonGroup}>
                            {(wishlist?.filter(mov => mov?._id === movie._id).length > 0) ?  
                            (<Button variant="contained" color="primary" disabled startIcon={<Add />} onClick={()=>{
                            }}>
                            Already added
                            </Button>) : (
                            <Button variant="contained" color="primary" disabled={clickedWishlist} startIcon={<Add />} onClick={()=>{
                                console.log(movie.tmdbID)
                                dispatch(addWishList(user.response.id,movie.tmdbID))
                                setClicked(true)
                            }}>
                            Add to wishlist
                            </Button>
                            )}
                            <Button variant="contained" startIcon={<Check />} disabled={clickedW} onClick={()=>{
                                dispatch(addWatchedList(user.response.id,movie.tmdbID))
                                setClickedW(true)
                            }}>
                            Watched
                            </Button>
                        </ButtonGroup>
                    ) : (<div></div>)}
                    <Button size="small" color="primary" disabled={!user?.response} onClick={handleLike}>
                        <Likes />
                    </Button>
                </FrontSide>
                <BackSide>
                    <Typography  className={classes.text} variant={"h5"} gutterBottom><b>Title:</b> {movie.title}</Typography>
                    <b className={classes.text}>Plot:</b><Typography className={classes.text} variant={"body2"} gutterBottom color="textSecondary"> {movie.Plot}</Typography>
                    <Typography className={classes.text} variant={"body2"} gutterBottom><b>Popularity:</b> {movie.imdbRating}</Typography>
                    <Typography className={classes.text} variant={"body2"} gutterBottom><b>Release date:</b> {movie.year}</Typography>
                </BackSide>
            </Flippy>
        </Card>

    )
}
export default Movie;