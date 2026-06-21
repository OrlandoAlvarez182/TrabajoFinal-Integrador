import express from "express";
import PacientesController from "../controllers/pacientes.controller.js";
import {
    verificarToken,
    permitirRoles
} from "../middleware/auth.validarSession.js";

const router = express.Router();

const pacientesController = new PacientesController();

router.get(
    "/turnosPropiosDePaciente",
    verificarToken,
    permitirRoles(2),
    pacientesController.listarTurnosPropiosDePacienteController
);

router.get(
    "/informe/turnos-paciente",
    verificarToken,
    permitirRoles(3),
    pacientesController.obtenerInformeTurnosPorPaciente
);

export default router;