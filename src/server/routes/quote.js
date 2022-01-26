import express from "express";

import {getQuotes, getRandomQuote} from "../controllers/quote.js";


const router=express.Router();

router.get('/random',getRandomQuote);
router.get('/all',getQuotes);

export default router;