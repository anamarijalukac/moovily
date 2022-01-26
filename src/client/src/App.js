import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import {getMovies} from "./actions/movies";
import {useDispatch} from "react-redux";
import Home from './components/Home/Home';
import Wishlist from './components/Wishlist/Wishlist';
import Watched from './components/Watched/Watched';
import Facebook from './components/Facebook/Facebook';
import MovieDetails from './components/MovieDetails/MovieDetails';
import ForYou from './components/ForYou/ForYou';
import {getWishlist} from './actions/wishlist';
import {createTheme, MuiThemeProvider} from "@material-ui/core";

const theme = createTheme({
    palette: {
        primary: {
            main: 'rgba(255,153,0,0.88)',
        },
        secondary: {
            main: 'rgb(219,204,202)',
        }
        ,
        movie: {
            main: 'rgb(38,38,38)',
        },
        accent:{
            main: 'rgb(40,146,206)',
        },

    },

});

function App() {
    //set currentId
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        dispatch(getMovies());
        dispatch(getWishlist(user?.response.id))
    }, [currentId, dispatch])

    return (
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" exact element={<Home setCurrentId={currentId}/>}/>
                    <Route path="/search" exact element={<Home setCurrentId={currentId}/>}/>
                    <Route path='/wishlist/:id' element={<Wishlist/>}/>
                    <Route path='/watchlist/:id' element={<Watched/>}/>
                    <Route path="/auth" exact element={<Facebook/>}/>
                    <Route path="/movie/:imdbID" element={<MovieDetails/>}/>
                    <Route path="/foryou/:id" element={<ForYou/>}/>
                </Routes>
            </BrowserRouter>
        </MuiThemeProvider>
    );
}


export default App;