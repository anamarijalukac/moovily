import React, {useState} from "react";
import {Box, Button, ButtonGroup, CardMedia, Typography} from "@material-ui/core";
import {Check, Delete} from "@material-ui/icons";
import picture from "./images/download.png";
import useStyles from "./styles";
import {useDispatch} from "react-redux";
import {addWatchedList, removeFromWishlist} from "../../../actions/FacebookUser";
import {useParams} from "react-router-dom";
import mobiscroll from '../../../images/mobiscroll/js/mobiscroll.react.min';
import '../../../images/mobiscroll/css/mobiscroll.react.min.css';

const WishlistMovie = ({movie}) => {
    const classes = useStyles();
    const [clicked, setClicked] = useState(false)
    const [deleteClicked, setDeleteClicked] = useState(false)
    const {id} = useParams()
    const dispatch = useDispatch();
    return (
        <mobiscroll.Card style={{
            height: "350px",
            backgroundColor: 'rgb(38,38,38)',

        }}>

            {movie.Poster == null ? <img className={classes.media} src={picture}/>
                : <CardMedia className={classes.media}
                             image={'https://image.tmdb.org/t/p/original' + movie.Poster}
                             title={movie.title}/>}

            <Box className={classes.box}>
                <Typography className={classes.title} variant="p">{movie.title}</Typography>

            </Box>
            <ButtonGroup>
                <Button style={{
                    backgroundColor: 'rgb(255,153,0)',
                    padding: 10,
                    margin: 0,
                    color: "black",

                }}
                        startIcon={<Check/>} disabled={clicked} onClick={() => {
                    dispatch(addWatchedList(id, movie.tmdbID))
                    setClicked(true)
                }}>
                    Watched
                </Button>
                <Button style={{
                    backgroundColor: 'rgb(219,204,202)',
                    padding: 10,
                    margin: 0,
                    color: "black",
                }}
                        startIcon={<Delete/>} disabled={deleteClicked} onClick={() => {
                    dispatch(removeFromWishlist(id, movie.tmdbID))
                    setDeleteClicked(true)
                    window.location.reload()
                }}>
                    Remove
                </Button>
            </ButtonGroup>
        </mobiscroll.Card>

    )
}
export default WishlistMovie;