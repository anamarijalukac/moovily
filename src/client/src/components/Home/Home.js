import React, {useEffect, useState} from 'react'
import Movies from '../Movies/Movies'
import {
    AppBar,
    Box,
    Button,
    Card,
    CardMedia,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography
} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import {getMoviesBySearch} from '../../actions/movies';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import useStyles from "./styles";
import img from "../../images/glenn-carstens-peters-EOQhsfFBhRk-unsplash.jpg"


const Home = (setCurrentId) => {
    const classes = useStyles();
    let [search, setSearch] = useState('');
    const wishlist = useSelector((state) => state.wishlist)
    const history = useNavigate();
    const dispatch = useDispatch();
    const searchMovie = () => {
        if (search.trim()) {
            dispatch(getMoviesBySearch({search}));
            history(`/search?searchQuery=${search || 'none'}`);
        } else {
            history('/');
        }
    };
    useEffect(() => {
    }, [wishlist])
    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchMovie();
        }
    };
    return (

        <>
            <CssBaseline/>
            <Container disableGutters>
                <Card>


                    <Box sx={{position: 'relative'}}>
                        <CardMedia
                            component="img"
                            height="550px"
                            image={img}
                            alt="movie"
                        />
                        <Box className={classes.box}>
                            <Typography className={classes.boxText} variant="h3">EASY WAY TO FIND NEW
                                MOVIES</Typography>
                            <Typography className={classes.boxText} variant="h5">You can’t decide between thousands of
                                movies available for
                                streaming?</Typography>
                            <Typography className={classes.boxText} variant="p">Discover more</Typography>
                            <ArrowDownwardIcon fontSize={"large"}/>
                        </Box>
                    </Box>
                </Card>

                <Container item className={classes.searchDiv}>
                    <AppBar className={classes.appBarSearch} color="inherit">
                        <TextField onKeyDown={handleKeyPress} name="search" variant="outlined"
                                   label="Search Movies By Title" fullWidth value={search}
                                   onChange={(e) => setSearch(e.target.value)}/>
                        <Button onClick={searchMovie} className={classes.searchButton} variant="contained"
                                color="primary">Search</Button>
                    </AppBar>
                    <div >
                        <Typography className={classes.text} variant="h3">Want to find a specific movie?</Typography>
                        <Typography className={classes.text} variant="h5">Use our search engine and add your favourite movies to your
                            wishlist.</Typography>
                    </div>
                </Container>

                {!search &&
                <Box className={classes.boxBelow}>
                    <Typography variant="h5">To help, we've plucked out 50 random movies from our database.</Typography>
                </Box>}
                <Grid container className={classes.mainContainer}
                      spacing={3}>
                    <Grid item>
                        <Movies setCurrentId={setCurrentId}/>
                    </Grid>
                </Grid>

            </Container>

        </>
    )
}
export default Home