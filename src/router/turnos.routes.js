import express from 'express';
import TurnosController from '../controllers/turnos.controller.js';
import {
    validarTurnoAtendido 
} from '../validators/turnos.validator.js';
import TransformarDTO from '../middleware/transformarDTO.js';
import { verificarToken, permitirRoles } from '../middleware/auth.validarSession.js';

const router = express.Router();
const transformador = new TransformarDTO();

const turnosController = new TurnosController();

router.patch('/:id/atendido',
    validarTurnoAtendido,
    transformador.turnoAtendidoDTO,
    turnosController.atenderTurnoController
);

router.get('/', turnosController.listarTurnosController);

router.post('/paciente',
    verificarToken,                
    permitirRoles(2),              
    transformador.turnosCrearDTO,             
    turnosController.registrarPaciente
)


export default router;