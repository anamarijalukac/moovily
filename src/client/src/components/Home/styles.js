import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({

    text:{

        color:"whitesmoke",
        fontWeight: 400,
    },

    searchDiv:{


        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: 'center',
        marginTop: 20,
        paddingTop:30,
        paddingBottom:30,
        height: 300,
    },


    boxText: {
        paddingBottom: "30px"
    },
    box: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '10px',
        display: 'flex',
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: 'center',


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
    mainContainer: {

        display: 'flex',
        margin: 0,
        paddingLeft: "16px",
        paddingRight: "16px",
        direction: "row",
        justifyContent: "space-between",
        alignItems: "stretch",


    },
    appBarSearch: {

        borderRadius: 4,
        display: 'flex',
        padding: '16px',

        width: 300,
        position: "relative",




    },
    actionDiv: {
        textAlign: 'center',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '400px',
    },
}));