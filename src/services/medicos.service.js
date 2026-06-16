// 1. Apuntamos correctamente a la carpeta db desde la carpeta services
import Medicos from "../db/medicos.js";
import MedicosEspecialidades from "../db/medicos-especialidades.js";

export default class MedicosServicio {
    constructor() {

        this.medicos = new Medicos();
        this.medicosEspecialidades = new MedicosEspecialidades();
    }

    buscarPorID(id) {
        if (!id) throw new Error('ID requerido');
        return this.medicos.obtenerPorId(id);
    }

    asociarMedicoObrasSociales = async (id_medico, obras_sociales) => {
        return await this.medicos.relacionarConObraSocial(id_medico, obras_sociales);
    }

    asociarMedicoEspecialidades = async (id_medico, especialidades) => {
        return await this.medicosEspecialidades.relacionarConEspecialidades(id_medico, especialidades);
    }

    ObtenerTurnos = async (id_medico) => {
        return turnos = await this.medicos.buscarturnos(id_medico);

    };
}