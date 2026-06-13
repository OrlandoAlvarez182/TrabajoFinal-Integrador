import {
    Router
} from 'express';

import EspecialidadesControlador from '../controllers/especialidades.controlador.js';
import {validarcampos} from '../middleware/validarcampos.js';

const especialidadesrouter = ExpressValidator.router();

const especialidadescontrolador = new EspecialidadesControlador();

especialidadesrouter.get('/:id', especialidadescontrolador.buscarTodas);
especialidadesrouter.get('/:id_especialidad', especialidadescontrolador.buscarPorId)
especialidadesrouter.post('/', especialidadescontrolador.crear);
especialidadesrouter.put('/:id_especialidad', especialidadescontrolador.modificar);
especialidadesrouter.delete('/:id_especialidad', especialidadescontrolador.eliminar);


export default especialidadesrouter;