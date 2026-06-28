import express from 'express';
import TurnosController from '../controllers/turnos.controller.js';
import PacientesController from '../controllers/pacientes.controller.js';
import {
    validarTurnoAtendido
} from '../validators/turnos.validator.js';
import TransformarDTO from '../middleware/transformarDTO.js';
import {
    verificarToken,
    permitirRoles
} from '../middleware/auth.validarSession.js';

const router = express.Router();
const transformador = new TransformarDTO();

const turnosController = new TurnosController();

const pacientesController = new PacientesController();

router.get('/informe-pacientes',
    verificarToken,
    permitirRoles(3),
    pacientesController.obtenerInformeTurnosPorPaciente
);

router.patch('/:id/atendido',
    verificarToken,
    permitirRoles(1),
    transformador.turnoAtendidoDTO,
    validarTurnoAtendido,
    turnosController.atenderTurnoController
);

router.get('/',
    verificarToken,
    permitirRoles(3),
    turnosController.listarTurnosController
);

router.post('/paciente',
    verificarToken,
    permitirRoles(2),
    transformador.turnosCrearDTO,
    turnosController.solicitarTurno
)


export default router;