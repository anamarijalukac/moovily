import mongoose from 'mongoose';

const facebookUserSchema = mongoose.Schema({
    id: String,
    name: String,
    email: String,
    picture: String,
    date: Date,
    wishlist: Array,
    watched_movies: Array,
    recommendedMovies: Array
});

const FacebookUser = mongoose.model('users', facebookUserSchema);
export default FacebookUser;