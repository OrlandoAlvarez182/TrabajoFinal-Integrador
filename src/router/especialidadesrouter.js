import {
    Router
} from 'express';
import { validarEspecialidades } from '../middleware/especialidades.validator.js';
import EspecialidadesControlador from "../controllers/especialidadescontrolador.js";

const especialidadesrouter = Router();

const especialidadescontrolador = new EspecialidadesControlador();

especialidadesrouter.get('/:id', especialidadescontrolador.buscarTodas);

especialidadesrouter.get('/:id_especialidad',
[
    param('id_especialidad', 'El parámetro debe ser entero').isInt(),
    validarcampos
],
especialidadescontrolador.buscarPorId)

especialidadesrouter.post('/',
validarEspecialidades,
especialidadescontrolador.crear);

especialidadesrouter.put('/:id_especialidad',
validarEspecialidades,
especialidadescontrolador.modificar);

especialidadesrouter.delete('/:id_especialidad',
    [
        param('id_especialidad', 'El parámetro debe ser entero').isInt(),
        validarcampos
    ],
especialidadescontrolador.eliminar);

export default especialidadesRouter;