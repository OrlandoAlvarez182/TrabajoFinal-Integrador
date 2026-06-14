import TurnosServicio from "../services/turnos.service.js";

const turnosService = new TurnosServicio();

export const atenderTurnoController = async (req, res) => {
    try {
        
        const { id_turno_reserva } = req.dto;
        
        await turnosService.atenderTurno(id_turno_reserva);
        
        return res.status(200).json({
            exito: true,
            mensaje: `Misión cumplida: El turno N° ${id_turno_reserva} fue marcado como atendido.`,
            datos: null
        });
    } catch (error) {
        return res.status(400).json({
            exito: false,
            mensaje: "No se pudo actualizar el estado del turno.",
            datos: error.message
        });
    }
};