import express from 'express';
// 1. Importamos el controlador usando tu nombre exacto de archivo
import {
    asociarMedicoObrasSociales,
    asociarMedicoEspecialidades
} from '../controllers/medicos.controller.js';
import {
    Router
} from 'express';
import MedicosController from '../controllers/medicos.controller.js';
import {
    verificarToken,
    permitirRoles
} from '../middleware/auth.validarSession.js';

const routerMedicos = Router();

const medicosController = new MedicosController();

routerMedicos.post('/:id_medico/obras-sociales', permitirRoles(3), medicosController.asociarMedicoObrasSociales);

routerMedicos.post("/:id_medico/especialidades", permitirRoles(3), medicosController.asociarMedicoEspecialidades);

routerMedicos.get('/turnos/propios', validarSession, permitirRoles(1), medicosController.listarTurnosPropios);

export default routerMedicos;
