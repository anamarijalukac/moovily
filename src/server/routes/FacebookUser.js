import express from "express";

import {
    addToWatchedMovies,
    addToWishList,
    createFacebookUser,
    getAllUser,
    getUser,
    deleteUser,
    getWishlist,
    getRecommendations,
    removeFromWishlist
} from "../controllers/FacebookUser.js";

const router=express.Router();

router.post('/',createFacebookUser);
router.get('/:id',getUser)
router.get('/:id/wishlist',getWishlist)
router.get('/users/all',getAllUser)
router.patch('/:id/wishlist',addToWishList)
router.patch('/:id/wishlist/remove',removeFromWishlist)
router.patch('/:id/watchlist',addToWatchedMovies)
router.delete('/:id',deleteUser)
router.get('/:id/recommended', getRecommendations)
export default router;