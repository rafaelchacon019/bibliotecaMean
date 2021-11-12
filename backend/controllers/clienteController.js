import cliente from "../models/clientes.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerCliente = async(req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password)
        return res.status(400).send("Incomplete data");

    const existingCliente = await cliente.findOne({ email: req.body.email });
    if (existingCliente) return res.status(400).send("Cliente already exists");

    const hash = await bcrypt.hash(req.body.password, 10);

    const clienteSchema = new cliente({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        dbstatus: true,
    });

    const result = await clienteSchema.save();
    if (!result) return res.status(500).send("Failed to register cliente");

    return res.status(200).send({ clienteSchema });
};

const listCliente = async(req, res) => {
    const clienteSchema = await cliente.find();
    if (!clienteSchema || clienteSchema.length === 0)
        return res.status(400).send("Empty clientes list");
    return res.status(200).send({ clienteSchema });
};

const updateCliente = async(req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password)
        return res.status(400).send("Incomplete data");

    const existingCliente = await cliente.findOne({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    if (existingCliente) return res.status(400).send("Cliente already exists");

    const clienteUpdate = await cliente.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    return !clienteUpdate ?
        res.status(400).send("Error edit cliente") :
        res.status(200).send({ clienteUpdate });
};

const deleteCliente = async(req, res) => {
    const clienteDelete = await cliente.findByIdAndDelete({
        _id: req.params["_id"],
    });

    return !clienteDelete ?
        res.status(400).send({ message: "Cliente not found" }) :
        res.status(200).send({ message: "Cliente deleted" });
};

const login = async(req, res) => {
    if (!req.body.email || !req.body.password)
        return res.status(400).send({ message: "Incomplete data" });

    const clientLogin = await cliente.findOne({ email: req.body.email });
    if (!clientLogin)
        return res.status(400).send({ message: "Wrong email or password" });

    const hash = await bcrypt.compare(req.body.password, clientLogin.password);
    if (!hash)
        return res.status(400).send({ message: "Wrong email or password" });

    try {
        return res.status(200).json({
            token: jwt.sign({
                    _id: clientLogin._id,
                    name: clientLogin.name,
                    iat: moment().unix(),
                },
                process.env.SECRET_KEY_JWT)
        });
    } catch (e) {
        return res.status(400).send({ message: "Login error" });
    }
};

export default { registerCliente, listCliente, updateCliente, deleteCliente, login };