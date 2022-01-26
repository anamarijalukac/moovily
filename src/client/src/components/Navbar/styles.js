import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({

    appBar: {

        backgroundColor: 'rgba(0, 0, 0, 1)',
        height: "60px",
        display: "flex",
        alignItems: "center",
        paddingLeft: "16px",
        paddingRight: "16px",
        minHeight: "56px",
        justifyContent: "space-between",
        flexDirection: "row",
        textAlign: "center",
        position: 'sticky',
        zIndex: 1400,

    },
    logo: {

        width: "200px",
        position: "absolute",
        top:0,
        left:"38%"


    },
    toolbar: {


        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "350px",
        alignItems: "center",
        position: "relative",


    },
    signup: {
        marginLeft: "40px",

    },
    image: {
        marginLeft: '15px',
    },
    profile: {
        marginRight: 10,
    },
    [theme.breakpoints.down('xs')]: {
        main: {
            flexDirection: "column-reverse"
        }
    },
    fragment: {
        display: 'flex',
        justifyContent: 'flex-end',


    },
    menuItem: {


        textTransform: "uppercase",
        textDecoration: 'none',
        color: 'whitesmoke',
        width: "300px",
        height: "60px",
        marginTop: "30px"


    },
    paper: {
        background: 'rgba(0, 0, 0, 0.87)',

        marginTop: "60px",
    }
}))
;