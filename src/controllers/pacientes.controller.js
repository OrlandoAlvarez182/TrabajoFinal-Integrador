import PacientesServicio from "../services/pacientes.service.js";
import InformeServicio from "../services/informe.service.js";

const pacientesServicio = new PacientesServicio();
const informeServicio = new InformeServicio();

export const obtenerInformeTurnosPorPaciente = async (req, res) => {
    try {
        const datos = await pacientesServicio.reporteTurnosPorPaciente();
        const pdf = await informeServicio.reporteTurnosPorPaciente(datos);

        res.setHeader("Content-Type", "application/pdf");
        res.send(pdf);
    } catch (error) {
        res.status(500).json({
            exito: false,
            mensaje: error.message
        });
    }
};