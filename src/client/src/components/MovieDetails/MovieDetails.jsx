import React, { useEffect, useState } from 'react';
import { Paper, Typography, Divider, CircularProgress, Link, Button } from '@material-ui/core/';
import { Add, LaptopWindowsOutlined } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { addWishList } from '../../actions/FacebookUser';
import useStyles from './styles';
import axios from 'axios'
import { getRecommended } from '../../actions/recommended';

const MovieDetails = () => {
    const [movie,setMovie] = useState({title:'null'});
    const [clicked, setClicked] = useState(false)
    const recommended = useSelector((state)=>state.recommended);
    const user = JSON.parse(localStorage.getItem('profile'));
    const [review, setReview] = useState("")
    const [genres, setGenres] = useState("");
    const classes = useStyles()
    const {imdbID} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/${imdbID}?api_key=88a3b7ce6c97ef1f3ebe1943558670cf`)
          .then(res =>{
              setMovie(res.data)
              setGenres(res.data.genres.map(function(elem){return elem.name;}).join(", "))
          })
          .catch((error)=>{
              console.error("Error was made!",error)
          })
    },[location])

    setTimeout(()=> {
        if(movie.title !== 'null'){
            axios.get(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${movie.title}&api-key=QdCQ3fpakDMF2I1SASFb9vPWTA8bttRf`)
            .then(res =>{
                console.log(movie.title)
                setReview(res.data.results[0].link.url)
            })
            .catch((error)=>{
                console.error("Error was made!",error)
            })
        }
        
    },0.35)


    const openMovie = (e) => {
        dispatch(getRecommended(e))
        navigate(`/movie/${e}`);
    };

      
    

    return (
        !movie ? <CircularProgress/> : 
        (<Paper style={{ padding: '20px', borderRadius: '15px', margin:'10px' }} elevation={6}>
            <div className={classes.card}>
            <div className={classes.section}>
                <Typography variant="h3" component="h2">{movie.title}</Typography>
                <Typography gutterBottom variant="body1" component="p">{movie.year}</Typography>
                <Typography variant="h6">Plot: {movie.overview}</Typography>
                <Divider style={{ margin: '20px 0' }} />
                <Typography variant="h6">imdb Rating: {movie.vote_average}</Typography>
                <Typography variant="h6">Votes: {movie.vote_count}</Typography>
                <Typography variant="h6">Genres: {genres}</Typography>
                {review ? (<Link href={review} target="_blank" rel="noopener"><Typography variant='h6'>New York Times review article</Typography></Link>):(<></>)}
                {user && (<Button variant="contained" color="primary" disabled={clicked} startIcon={<Add />} onClick={()=>{
                    console.log(movie.imdbID)
                    dispatch(addWishList(user.response.id,movie.id))
                    setClicked(true)
                }}>
                    Add to wishlist
                </Button>)}
               
            </div>
            <div className={classes.imageSection}>
                <img className={classes.media} src={'https://image.tmdb.org/t/p/original/'+movie.poster_path} alt={movie.original_title} />
            </div>
            </div>
            {recommended ? (
                <div className={classes.section}>
                <Typography gutterBottom variant="h5">You might also like:</Typography>
                <Divider />
                <div className={classes.recommendedPosts}>
                    {recommended?.slice(0,6).map((movie) => (
                    <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openMovie(movie[0]?.tmdbID)} key={movie[0]?._id}>
                        <Typography gutterBottom variant="h6">{movie[0]?.title}</Typography>
                        <Typography gutterBottom variant="subtitle2">{movie[0]?.year}</Typography>
                        {movie[0] && (<img src={'https://image.tmdb.org/t/p/original/'+movie[0]?.Poster} width="200px" />)}
                    </div>
                    ))}
                </div>
                </div>
            ): <CircularProgress/>}
        </Paper>)
    )


}

export default MovieDetails