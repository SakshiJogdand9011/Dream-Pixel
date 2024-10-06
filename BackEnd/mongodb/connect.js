import mongoose from "mongoose";

const connectDB = async (url) => {
    try {
        mongoose.set('strictQuery', true); // Deprecation warning fix
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit the process in case of failure
    }
};

export default connectDB;
