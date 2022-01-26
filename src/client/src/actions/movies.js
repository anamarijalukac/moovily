import * as api from '../api/index.js';

//action creators
export const getMovies = () => async (dispatch) => {
    try {
        const {data} = await api.fetchMovies();
        dispatch({type: 'FETCH_ALL', payload: data});
    } catch (e) {
        console.log(e);
    }
}

export const getMovieById = (imdbID) => async (dispatch) =>{
    try {
        const {data} = await api.getMovieFromDatabase(imdbID)
        dispatch({type: 'FETCH_MOVIE', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const getMoviesBySearch = (searchQuery) => async (dispatch) => {
    try {
        const {data} = await api.fetchMoviesBySearch(searchQuery.search);
        dispatch({ type: 'FETCH_BY_SEARCH', payload: data });
    } catch (error) {
        console.log(error)
    }
}

export const createPost = (movie) => async (dispatch) => {
    try {
        const {data} = await api.createPost();
        dispatch({type: 'CREATE', payload: data})
    } catch (e) {
        console.log(e);
    }

}


export const deletePost = (id) => async (dispatch) => {
    try {

        await api.deletePost(id)
        dispatch({type: 'DELETE', payload: id})
    } catch (e) {
        console.log(e);
    }
}

export const likeMovie = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    console.log(user?.response.id)
    try {
        const {data} = await api.likeMovie(id, user?.response.id);

        dispatch({type: 'LIKE', payload: data})
    } catch (e) {
        console.log(e);
    }
}
