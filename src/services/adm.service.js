import ObraSocial from '../db/obra-social.js';

export default class {
    constructor() {
        this.obraSocial = new ObraSocial();
    }
    
    asociarObraSocialServicio = async (idPaciente, idObraSocial) => {
        return await this.obraSocial.asociar(idPaciente, idObraSocial);
    };
}