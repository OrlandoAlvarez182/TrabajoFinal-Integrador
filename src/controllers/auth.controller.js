import jwt from 'jsonwebtoken';
import AuthService from '../services/auth.service.js';

export class AuthController {

    constructor() {
        this.authService = new AuthService();
    }

    login = async (req, res) => {
        const {
            email,
            contrasenia
        } = req.body;

        try {
            const usuario = await this.authService.verificarCredenciales(email, contrasenia);

            if (!usuario) {
                return res.status(401).json({
                    exito: false,
                    mensaje: "Credenciales incorrectas o usuario inactivo"
                });
            }

            const payload = {
                id_usuario: usuario.id_usuario,
                rol: usuario.rol
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret_uner_2026', {
                expiresIn: '2h'
            });

            return res.status(200).json({
                exito: true,
                mensaje: "Inicio de sesión exitoso",
                token,
                usuario: {
                    apellido: usuario.apellido,
                    nombres: usuario.nombres,
                    rol: usuario.rol
                }
            });

        } catch (error) {
            return res.status(500).json({
                exito: false,
                mensaje: error.message
            });
        }
    }
}