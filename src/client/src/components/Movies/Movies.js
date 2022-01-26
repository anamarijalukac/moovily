import React from "react";
import {CircularProgress, Grid} from "@material-ui/core";
import {useSelector} from "react-redux";
import Movie from "./Movie/Movie";
import useStyles from "./styles";

const Movies = ({setCurrentId}) => {
    const movies = useSelector((state) => state.movies);
    const classes = useStyles();
   
    return (
        !movies.length ? <CircularProgress/> : (
            <Grid className={classes.mainContainer} container alignItems={"stretch"} spacing={3}>
                {movies.map((movie) => (
                    <Grid key={movie._id} item xs={4} >
                        <Movie movie={movie} setCurrentId={setCurrentId}/>
                    </Grid>
                    )
                )}
            </Grid>
        ));
}
export default Movies;