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
}