import Usuario from "../db/usuario";

export default class UsuariosService {
    constructor() {
        this.usuario = new Usuario();
    }

    async buscarPorID(id) {
        if (!id) throw new Error('ID requerido');
        const resultado = await this.usuario.obtenerPorId(id);
        return resultado;
    }

    async addUsuarios(datos) {
        const resultado = await this.usuario.insertar(datos);
        return resultado;
    }

    async listarUsuarios() {
        const resultado = await this.usuario.listar();
        return resultado;
    }

    async editarUsuario(id, datos) {
        const resultado = await this.usuario.actualizar(id, datos);
        return resultado;
    }

    async eliminarUsuario(id) {
        return await this.usuario.eliminar(id)
    }
}