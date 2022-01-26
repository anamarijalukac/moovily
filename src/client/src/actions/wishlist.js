import * as api from '../api/index.js';

export const getWishlist = (id) => async (dispatch) => {
    try {
        const {data} = await api.fetchWishlist(id);
        dispatch({type: 'FETCH_WISHLIST', payload: data});
    } catch (e) {
        console.log(e);
    }
}