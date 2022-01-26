import * as api from '../api/index.js';

export const getRecommended = (id) => async (dispatch) => {
    try {
        const {data} = await api.fetchRecommended(id);
        dispatch({type: 'FETCH_RECOMMENDED', payload: data});
    } catch (e) {
        console.log(e);
    }
}