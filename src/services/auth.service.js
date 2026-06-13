import Usuario from "../db/usuario.js"

export default class AuthService {
    constructor() {
        this.usuarioModel = new Usuario();
    }

    async verificarCredenciales(email, contrasenia) {
        if (!email || !contrasenia) throw new Error('Email y contraseña requeridos');

        const usuario = await this.usuarioModel.buscar(email, contrasenia);
        return usuario;
    }
}