import cliente from "../models/clientes.js";

const registerCliente = async(req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password)
        return res.status(400).send("Incomplete data");

    const existingCliente = await cliente.findOne({ email: req.body.email });
    if (existingCliente) returnres.status(400).send("Cliente already exists");

    const clienteSchema = new cliente({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        dbstatus: true,
    });

    const result = await clienteSchema.save();
    if (!result) return res.status(500).send("Failed to register cliente");

    return res.status(200).send({ clienteSchema });
};

const listCliente = async(req, res) => {
    const clienteSchema = await cliente.find();
    if (!clienteSchema || clienteSchema.length === 0) return res.status(400).send("Empty clientes list");
    return res.status(200).send({ clienteSchema });
};

export default { registerCliente, listCliente };