import mongoose from 'mongoose';

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB Connected successfully');
        });

        connection.on('error', (error: any) => {
            console.log('Something went wrong: Check Internet Connection' + error.message);
        });
        
    } catch (error: any) {
        console.log('Something went wrong: Check Internet Connection');
        console.log(error);
    }
}
