import admin from "../models/admin.js";
import cliente from "../models/clientes.js";

const adminis = async(req, res, next) => {

    const clienteExist = await cliente.findOne({ email: req.user.email });
    if (clienteExist)
        return res.status(400).send({ message: "User invalid" });

    const adminExist = await admin.findOne({ email: req.user.email });
    return adminExist ?
        next() :
        res.status(400).send({ message: "User not found" });

};

export default adminis;