import Turnos from "../db/turnos.js";

export default class TurnosServicio {
    constructor() {
        this.turnosModel = new Turnos();
    }

    crearTurno = async (turno) => {
        const creado = await this.turnosModel.crearTurno(turno);
        return creado;
    }

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