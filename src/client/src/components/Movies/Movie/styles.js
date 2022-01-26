import {makeStyles} from '@material-ui/core/styles';

export default makeStyles({

    date: {

        color: "whitesmoke",
    },
    title: {
        height: "50px",
        marginTop: "30px",
        marginBottom: "10px",
        fontFamily: 'Roboto',
        textDecoration: 'none',
        color:"whitesmoke"

    },
    text: {

        color: "whitesmoke",
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    media: {
        height: 0,
        marginBottom: 10,
        borderRadius: 10,
        paddingTop: '100%',
        backgroundColor: 'rgba(0,0,0,0)',
        backgroundBlendMode: 'darken',
    },


    fragment: {
        display: 'flex',
        justifyContent: 'flex-end'
    },

    card: {
        height: "100%",
        backgroundColor: 'rgb(24,24,24)',



    },


    overlayQuote: {

        position: 'absolute',
        textAlign: 'center',
        top: '40%',
        left: '10%',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '20px'
    },

    grid: {
        display: 'flex',
    },

    cardActions: {
        position: 'absolute',
        bottom: '10px',
        padding: '0 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
    },
});