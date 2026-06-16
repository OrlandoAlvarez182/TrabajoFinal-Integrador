import express from 'express';
// 1. Importamos el controlador usando tu nombre exacto de archivo
import { asociarMedicoObrasSociales, asociarMedicoEspecialidades, listarTurnosPropios } from '../controllers/medicos.controller.js';
import { validarSession } from '../middleware/auth.validarSession.js';
import { permitirRoles } from '../middleware/auth.validator.js';

const router = express.Router();

// 2. Definimos la ruta POST tal cual como la armaron en la clase
// El ":id_medico" es el parámetro dinámico que captura el controlador
router.post('/:id_medico/obras-sociales', asociarMedicoObrasSociales);

router.post("/:id_medico/especialidades", asociarMedicoEspecialidades);

router.get('/turnos/propios', validarSession, permitirRoles(1), listarTurnosPropios);

// 3. Exportamos el router por defecto para poder importarlo en tu app.js o index.js
export default router;