import ObraSocial from "../db/obra-social.js";

export default class ObraSocialService {

    constructor() {
        this.obraSocial = new ObraSocial();
    }

    async buscarPorID(id) {
        if (!id) throw new Error('ID requerido');

        const resultado = await this.obraSocial.obtenerPorId(id);
        return resultado;
    }
}