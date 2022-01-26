const reducer = (recommended = [], action) => {
    switch (action.type) {
        case 'FETCH_RECOMMENDED':
            console.log(action.payload)
            return action.payload;

        default:
            return recommended;
    }
}
export default reducer;