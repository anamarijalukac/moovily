import mongoose from 'mongoose';

const moviesSchema = mongoose.Schema({

    title: String,
    tmdbID:String,
    imdbID: String,
    year: String,
    imdbRating: Number,
    Poster: String,
    Plot: String,
    likeCount: {
        type: [String],
        default: []
    },
    likes: {
        type: [String],
        default: []
    }
});

const MovieModel = mongoose.model('movies',moviesSchema);
export default MovieModel;