const reducer=(user=[],action)=>{
    switch (action.type) {
        case 'GET_USER':
            console.log(action.payload)
            return action.payload;

        case 'CREATE_USER':
            console.log(action.payload);
            return [...user,action.payload];
        
        case 'ADD_TO_WISHLIST':
            return user.map((user) => user._id === action.payload._id ? action.payload : user)

        case 'REMOVE_FROM_WISHLIST':
            return user.map((user) => user._id === action.payload._id ? action.payload : user)

        case 'ADD_TO_WATCHLIST':
            return user.map((user) => user._id === action.payload._id ? action.payload : user)

        default:
            return user;
    }
}

export default reducer;