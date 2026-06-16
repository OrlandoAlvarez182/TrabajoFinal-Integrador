import express from 'express';
import TurnosController from '../controllers/turnos.controller.js';
import {
    validarTurnoAtendido
} from '../validators/turnos.validator.js';
import TransformarDTO from '../middleware/transformarDTO.js';

const router = express.Router();
const transformador = new TransformarDTO();

const turnosController = new TurnosController();

router.patch('/:id/atendido',
    validarTurnoAtendido,
    transformador.turnoAtendidoDTO,
    turnosController.atenderTurnoController
);

router.get('/', turnosController.listarTurnosController);

export default router;