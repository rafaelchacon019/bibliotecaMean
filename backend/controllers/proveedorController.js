import proveedor from "../models/proveedores.js";

const registerProveedor = async(req, res) => {
    if (!req.body.name || !req.body.address) return res.status(404).send("Incomplete data");

    const existingProveedor = await proveedor.findOne({ name: req.body.name });
    if (existingProveedor) return res.status(400).send("Proveedor already exists");

    const proveedorSchema = new proveedor({
        name: req.body.name,
        address: req.body.address
    });

    const result = await proveedorSchema.save();
    if (!result) return res.status(500).send("Failed to register proveedor");

    return res.status(200).send({ result });
};

const listProveedor = async(req, res) => {
    const proveedorSchema = await proveedor.find();
    if (!proveedorSchema || proveedorSchema.length == 0) return res.status(400).send("Empty proveedores list");
    return res.status(200).send({ proveedorSchema });
};

export default { registerProveedor, listProveedor };