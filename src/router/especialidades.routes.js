import {
    Router
} from 'express';
import {
    validarEspecialidades
} from '../middleware/especialidades.validator.js';
import especialidadesController from "../controllers/especialidades.controller.js";
import {
    verificarToken,
    permitirRoles
} from '../middleware/auth.validarSession.js';
import TransformarDTO from '../middleware/transformarDTO.js';

const especialidadesRouter = Router();

const especialidadescontrolador = new especialidadesController();

const transformarDTO = new TransformarDTO();

especialidadesRouter.get('/', especialidadescontrolador.buscarEspecialidades);

especialidadesRouter.get('/:id_especialidad', especialidadescontrolador.buscarIdEspecialidades)

especialidadesRouter.post('/',
    validarEspecialidades,
    verificarToken,
    permitirRoles(3),
    transformarDTO.especialidadesCrearDTO,
    especialidadescontrolador.crear);

especialidadesRouter.put('/:id_especialidad',
    validarEspecialidades,
    verificarToken,
    permitirRoles(3),
    transformarDTO.especialidadesActualizarDTO,
    especialidadescontrolador.modificar);

especialidadesRouter.delete('/:id_especialidad',
    verificarToken,
    permitirRoles(3),
    especialidadescontrolador.eliminar);

export default especialidadesRouter;