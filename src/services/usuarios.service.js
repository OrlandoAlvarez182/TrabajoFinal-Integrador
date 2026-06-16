import Usuario from "../db/usuario.js";

export default class UsuariosService {
    constructor() {
        this.usuario = new Usuario();
    }

    async buscarPorID(id) {
        if (!id) throw new Error('ID requerido');
        const resultado = await this.usuario.obtenerPorId(id);
        return resultado;
    }

    async addUsuariosMedico(datosUsuario, datosMedico) {
        const resultado = await this.usuario.insertarMedico(datosUsuario, datosMedico);
        return resultado;
    }

    async addUsuariosPaciente(datosUsuario, datosPaciente) {
        const resultado = await this.usuario.insertarPaciente(datosUsuario, datosPaciente);
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