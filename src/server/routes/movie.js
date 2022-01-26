import express from "express";

import {fillDatabase} from "../controllers/databaseFill.js";
import {
    getMoviesBySearch,
    getPopularMovies,
    getMovies,
    likeMovie,
    getMovieFromDatabase,
    findSimilarMovies
} from "../controllers/movie.js";

const router = express.Router();

router.get('/fill', fillDatabase);
router.get('/search', getMoviesBySearch)
router.get('/popular', getPopularMovies)
router.get('/db', getMovies)
router.get('/:imdb/dbMovie', getMovieFromDatabase)
router.patch('/:id/likeMovie', likeMovie)
router.get('/:id/similar', findSimilarMovies)

export default router;