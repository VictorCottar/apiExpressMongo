import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function dbConnect() { 
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    return mongoose.connection;
};

export default dbConnect;