require('dotenv').config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Rotes
import Auth from "./API/Auth";

// database connection
import ConnectDB from './database/connection.js';

const zomato = express();

zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(cors());
zomato.use(helmet());

zomato.get("/", (req, res) => {
    res.json({message: "Setup Success"});
});

zomato.use("/auth", Auth);

zomato.listen(900, () => ConnectDB()
    .then(() => console.log('Server is up and running.'))
    .catch(() => console.log('Server is running, but database connection failed...'))
);