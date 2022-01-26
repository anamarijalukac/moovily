import React, {useEffect, useState} from "react";
import {Box, Card, CardMedia, Typography} from "@material-ui/core";
import Flippy, {BackSide, FrontSide} from 'react-flippy';
import picture from "./images/download.png";
import useStyles from "./styles";
import {useDispatch} from "react-redux";
import axios from "axios";


const WatchedMovie = ({movie}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'));
    const [awards, setAwards] = useState([]);

    useEffect(() => {
        const options = {
            method: 'GET',
            url: `https://data-imdb1.p.rapidapi.com/movie/id/tt${movie.imdbID}/awards/`,
            params: {page_size: '7'},
            headers: {
                'x-rapidapi-key': '61b78c64c1mshbb5346b6f4b9534p1b9a61jsnf5a0bd889996',
                'x-rapidapi-host': 'data-imdb1.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            const result = response.data.results.map((award) => award.award_name + "-" + award.type)
            setAwards(result)
        }).catch(function (error) {
            //console.error(error);
        });
    }, [awards])


    return (
        <Card className={classes.card}>
            <Flippy style={{height:"500px"}}
                flipOnHover={true} // default false
                flipOnClick={true} // default false
                flipDirection="horizontal" // horizontal or vertical
            >
                <FrontSide>

                {movie.Poster == null ? <img className={classes.media} src={picture}/>
                    : <CardMedia className={classes.media}
                                image={'https://image.tmdb.org/t/p/original' + movie.Poster}
                                title={movie.title}/>}
                </FrontSide>
                <BackSide style={{backgroundColor:'rgba(255,153,0,0.78)',}}>
                    <Typography variant={"h5"} gutterBottom><b>Title:</b> {movie.title}</Typography>
                    <b>Plot:</b><Typography variant={"body2"} gutterBottom
                                            color="textSecondary"> {movie.Plot}</Typography>
                    <Typography variant={"body2"} gutterBottom><b>Popularity:</b> {movie.imdbRating}</Typography>
                    <Typography variant={"body2"} gutterBottom><b>Release date:</b> {movie.year}</Typography>

                    <Typography variant={"body2"} gutterBottom><b>Awards and nominations:</b></Typography>
                    {awards.length === 0 ? (<Typography>This movie hasn't won awards yet</Typography>) : (
                        <ul className={classes.list}>{awards.map((award) => (<li>{award}</li>))}</ul>)}
                </BackSide>
            </Flippy>
        </Card>
    )
}
export default WatchedMovie;