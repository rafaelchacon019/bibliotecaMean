import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db/db.js";
import libro from "./routes/libroRoute.js";
import cliente from "./routes/clienteRoute.js";
import proveedor from "./routes/proveedorRoute.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/libro", libro);
app.use("/api/Cliente", cliente);
app.use("/api/proveedor", proveedor);

app.listen(process.env.PORT, () => console.log("Backend server running on port: " + process.env.PORT));

db.dbconnection();