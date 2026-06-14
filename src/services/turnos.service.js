import Turnos from "../db/turnos.js";

export default class TurnosServicio {
    constructor() {
        this.turnosModel = new Turnos();
    }

    // 🚀 Corregido: Ahora llama al método real de la DB "obtenerTodosLosTurnos"
    obtenerTodos = async () => {
        const turnos = await this.turnosModel.obtenerTodosLosTurnos(); 
        return turnos;
    }

    atenderTurno = async (id_turno) => {
        const modificado = await this.turnosModel.marcarComoAtendido(id_turno);
        if (!modificado) {
            throw new Error("El turno no existe, ya fue atendido o se encuentra inactivo.");
        }
        return true;
    }
}