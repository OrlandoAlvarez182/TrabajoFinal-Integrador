import { Router } from 'express';
import { validarEspecialidades } from '../middleware/especialidades.validator.js';
import especialidadesController from "../controllers/especialidades.controller.js";
import { verificarToken, permitirRoles } from '../middleware/auth.validarSession.js';

// Unificamos el nombre en CamelCase para que coincida con el export de abajo
const especialidadesRouter = Router();

const especialidadescontrolador = new especialidadesController();

// 1. Corregido: cambiamos buscarTodas por buscarEspecialidades
// Además le sacamos el /:id porque para listar todas no hace falta pasar un ID por URL
especialidadesRouter.get('/', especialidadescontrolador.buscarEspecialidades);

// 2. Corregido: cambiamos buscarPorId por buscarIdEspecialidades
especialidadesRouter.get('/:id_especialidad', especialidadescontrolador.buscarIdEspecialidades);

// 3. Crear especialidad
especialidadesRouter.post('/',
    verificarToken,
    permitirRoles(3),
    validarEspecialidades,
    especialidadescontrolador.crear
);

// 4. Modificar especialidad
especialidadesRouter.put('/:id_especialidad',
    verificarToken,
    permitirRoles(3),
    validarEspecialidades,
    especialidadescontrolador.modificar
);

// 5. Eliminar especialidad
//especialidadesRouter.delete('/:id_especialidad',
   // verificarToken,
   // permitirRoles(3),
   // especialidadescontrolador.eliminar
//);

export default especialidadesRouter;