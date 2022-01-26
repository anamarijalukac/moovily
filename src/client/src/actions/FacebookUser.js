import * as api from '../api/index.js';

export const createFacebookUser = (user) => async (dispatch) => {
    try {
        const {data} = await api.createFacebookUser(user)
        dispatch({type: 'CREATE_USER', payload: data})
    } catch (e) {
        console.log(e);
    }

}

export const getUser = (id) => async (dispatch) => {
    try {
        const {data} = await api.getUser(id)
        dispatch({type: 'GET_USER', payload: data})
    } catch (e) {
        console.log(e);
    }

}

export const addWishList = (id, imdbID) => async (dispatch) => {
    try {
        const {data} = await api.addToWishList(id,imdbID);

        dispatch({type: 'ADD_TO_WISHLIST', payload: data})
    } catch (e) {
        console.log(e);
    }
}

export const removeFromWishlist = (id, imdbID) => async (dispatch) => {
    try {
        const {data} = await api.removeFromWishlist(id,imdbID);

        dispatch({type: 'REMOVE_FROM_WISHLIST', payload: data})
    } catch (e) {
        console.log(e);
    }
}

export const addWatchedList = (id, imdbID) => async (dispatch) => {
    try {
        const {data} = await api.addToWatchList(id,imdbID);

        dispatch({type: 'ADD_TO_WATCHLIST', payload: data})
    } catch (e) {
        console.log(e);
    }
}