import express from 'express';
import AdmController from '../controllers/adm.controller.js';
import {
    validarAsociacionObraSocial
} from '../validators/adm.validator.js';
import {
    validarMedico
} from '../middleware/medico.validator.js';
import {
    permitirRoles,
    verificarToken
} from '../middleware/auth.validarSession.js';
import UsuariosController from '../controllers/usuarios.controller.js';
import TurnosController from '../controllers/turnos.controller.js';
import TransformarDTO from '../middleware/transformarDTO.js';
import {
    validarPaciente
} from '../middleware/paciente.validator.js';
import {
    validarTurno
} from '../middleware/turnos.validator.js';

const routerAdmin = express.Router();

const transformarDTO = new TransformarDTO();

const usuariosControlador = new UsuariosController();

const turnosController = new TurnosController();

const admController = new AdmController();

routerAdmin.post(
    '/registrarPaciente',
    verificarToken,
    permitirRoles(3),
    transformarDTO.pacientesCrearDTO,
    validarPaciente,
    usuariosControlador.registrarPaciente
);

routerAdmin.post(
    '/registrarTurno',
    verificarToken,
    permitirRoles(3),
    transformarDTO.turnosCrearDTO,
    validarTurno,
    turnosController.registrar
)

routerAdmin.patch('/pacientes/:idPaciente/obra-social',
    verificarToken,
    permitirRoles(3),
    validarAsociacionObraSocial,
    admController.asociarPacienteObraSocialController
);

export default routerAdmin;