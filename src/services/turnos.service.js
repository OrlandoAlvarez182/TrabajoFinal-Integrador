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
        return modificado;
    }
}