import {makeStyles} from '@material-ui/core/styles';

export default makeStyles({

    card: {
        backgroundColor: '#222831',
        height: '20rem',
        borderRadius: '5px',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: 'rgba(0,0,0,0.88)',
        color: "whitesmoke"
    },
    card__image: {
        borderRadius: '50%',
        height: 160,
        width: 160,
        border: '5px solid #272133',
        marginTop: '20px',
        boxShadow: '0 10px 50px rgba(255,153,0,0.88)'


    },
    card__name: {
        marginTop: 20,
        fontSize: '2em',
    },
    grid_container: {
        margin:0,
        padding:0,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: '20px',
        fontSize:'1.2em',



    },



    text: {
        padding: 0,
        paddingLeft: 200,
        width: '100%',

        color: 'rgb(219,204,202)',
        fontFamily: 'Roboto',
        fontWeight: 300,
        fontSize: "20px",
        textAlign: "left",
        alignItems: 'center',
    },
    profile: {
        marginRight: 10,
    },
    boxBelow: {
        marginTop: 20,
        padding: 20,
        width: '100%',
        backgroundColor: 'rgba(255,153,0)',
        color: 'white',
        display: 'flex',
        textAlign: "center",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: 'center',

    },


    heading: {
        marginTop: 20,
        padding: 30,
        paddingLeft: 200,
        width: '100%',
        backgroundColor: 'rgb(0,0,0)',
        color: 'rgb(255,153,0)',
        fontFamily: 'Roboto',
        fontWeight: 600,
        fontSize: "40px",
        textAlign: "left",
        alignItems: 'center',


    },
    heading2: {
        marginTop: 20,
        padding: 30,

        width: '100%',
        backgroundColor: 'rgb(0,0,0)',
        color: 'rgb(255,153,0)',
        fontFamily: 'Roboto',
        fontWeight: 600,
        fontSize: "20px",
        textAlign: "left",
        alignItems: 'center',


    },
    mainContainer: {

        display: 'flex',
        margin: 0,
        paddingLeft: "16px",
        paddingRight: "16px",
        direction: "row",
        justifyContent: "space-between",
        alignItems: "stretch",


    },
});