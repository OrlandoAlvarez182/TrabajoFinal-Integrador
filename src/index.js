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
import routerMedicos from './router/medicos.routes.js';
import authRouter from "./router/auth.routes.js";
import especialidadesRouter from './router/especialidades.routes.js';
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
app.use('/api/v1/medicos', routerMedicos);
app.use('/api/v1/especialidades', especialidadesRouter);
app.use('/api/v1/turnos', turnosRoutes);
app.use('/api/v1/usuarios', usuariosRouter);
app.use("/api/v1/pacientes", pacientesRouter);
app.use('/api/v1/adm', admRouter);
app.use('/api/v1/auth', authRouter);

const PUERTO = process.env.PUERTO;

app.listen(PUERTO || 3000, () => {
    console.log(`
        Servidor iniciado OK en puerto 3000

        Trabajo Final Integrador Programacion 3 - Grupo B - UNER

        Rutas:

        URL = localhosta:3000/api/v1

        Médico (ROL = 1) 
            ● Iniciar sesión.                                       -> URL/auth/login
            ● Listar turnos propios.                                -> URL/medicos/turnos/propios
            ● Marcar un turno como atendido.                        -> URL/turnos/:id/atendido

        Paciente (ROL = 2) 
            ● Iniciar sesión.                                       -> URL/auth/login
            ● Crear reservas (turnos propios).                      -> URL/turnos/paciente
            ● Listar turnos propios.                                -> URL/pacientes/turnosPropiosDePaciente
            ● Listar especialidades.                                -> URL/especialidades/
            ● Listar todos los médicos y de una especialidad.       -> URL/especialidades/:porEspecialidad

        Administrador (ROL = 3) 
            ● Iniciar sesión.                                       -> URL/auth/login
            >● Listar, crear y editar especialidades.                -> En Rutas Especialidades(POST, PUT, DELETE)
            ● Asociar médicos con especialidades.                   -> URL/medicos/:id_medico/especialidades
            ● Listar, crear y editar obras sociales.                -> En Rutas Obra Sociales(POST, PUT, DELETE)
            ● Asociar médicos con obras sociales.                   -> URL/medicos/:id_medico/obras-sociales
            ● Asociar pacientes con obras sociales.                 -> URL/adm/pacientes/:idPaciente/obra-social
            ● Registrar un turno para un paciente, médico y fecha.  -> URL/adm/registrarTurno
            ● Obtener estadísticas de atenciones.                   -> URL/pacientes/informe/turnos-paciente
        `);
})