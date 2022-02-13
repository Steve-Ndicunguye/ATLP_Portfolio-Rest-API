import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://ndicunguyesteve4:diderotsteve@cluster0.9vkqx.mongodb.net/steve_db?retryWrites=true&w=majority", { useNewUrlParser: true })
    } catch (error) {
        console.error(error)
    }
}
export default connectDB; 
