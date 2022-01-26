import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import facebookRoutes from './routes/FacebookUser.js';
import quote from "./routes/quote.js";
import movie from "./routes/movie.js";


const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());


app.use('/facebook',facebookRoutes)
app.use('/quote',quote)
app.use('/movie',movie)


app.get('/',(req,res)=>{
    res.send("Hello to app.")
})

//kolega baza
//const CONNECTION_URL = 'mongodb+srv://dk51636:Password123!@moviecluster3.tuzcz.mongodb.net/project-drumre-movie?retryWrites=true&w=majority';
//lukač baza
const CONNECTION_URL='mongodb+srv://demo:12345@drumre.zc3xq.mongodb.net/DRUMRE-MOVIES?retryWrites=true&w=majority';

const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));



/*
    - izbrisani svi ostatci cat modela
    - prepravljeni modeli u samo jedan model filma- models->movie.js
    - napravljeno punjenje baze na url: http://localhost:5000/movie/fill
        -puni se baza sa 20 filmova iz trendinga sa API-ja TMDB
    - dodano get all users na:http://localhost:5000/facebook/all
    -dodano get user na:http://localhost:5000/facebook/61c251d81ed6d0f679f3be78
    -napravljeno dodavanje filma u wishlist: na http://localhost:5000/facebook/61c251d81ed6d0f679f3be78/wishlist?imbd_id=645886
            -gledaju se params: id i query: imdb_id
            -ako vec postoji u bazi filmova uzima model movie iz baze
            -ako ne postoji, onda traži od apija film po imbd_id i radi novi object
    -dodano da prebaci film iz wishlist u watchlist na: http://localhost:5000/facebook/61c27dc9ec187f89500b8789/watchlist?imbd_id=634649

*
* */