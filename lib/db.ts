import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('Connected To DB');
    } catch (error) {
        console.error('Error Connecting to DB',error);
        
    }
}

export default connectDB