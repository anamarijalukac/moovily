import express from 'express';
import axios from 'axios';
import MovieModel from '../models/movie.js';
import mongoose from "mongoose";
import request from 'request';

const API_KEY="88a3b7ce6c97ef1f3ebe1943558670cf";
const router = express.Router();

export const getMovieFromDatabase = async (req, res) => {
    const {id} = req.params;

    const movie = await MovieModel.find({tmdbID: id})

    res.status(200).json(movie)
}

export async function getMovieFromAPI(imbd){
    let data;
    var options = {
        method: 'GET',
        url:`https://api.themoviedb.org/3/movie/${imbd}?api_key=${API_KEY}`

    };

    await axios.request(options).then(function (response) {
       data=response.data

    }).catch(function (error) {
        console.error(error);
    });

    return data
}

export const getPopularMovies=async (req, res) => {

    var options = {
        method: 'GET',
        url:`https://api.themoviedb.org/3/movie/634640?api_key=${API_KEY}`
    };

    axios.request(options).then(function (response) {
        console.log(response.data)
        res.status(200).json(response.data);
    }).catch(function (error) {
        console.error(error);
    });

}

function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return -1;    
        } else if (a[prop] < b[prop]) {    
            return 1;    
        }    
        return 0;    
    }    
}    

export const getMoviesBySearch = async(req,res) => {
    const searchQuery = req.query.searchQuery
    console.log(searchQuery)
    try {
        const movies = MovieModel.find( {title: new RegExp(searchQuery,"i")}, function(error, documents){
            if(error) throw error;
            let ret = documents.sort(GetSortOrder("imdbRating")).slice(0,30)
            res.status(200).json(ret);
        })
    } catch (error) {
        console.log(error)
    }

}


export const getMovies = async (req, res) => {
    try {
        //const movies = await MovieModel.find().sort({imdbRating: -1}).limit(50);
        const movies = await MovieModel.aggregate([{$sample: {size:50}}]);
        res.status(200).json(movies);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const likeMovie = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No movie with id: ${id}`);


    const movie = await MovieModel.findById(id);

    const index = movie.likes.includes(String(req.query.userId));

    if (!index) {
        movie.likes.push(req.query.userId);
      } else {
        movie.likes = movie.likes.filter((id) => id !== String(req.query.userId));
      }

    const updatedMovie = await MovieModel.findByIdAndUpdate(id, movie, {new: true})

    res.json(updatedMovie);
}

export const findSimilarMovies = async (req, res) =>  {
    const { id } = req.params;

    const movie = await MovieModel.findOne({tmdbID: id});

    if(movie == null) {
        console.log("Movie not found in database!");
    }

    request(`http://127.0.0.1:8000/recommender/tt${movie.imdbID}`, async function (error, response, body) {
        console.log('body:', body); // Print the data received
        let movies = JSON.parse(body).movies;
        let moviesResult = [];
        for (let i = 0; i < movies.length; i++) {
            let movieName = movies[i];
            const movie = await MovieModel.find({title: movieName});
            moviesResult.push(movie);
        }
        res.send(moviesResult); //Display the response on the website
    });
}

export default router;