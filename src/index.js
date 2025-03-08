import express from 'express';
import router from './router.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

const PORT = 3000;


app.listen(PORT, async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('connection successful');
    } catch (error) {
        console.log('Failed to connect to db');
    }
    return console.log('Server is listening on port ' + PORT);
});