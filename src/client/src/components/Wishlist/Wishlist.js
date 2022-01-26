import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {CircularProgress, Container, Typography} from "@material-ui/core";
import WishlistMovie from './WishlistMovie/WishlistMovie'
import useStyles from "./styles";


import mobiscroll from '../../images/mobiscroll/js/mobiscroll.react.min';
import '../../images/mobiscroll/css/mobiscroll.react.min.css';

const Wishlist = () => {

    const classes = useStyles();
    const {id} = useParams()
    const [wishlist, setWishlist] = useState([])
    useEffect(() => {
        fetch("/facebook/" + id)
            .then(async (response) => {
                const data = await response.json()
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    alert(error);
                    return Promise.reject(error);
                }
                setWishlist(data.wishlist);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    }, []);


    return (

        !wishlist.length ? <CircularProgress/> : (
            <div>
                <Container style={{padding: 0}}>
                    <Typography
                        variant="h2"
                        className={classes.heading}
                        gutterBottom
                    >
                        My wishlist...
                    </Typography>
                    <Typography
                        variant="h5"
                        className={classes.sub}
                        gutterBottom
                    >
                        Save movies to keep track of what you want to watch.
                    </Typography>
                </Container>

                <mobiscroll.ScrollView layout="fixed" itemWidth={200} snap={false}
                                       style={{backgroundColor: "green"}}>
                    {wishlist.map((movie) => movie == null ? <div/> : (

                            <WishlistMovie movie={movie}/>


                        )
                    )}
                </mobiscroll.ScrollView>


            </div>


        ));


}

export default Wishlist