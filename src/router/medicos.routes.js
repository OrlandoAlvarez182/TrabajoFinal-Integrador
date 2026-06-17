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

routerMedicos.post('/:id_medico/obras-sociales', verificarToken, permitirRoles(3), medicosController.asociarMedicoObrasSociales);

routerMedicos.post("/:id_medico/especialidades", verificarToken, permitirRoles(3), medicosController.asociarMedicoEspecialidades);

routerMedicos.get('/turnos/propios', verificarToken, permitirRoles(1), medicosController.listarTurnosPropios);

export default routerMedicos;