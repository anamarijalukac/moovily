const reducer = (movies = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;

        case 'FETCH_BY_SEARCH':
            return action.payload;

        case 'FETCH_MOVIE':
            return action.payload;
            

        case 'CREATE':

            return [...movies, action.payload];

        case 'LIKE':

            return movies.map((movie) => movie._id === action.payload._id ? action.payload : movie)

        case 'DELETE':
            return movies.filter((movie)=>movie._id!==action.payload);

        default:
            return movies;
    }
}

export default reducer;