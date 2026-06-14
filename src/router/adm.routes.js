import express from 'express';
import { asociarPacienteObraSocialController } from '../controllers/adm.controller.js';
import { validarAsociacionObraSocial } from '../validators/adm.validator.js';

const router = express.Router();

// Ruta de administración para vincular la obra social a un paciente
router.patch('/pacientes/:idPaciente/obra-social', 
    validarAsociacionObraSocial, 
    asociarPacienteObraSocialController
);

export default router;