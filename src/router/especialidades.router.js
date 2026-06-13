import {
    Router
} from 'express';
import { validarEspecialidades } from '../middleware/especialidades.validator.js';
import especialidadesController from "../controllers/especialidades.controller.js";
import {
    verificarToken,
    permitirRoles
} from '../middleware/auth.validarSession.js';

const especialidadesrouter = Router();

const especialidadescontrolador = new especialidadesController();

especialidadesrouter.get('/:id', especialidadescontrolador.buscarTodas);

especialidadesrouter.get('/:id_especialidad',
    
especialidadescontrolador.buscarPorId)

especialidadesrouter.post('/',
    verificarToken,
    permitirRoles(3),
validarEspecialidades,
especialidadescontrolador.crear);

especialidadesrouter.put('/:id_especialidad',
    verificarToken,
    permitirRoles(3),
validarEspecialidades,
especialidadescontrolador.modificar);

especialidadesrouter.delete('/:id_especialidad',
    verificarToken,
    permitirRoles(3),
especialidadescontrolador.eliminar);

export default especialidadesRouter;