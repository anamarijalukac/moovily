import React, {useState} from "react";
import {Card, Grid, Typography} from "@material-ui/core";
import FacebookLogin from 'react-facebook-login'
import useStyles from "./styles";

import {useDispatch} from "react-redux";
import {createFacebookUser} from "../../actions/FacebookUser";
import Form from "../Form/Form";


const FacebookLoginComp = () => {
    const classes = useStyles();
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState({
        id: '', name: '', email: ''
    });

    let data = {id: '', name: '', email: ''}

    const dispatch = useDispatch();

    function sendToDatabase() {

        dispatch(createFacebookUser(data));
    }


    const responseFacebook = (response) => {
        console.log(response);

        setUser({id: response.id, name: response.name, email: response.email});
        data = {id: response.id, name: response.name, email: response.email};

        if (response.accessToken) {
            setLogin(true);
        } else {
            setLogin(false);
        }


        sendToDatabase(data);

    }

    return (
        <div>


                {!login &&
                <FacebookLogin

                    appId="454993925845301"
                    fields="id,name,email"
                    scope="public_profile,email"
                    callback={responseFacebook}
                    icon="fa-facebook"/>
                }
                {login &&

                <Card className={classes.card}>
                    <Typography className={classes.text}>{user.name}</Typography>
                    <Typography className={classes.text}>{user.email}</Typography>

                </Card>


                }



            {login &&


            <Grid item xs={12} sm={6} md={12}>
                <Form />
            </Grid>


            }


        </div>


    );


}

export default FacebookLoginComp;