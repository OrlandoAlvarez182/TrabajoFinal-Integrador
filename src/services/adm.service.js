import ObraSocial from '../db/obra-social.js';

export default class AdmService {
    constructor() {
        this.obraSocial = new ObraSocial();
    }

    asociarObraSocialServicio = async (idPaciente, idObraSocial) => {
        return await this.obraSocial.asociar(idPaciente, idObraSocial);
    };
}