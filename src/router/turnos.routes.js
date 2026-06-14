import express from 'express';
// 🆕 Agregamos "listarTurnosController" adentro de las llaves del import
import { atenderTurnoController, listarTurnosController } from '../controllers/turnos.controller.js';
import { validarTurnoAtendido } from '../validators/turnos.validator.js';
import TransformarDTO from '../middleware/transformarDTO.js';

const router = express.Router();
const transformador = new TransformarDTO();

// 1. Ruta para atender el turno (la que ya hicieron tus compañeros)
router.patch('/:id/atendido', 
    validarTurnoAtendido,         
    transformador.turnoAtendidoDTO, 
    atenderTurnoController        
);

// 🆕 2. Descomentamos y activamos la ruta para listar los turnos
router.get('/', listarTurnosController);

export default router;