import axios from "axios";

const urlMovies='http://localhost:5000/movie/db';
const urlDEMOFACEBOOK='http://localhost:5000/facebook';
const urlDEMOPOSTS = 'http://localhost:5000/movie';


export const fetchMovies=()=> axios.get(urlMovies);
export const fetchWishlist=(id)=> axios.get(`${urlDEMOFACEBOOK}/${id}/wishlist`);
export const fetchRecommended=(id)=> axios.get(`${urlDEMOPOSTS}/${id}/similar`);
export const createPost=()=>axios.post(urlDEMOPOSTS);
export const createFacebookUser=(newFacebookUser)=>axios.post(urlDEMOFACEBOOK,newFacebookUser);
export const fetchMoviesBySearch = (searchQuery) => axios.get(`${urlDEMOPOSTS}/search?searchQuery=${searchQuery}`);
export const deletePost=(id)=>axios.delete(`${urlDEMOPOSTS}/${id}`);
export const likeMovie=(id, userId)=>axios.patch(`${urlDEMOPOSTS}/${id}/likeMovie?userId=${userId}`);
export const getUser=(id)=>axios.get(`${urlDEMOFACEBOOK}/${id}`)
export const addToWishList=(id,imdbID)=>axios.patch(`${urlDEMOFACEBOOK}/${id}/wishlist?tmdbID=${imdbID}`)
export const removeFromWishlist=(id,imdbID)=>axios.patch(`${urlDEMOFACEBOOK}/${id}/wishlist/remove?tmdbID=${imdbID}`)
export const addToWatchList=(id,imdbID)=>axios.patch(`${urlDEMOFACEBOOK}/${id}/watchlist?tmdbID=${imdbID}`)

export const getMovieFromDatabase=(imdb)=>axios.patch(`${urlDEMOPOSTS}/${imdb}/dbMovie`);
