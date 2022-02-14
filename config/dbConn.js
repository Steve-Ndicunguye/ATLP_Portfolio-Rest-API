import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true })
    } catch (error) {
        console.error(error)
    }
}
export default connectDB;
