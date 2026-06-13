// 1. Apuntamos correctamente a la carpeta db desde la carpeta services
import Medicos from "../db/medicos.js"; 

export default class MedicosServicio {
    constructor() {
        // 2. Instanciamos la clase del modelo
        this.medicos = new Medicos();
    }

    // 3. Este es el método intermedio que va a usar tu controlador
    asociarMedicoObrasSociales = async (id_medico, obras_sociales) => {
        return await this.medicos.relacionarConObraSocial(id_medico, obras_sociales);
    }
}