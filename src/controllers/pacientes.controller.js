import PacientesServicio from "../services/pacientes.service.js";
import InformeServicio from "../services/informe.service.js";


export default class PacientesController {
    constructor() {
        this.pacientesServicio = new PacientesServicio();
        this.informeServicio = new InformeServicio();

    }

    obtenerInformeTurnosPorPaciente = async (req, res) => {
        try {
            const datos = await this.pacientesServicio.reporteTurnosPorPaciente();
            const pdf = await this.informeServicio.reporteTurnosPorPaciente(datos);

            res.setHeader("Content-Type", "application/pdf");
            res.send(pdf);
        } catch (error) {
            res.status(500).json({
                exito: false,
                mensaje: error.message
            });
        }
    };

    listarTurnosPropiosDePacienteController = async (req, res) => {
        try {
            const idUsuarioPaciente = req.usuario.id_usuario;

            const turnos = await this.pacientesServicio.listarTurnosPropiosDePaciente(idUsuarioPaciente);

            if (!turnos || turnos.length === 0) {
                return res.status(200).json({
                    exito: true,
                    mensaje: "No registrás turnos programados en el sistema.",
                    datos: []
                });
            }

            return res.status(200).json({
                exito: true,
                mensaje: "Tus turnos fueron recuperados con éxito.",
                datos: turnos
            });

        } catch (error) {
            console.error(`Error en listarTurnosPacienteController: ${error.message}`);
            return res.status(500).json({
                exito: false,
                mensaje: "Error interno del servidor al recuperar los turnos.",
                datos: error.message
            });
        }
    }
}