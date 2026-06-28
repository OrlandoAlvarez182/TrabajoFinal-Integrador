// 1. Apuntamos correctamente a la carpeta db desde la carpeta services
import Medicos from "../db/medicos.js";

export default class MedicosServicio {
    constructor() {

        this.medicos = new Medicos();
    }

    buscarPorID(id) {
        if (!id) throw new Error('ID requerido');
        return this.medicos.obtenerPorId(id);
    }

    asociarMedicoAObrasSociales = async (id_medico, obras_sociales) => {
        return await this.medicos.relacionarConObraSocial(id_medico, obras_sociales);
    }

    modificarEspecialidad = async (id_medico, id_especialidad) => {
        return await this.medicos.actualizarEspecialidad(id_medico, id_especialidad);
    };

    ObtenerTurnos = async (id_medico) => {
        return await this.medicos.buscarturnos(id_medico);

    };
}