import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://jacky:jacky@cluster0.ulqiu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('MongoDB connection error:', error);
        process.exit(1);
    }
};