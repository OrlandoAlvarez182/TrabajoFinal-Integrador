import express from 'express';
// 1. Importamos el controlador usando tu nombre exacto de archivo
import { asociarMedicoObrasSociales, asociarMedicoEspecialidades  } from '../controllers/medicos.controller.js';

const router = express.Router();

// 2. Definimos la ruta POST tal cual como la armaron en la clase
// El ":id_medico" es el parámetro dinámico que captura el controlador
router.post('/:id_medico/obras-sociales', asociarMedicoObrasSociales);

router.post("/:id_medico/especialidades", asociarMedicoEspecialidades);

// 3. Exportamos el router por defecto para poder importarlo en tu app.js o index.js
export default router;