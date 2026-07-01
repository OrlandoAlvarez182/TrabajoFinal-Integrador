import {
    Router
} from 'express';
import MedicosController from '../controllers/medicos.controller.js';
import especialidadesController from '../controllers/especialidades.controller.js';
import {
    validarParamEspecialidad
} from '../middleware/especialidadParam.validator.js';
import {
    verificarToken,
    permitirRoles
} from '../middleware/auth.validarSession.js';

const routerMedicos = Router();

const medicosController = new MedicosController();
const especialidadescontrolador = new especialidadesController();



routerMedicos.get(
    '/turnos',
    verificarToken,
    permitirRoles(1),
    medicosController.listarTurnosPropios
);

routerMedicos.get(
    '/especialidad/:nombreEspecialidad',
    verificarToken,
    permitirRoles(2),
    validarParamEspecialidad,
    especialidadescontrolador.buscarMedicosPorEspecialidad
);

routerMedicos.post(
    '/:id_medico/obras-sociales',
    verificarToken,
    permitirRoles(3),
    medicosController.asociarMedicoAObrasSociales
);

export default routerMedicos;