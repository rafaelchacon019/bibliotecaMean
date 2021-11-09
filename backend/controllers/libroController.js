import libro from "../models/libros.js";

const registerLibro = async(req, res) => {
    if (!req.body.name || !req.body.author || !req.body.yearPublication || !req.body.pages || !req.body.gender || !req.body.price)
        return res.status(400).send("Incomplete data");

    const existingLibro = await libro.findOne({ name: req.body.name });
    if (existingLibro) return res.status(400).send("Libro already exists");

    const libroSchema = new libro({
        name: req.body.name,
        author: req.body.author,
        yearPublication: req.body.yearPublication,
        pages: req.body.pages,
        gender: req.body.gender,
        price: req.body.price,
    });

    const result = await libroSchema.save();
    if (!result) return response.status(500).send("Failed to register libro");

    return res.status(200).send({ result });
};

const listLibro = async(req, res) => {
    const libroSchema = await libro.find();
    if (!libroSchema || libroSchema.length === 0) return res.status(400).send("Empty libro list");
    return res.status(200).send({ libroSchema });
};

export default { registerLibro, listLibro };