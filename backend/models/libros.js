import mongoose from "mongoose";

const libroSchema = new mongoose.Schema({
    name: String,
    author: String,
    yearPublication: String,
    pages: String,
    gender: String,
    price: Number,
    registerDate: { type: Date, default: Date.now },
});

const libro = mongoose.model("libros", libroSchema);

export default libro;