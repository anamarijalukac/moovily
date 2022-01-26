import {combineReducers} from "redux";

import movies from "./movies";
import facebookUser from "./FacebookUser"
import wishlist from "./wishlist"
import recommended from "./recommended"

export const reducers= combineReducers({movies,facebookUser,wishlist, recommended});