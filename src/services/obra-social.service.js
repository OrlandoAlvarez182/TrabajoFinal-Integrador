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

    async addObraSocial(datos) {
        if (!datos.nombre) throw new Error('El nombre es obligatorio');
        const resultado = await this.obraSocial.insertar(datos);
        return resultado;
    }

    async editarObraSocial(datos) {
        const resultado = await this.obraSocial.actualizar(datos);
        return resultado;
    }
}