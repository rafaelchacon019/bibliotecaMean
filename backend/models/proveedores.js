import mongoose from "mongoose";

const proveedorSchema = new mongoose.Schema({
    name: String,
    address: String,
    registerDate: { type: Date, default: Date.now },
});

const proveedor = mongoose.model("proveedores", proveedorSchema);

export default proveedor;