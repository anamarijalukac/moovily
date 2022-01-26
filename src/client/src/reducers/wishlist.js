const reducer = (wishlist = [], action) => {
    switch (action.type) {
        case 'FETCH_WISHLIST':
            return action.payload;

        default:
            return wishlist;
    }
}

export default reducer;