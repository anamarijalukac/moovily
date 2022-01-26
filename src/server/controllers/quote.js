import express from 'express';
const router = express.Router();

import axios from 'axios';

export const getRandomQuote = async(req,res)=> {

    let movieId
    var options = {
        method: 'GET',
        url: 'https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle/Scarface/',
        headers: {
            'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
            'x-rapidapi-key': 'f8e44dd551msh274496d1698c88bp1fa5c3jsn7cebd501948b'
        }
    };
    await axios.request(options).then(function (response) {
       movieId=response.data.results[0].imdb_id
    }).catch(function (error) {
        console.log(error)
    });


    var options2 = {
        method: 'GET',
        url: `https://data-imdb1.p.rapidapi.com/movie/id/${movieId}/` ,
        headers: {
            'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
            'x-rapidapi-key': 'f8e44dd551msh274496d1698c88bp1fa5c3jsn7cebd501948b'
        }
    };

    await axios.request(options2).then(function (response) {
        res.send(response.data.results.image_url)
    }).catch(function (error) {
        console.error(error);
    });


}

export const getQuotes = async(req,res) => {
    var options = {
        method: 'GET',
        url: 'https://movie-and-tv-shows-quotes.p.rapidapi.com/quotes',
        headers: {
            'x-rapidapi-host': 'movie-and-tv-shows-quotes.p.rapidapi.com',
            'x-rapidapi-key': 'f8e44dd551msh274496d1698c88bp1fa5c3jsn7cebd501948b'
        }
    };
    axios.request(options).then(function (response) {

        res.send(response.data)
    }).catch(function (error) {
        console.log(error)
    });

}



export default router;