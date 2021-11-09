import mongoose from "mongoose";

const dbconnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connection whit MongoDB: successfull");
    } catch (err) {
        console.log("Error connection to MongoDB: \n" + err);
    }
};

export default { dbconnection };