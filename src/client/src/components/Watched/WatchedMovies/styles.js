import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({

    title:{

    },
    box: {

        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height:"20%",
        backgroundColor: 'rgba(229,0,0,0.7)',
        color: 'white',
        padding: '10px',
        display: 'flex',
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: 'center',



    },

    media: {
        height: "100%",
        paddingTop: '85%',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        backgroundBlendMode: 'darken',
        backgroundSize: "cover"
    },
    list: {
        overflow:'auto',
    },
    menuPaper: { 
        maxHeight: 48 * 4.5,
        width: 200
    },

    fragment: {
        display: 'flex',
        justifyContent: 'flex-end'
    },

    iconButton: {
        marginBottom: 45 
    },

    card: {
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '100%',
        position: 'relative',
        backgroundColor:"black"

    },

    grid: {
        display: 'flex',
    },

    cardActions: {
        position: 'absolute',
        bottom:'10px',
        padding: '0 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
    },
});