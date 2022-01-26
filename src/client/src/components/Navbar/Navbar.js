import {
    AppBar,
    Avatar,
    Button,
    CardMedia,
    CssBaseline,
    Drawer,
    IconButton,
    MenuItem,
    Toolbar,
    Typography
} from "@material-ui/core";
import React, {Fragment, useEffect, useState} from 'react';
import useStyles from './styles.js';
import MenuIcon from '@material-ui/icons/Menu';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {getMovies} from "../../actions/movies.js";

import logo from "../../images/logo.jpg"


const Navbar = () => {
    const classes = useStyles()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [anchorEl, setAnchorEl] = useState(null);
    const location = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const onOpen = e => {
        setAnchorEl(e.currentTarget);
    };

    const onClose = () => {
        setAnchorEl(null);
    };

    const onSelectHome = () => {
        setAnchorEl(null);
        dispatch(getMovies())
    };

    const onSelect = () => {
        setAnchorEl(null);
        dispatch(getMovies())
    };


    const logout = () => {
        localStorage.clear()
        setUser(null)
        navigate('/')
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])


    return (
        <>

            <CssBaseline/>
            <AppBar className={classes.appBar}>
                <div className={classes.fragment}>
                    <Fragment>
                        <IconButton onClick={onOpen}
                                    classes={classes.iconButton}>
                            <MenuIcon style={{fill: "white"}}/>
                        </IconButton>
                    </Fragment>
                    <Fragment>
                        <Drawer classes={{paper: classes.paper}}
                                anchor={"left"}
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={onClose}>
                            <Link to={"/"}
                                  className={classes.menuItem}>
                                <MenuItem

                                    key={1}
                                    onClick={onSelectHome}>
                                    Home
                                </MenuItem>
                            </Link>
                            {user?.response && (<Link to={"/wishlist/" + user?.response.id}
                                                      className={classes.menuItem}>
                                <MenuItem
                                    key={2}
                                    onClick={onSelect}
                                >
                                    Wishlist
                                </MenuItem>
                            </Link>)}
                            {user?.response && (<Link to={"/watchlist/" + user?.response.id}
                                                      className={classes.menuItem}>
                                <MenuItem
                                    key={3}
                                    onClick={onSelect}
                                >
                                    Previously watched
                                </MenuItem>
                            </Link>)}
                            {user?.response && <Link to={"/foryou/" + user?.response.id}
                                                     className={classes.menuItem}>
                                <MenuItem
                                    key={4}
                                    onClick={onSelect}
                                >
                                    For you
                                </MenuItem>
                            </Link>}
                        </Drawer>
                    </Fragment>
                </div>

                <a href="/" className={classes.logo}>
                    <CardMedia
                        className={classes.logo}
                        component="img"
                        height="60px"
                        image={logo}
                        alt="logo"
                    />
                </a>


                <Toolbar>
                    {user?.response ? (
                        <div className={classes.toolbar}>
                            <a href={"/foryou/"+user?.response.id}>
                                <Avatar className={classes.profile} alt={user?.response.name}
                                        src={user?.response.picture.data.url}/>
                            </a>
                            <Typography variant="h6" color={"secondary"}>{user?.response.name}</Typography>
                            <Button className={classes.signup} variant="contained" color="secondary"
                                    onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    )}

                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar