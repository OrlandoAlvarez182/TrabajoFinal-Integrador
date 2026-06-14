import TurnosServicio from "../services/turnos.service.js";

const turnosService = new TurnosServicio();

// 1. El método que ya tenían para atender el turno
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

// 🆕 2. AGREGAMOS ACÁ el nuevo controlador para listar los turnos
export const listarTurnosController = async (req, res) => {
    try {
        // Llamamos al método obtenerTodos del servicio (el que creamos en el paso anterior)
        const turnos = await turnosService.obtenerTodos();
        
        return res.status(200).json({
            exito: true,
            mensaje: "Lista de turnos obtenida con éxito.",
            datos: turnos
        });
    } catch (error) {
        return res.status(500).json({
            exito: false,
            mensaje: "Error interno al intentar listar los turnos.",
            datos: error.message
        });
    }
};