import express from 'express';
import axios from 'axios';
import MovieModel from "../models/movie.js";

const API_KEY = "88a3b7ce6c97ef1f3ebe1943558670cf";
const router = express.Router();


export const fillDatabase = async (req, res) => {

    var options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`

    };

    let data;
    await axios.request(options).then(function (response) {
        data = response.data;
        res.send(response.data);
    }).catch(function (error) {
        console.error(error);
    });


    for (let i = 0; i < 20; i++) {

        MovieModel.find({
            imdbID: data.results[i].id,
        }, async function (err, docs) {
            if (docs.length) {
                //console.log(`Movie exists already with id: ${data.results[i].id}`);
            } else {

                let newMovieModel = new MovieModel({
                    imdbID: data.results[i].id,
                    title: data.results[i].original_title,
                    year: data.results[i].release_date,
                    imdbRating: data.results[i].popularity,
                    Poster: data.results[i].poster_path,
                    Plot: data.results[i].overview,
                })

                try {
                    await newMovieModel.save();

                } catch (error) {
                    res.status(409).json({message: error.message});
                }
            }
        })
    }

}

export default router;