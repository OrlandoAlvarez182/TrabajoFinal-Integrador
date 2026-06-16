import express from "express";
import PacientesController from "../controllers/pacientes.controller.js";

const router = express.Router();

const pacientesController = new PacientesController();

router.get("/informe/turnos-paciente", pacientesController.obtenerInformeTurnosPorPaciente);

export default router;