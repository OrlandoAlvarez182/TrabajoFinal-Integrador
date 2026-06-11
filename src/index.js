import express from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import {
    fileURLToPath
} from 'url';
import obraSocialRouter from "./router/obra-social.routes.js";
import authRouter from "./router/auth.routes.js";

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
let log = fs.createWriteStream('./accesos.log', {
    flags: 'a'
});
app.use(morgan('dev'));
app.use(morgan('combined', {
    stream: log
}));

const opcionesSwagger = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Clínica Médica - UNER 2026',
            version: '1.0.0',
            description: 'Documentación de la API para el Trabajo Final Integrador',
        },
        servers: [{
            url: 'http://localhost:3000/api/v1',
            description: 'Servidor Local'
        }]
    },
    apis: ["./src/swagger/*.yml"]
};

const especificacionesSwagger = swaggerJsdoc(opcionesSwagger);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(especificacionesSwagger));

app.use('/api/v1/obraSociales', obraSocialRouter);

app.use('/api/v1/auth', authRouter);

const PUERTO = process.env.PUERTO;

app.listen(PUERTO || 3000, () => {
    console.log('Servidor iniciado OK en puerto 3000');
})