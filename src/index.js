import 'dotenv/config';
import express from "express";
import obraSocialRouter from "./router/obra-social.routes.js";

const app = express();
app.use(express.json());
app.use('/api/v1/obraSociales', obraSocialRouter);

const PUERTO = process.env.PUERTO;

app.listen(PUERTO || 3000, () => {
    console.log('Servidor iniciado OK en puerto 3000');
})