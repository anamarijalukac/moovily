import FacebookUser from "../models/FacebookUser.js";
import express from 'express';
import mongoose from "mongoose";
import MovieModel from "../models/movie.js";
import request from "request";

const router = express.Router();

export const getAllUser = async (req, res) => {
    try {
        const user = await FacebookUser.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getUser = async (req, res) => {
    const {id} = req.params;

    const user = await FacebookUser.findOne({id: id});
    if (!user) return res.status(404).send(`No user with id: ${id}`);
    res.send(user);
}

export const getWishlist = async (req, res) => {
    const {id} = req.params;
    const user = await FacebookUser.findOne({id: id});
    if (!user) return res.status(404).send(`No user with id: ${id}`);
    res.send(user.wishlist);
}

export const addToWatchedMovies = async (req, res) => {
    const {id} = req.params;
    const tmdb_id = req.query.tmdbID;
    let updatedUser;

    const user = await FacebookUser.findOne({id: id})
    if (!user) return res.status(404).send(`No user with id: ${id}`);

    const movie = await MovieModel.findOne({tmdbID: tmdb_id})

    updatedUser =await FacebookUser.findOneAndUpdate({id: id}, {$pull: {wishlist: {tmdbID: tmdb_id}}})

    updatedUser = await FacebookUser.findOneAndUpdate({id: id}, {$addToSet: {watched_movies: [movie]}}, {new: true})

    res.status(201).json(updatedUser);
}


export const addToWishList = async (req, res) => {
    const {id} = req.params;
    const tmdb_id = req.query.tmdbID;

    const user = await FacebookUser.findOne({id: id})
    if (!user) return res.status(404).send(`No user with id: ${id}`);

    const movie = await MovieModel.findOne({tmdbID: tmdb_id})

    if(!movie) {
        res.status(201).json(user);
    }
    const updatedUser = await FacebookUser.findOneAndUpdate({id: id}, {$addToSet: {wishlist: [movie]}}, {new: true})

    //TREBA LI I TU DODATI setTimout()????? TESTIRATI
    if(updatedUser.wishlist.length >= 5) {
        await recommendForUser(updatedUser);
    }

    res.status(201).json(updatedUser);
}

export const removeFromWishlist = async (req, res) => {
    const {id} = req.params;
    const tmdb_id = req.query.tmdbID;

    const user = await FacebookUser.findOne({id: id})
    if (!user) return res.status(404).send(`No user with id: ${id}`);

    let updatedUser =await FacebookUser.findOneAndUpdate({id: id}, {$pull: {wishlist: {tmdbID: tmdb_id}}})

    res.status(201).json(updatedUser);
}


export const createFacebookUser = async (req, res) => {

    FacebookUser.find({
        id: req.body.id
    }, async function (err, docs) {
        if (docs.length) {
            console.log('Name exists already');
        } else {
            const {id, name, email, picture} = req.body;
            const date = new Date()
            const newFacebookUser = new FacebookUser({id, name, email, picture, date})
            try {
                await newFacebookUser.save();

                res.status(201).json(newFacebookUser);
            } catch (error) {
                res.status(409).json({message: error.message});
            }
        }
    });
}

export const deleteUser = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

    await FacebookUser.findByIdAndRemove(id);

    res.json({message: "User deleted successfully."});
}

async function recommendForUser(user) {

    //PROMIJENITI ISPOD: user.watched_movies!!!!
    //const sortedWishlist = user.wishlist.sort((a, b) => b.imdbRating - a.imdbRating).slice(0, 5)
    let sortedWatchlist = user.wishlist;
    if(sortedWatchlist.length > 10) {
        sortedWatchlist = sortedWatchlist.slice(0, 10);
    }
    let moviesResult = [];

    for (const movie of sortedWatchlist) {
        let imdbId = movie.imdbID;
        await request(`http://127.0.0.1:8000/recommender/tt${imdbId}`, async function (error, response, body) {
            let movies = JSON.parse(body).movies;
            if (body.success != 0) {
                for (let i = 0; i < movies.length; i++) {
                    let movieName = movies[i];
                    let movie = await MovieModel.find({title: movieName});
                    moviesResult.push(movie);
                }
            }
        });
    }

    setTimeout(async () => {
        //console.log(moviesResult)
        let uniqueMovies = moviesResult.filter((m, index) => {
            return moviesResult.indexOf(m) === index;
        });
        uniqueMovies = uniqueMovies.sort((a, b) => 0.5 - Math.random());
        filterMovies(uniqueMovies, user);
        console.log(uniqueMovies)
        if(uniqueMovies.length > 20) {
            uniqueMovies = uniqueMovies.slice(0,20);
        }

        await FacebookUser.findOneAndUpdate({id: user.id}, {
            recommendedMovies: uniqueMovies,
        });
    }, 5000);
}

async function filterMovies(shuffledMovies, user) {
    for (let i = 0; i < shuffledMovies.length; i++) {
        let movie = Array.isArray(shuffledMovies[i]) ? shuffledMovies[i][0] : shuffledMovies[i];
        if(movie == null) {
            shuffledMovies.splice(i, 1);
        }
        for(let wMov of user.wishlist) {
            console.log(movie)
            if(wMov.tmdbID == movie?.tmdbID) {
                shuffledMovies.splice(i, 1);
            }
        }
        for(let wMov of user.watched_movies) {
            if(wMov.tmdbID == movie?.tmdbID) {
                shuffledMovies.splice(i, 1);
            }
        }
    }
}

export const getRecommendations = async (req, res) => {
    const {id} = req.params;
    const user = await FacebookUser.findOne({id: id})


    if (user === null)
        res.status(404).send(`No user with id: ${id}`);
    else {
        let wishlist = user.wishlist;
        if(wishlist.length < 5) {
            //vraća popularne filmove iz baze
            const movies = await MovieModel.find().sort({imdbRating: -1}).limit(20);
            let shuffledMovies = movies.sort((a, b) => a.likes.length >= b.likes.length);
            filterMovies(shuffledMovies, user);
            res.status(200).json(shuffledMovies);
        } else {
            filterMovies(user.recommendedMovies, user);
            //vraća korisniku za njega preporučene filmove (vuku se iz baze podataka)

            res.status(200).json(user.recommendedMovies);
        }
    }
}
export default router;