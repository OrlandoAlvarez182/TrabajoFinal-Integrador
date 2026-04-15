//console.log('prog3');
import express from "express";

const app = express();

app.get('/', (req, res) => {
    console.log('test get');
    res.status(200).send({estado: 'ok', msg: 'API OK' });
});


process.loadEnvFile();
const PUERTO=process.env.PUERTO;

app.listen(PUERTO||3000, () => {
    console.log('Servidor iniciado OK en puerto 3000');
})