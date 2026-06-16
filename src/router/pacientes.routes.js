import express from "express";
import { obtenerInformeTurnosPorPaciente } from "../controllers/pacientes.controller.js";

const router = express.Router();

router.get("/informe/turnos-paciente", obtenerInformeTurnosPorPaciente);

export default router;
