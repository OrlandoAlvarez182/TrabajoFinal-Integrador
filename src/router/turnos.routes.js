import express from 'express';
import { atenderTurnoController } from '../controllers/turnos.controller.js';
import { validarTurnoAtendido } from '../validators/turnos.validator.js';
import TransformarDTO from '../middleware/transformarDTO.js';

const router = express.Router();
const transformador = new TransformarDTO();

router.patch('/:id/atendido', 
    validarTurnoAtendido,         
    transformador.turnoAtendidoDTO, 
    atenderTurnoController        
);

export default router;