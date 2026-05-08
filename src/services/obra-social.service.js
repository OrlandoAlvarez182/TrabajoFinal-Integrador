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

    async listarObrasSociales() {
        const resultado = await this.obraSocial.listar();
        return resultado;
    }

    async editarObraSocial(id, datos) {
        const resultado = await this.obraSocial.actualizar(id, datos);
        return resultado;
    }
}