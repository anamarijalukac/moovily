import React from "react";
import {Button} from "@material-ui/core";
import useStyles from "./styles";


import {useDispatch} from "react-redux";
import {createPost} from "../../actions/movies";


const Form = () => {


    const classes = useStyles();
    const dispatch = useDispatch();


    const handlesubmit = async (e) => {
        e.preventDefault();
        dispatch(createPost());
    };


    return (
        <Button className={classes.buttonSubmit} variant={"contained"} color={"primary"} size={"large"}
                type={"submit"} fullWidth onClick={handlesubmit}>GET QUOTE</Button>
    )
}
export default Form;