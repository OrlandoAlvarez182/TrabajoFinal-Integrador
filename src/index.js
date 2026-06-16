import 'dotenv/config';
import express from "express";
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import {
    fileURLToPath
} from 'url';
import {
    especificacionesSwagger
} from "./swagger/swagger.config.js";
import obraSocialRouter from "./router/obra-social.routes.js";
import medicosRoutes from './router/medicos.routes.js';
import authRouter from "./router/auth.routes.js";
import especialidadesRouter from './router/especialidades.router.js';
import turnosRoutes from './router/turnos.routes.js';

import admRouter from './router/adm.routes.js';
import usuariosRouter from './router/usuarios.routes.js';
import pacientesRouter from "./router/pacientes.routes.js";

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(especificacionesSwagger));

app.use('/api/v1/obraSociales', obraSocialRouter);
app.use('/api/v1/medicos', medicosRoutes);
app.use('/api/v1/especialidades', especialidadesRouter);
app.use('/api/v1/turnos', turnosRoutes);
app.use('/api/v1/usuarios', usuariosRouter);
app.use('/api/adm', admRouter);
app.use('/api/v1/auth', authRouter);
app.use("/api/v1", pacientesRouter);

const PUERTO = process.env.PUERTO;

app.listen(PUERTO || 3000, () => {
    console.log('Servidor iniciado OK en puerto 3000');
})