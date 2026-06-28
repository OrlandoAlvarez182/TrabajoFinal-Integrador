import express from "express";
import PacientesController from "../controllers/pacientes.controller.js";
import {
    verificarToken,
    permitirRoles
} from "../middleware/auth.validarSession.js";

const router = express.Router();

const pacientesController = new PacientesController();

router.get(
    "/turnos",
    verificarToken,
    permitirRoles(2),
    pacientesController.listarTurnosPropiosDePacienteController
);

router.get(
    "/informe-pacientes",
    verificarToken,
    permitirRoles(3),
    pacientesController.obtenerInformeTurnosPorPaciente
);

export default router;