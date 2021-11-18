import admin from "../models/admin.js";
import cliente from "../models/clientes.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerAdmin = async(req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password)
        return res.status(400).send({ message: "Incomplete data" });

    const existingAdmin = await admin.findOne({ email: req.body.email });
    if (existingAdmin)
        return res.status(400).send({ message: "The user is already registered." });

    const existingClient = await cliente.findOne({ email: req.body.email });
    if (existingClient)
        return res.status(400).send({ message: "The user is already registered." });

    const passHash = await bcrypt.hash(req.body.password, 10);

    const adminRegister = new admin({
        name: req.body.name,
        email: req.body.email,
        password: passHash,
        dbstatus: true,
    });

    const result = await adminRegister.save();

    try {
        return res.status(200).json({
            token: jwt.sign({
                    _id: result._id,
                    name: result.name,
                    email: adminLogin.email,
                    iat: moment().unix(),
                },
                process.env.SECRET_KEY_JWT
            ),
        });
    } catch (e) {
        return res.status(400).send({ message: "Register error" });
    }
};

const login = async(req, res) => {
    if (!req.body.email || !req.body.password)
        return res.status(400).send({ message: "Incomplete data" });

    const adminLogin = await admin.findOne({ email: req.body.email });
    if (!adminLogin)
        return res.status(400).send({ message: "Wrong email or password" });

    const hash = await bcrypt.compare(req.body.password, adminLogin.password);
    if (!hash)
        return res.status(400).send({ message: "Wrong email or password" });

    try {
        return res.status(200).json({
            token: jwt.sign({
                    _id: adminLogin._id,
                    name: adminLogin.name,
                    email: adminLogin.email,
                    iat: moment().unix(),
                },
                process.env.SECRET_KEY_JWT
            ),
        });
    } catch (error) {

    }
};

export default { registerAdmin, login };