import UsuariosService from "../services/usuarios.service";

export default class UsuariosController {
    constructor() {
        this.usuariosService = new UsuariosService();
    }
    create = async (req, res) => {
        try {

            const id = await this.usuariosService.addUsuarios(req.dto);

            return res.status(201).json({
                exito: true,
                mensaje: "Usuario creado con éxito",
                datos: {
                    id
                }
            });
        } catch (error) {
            console.error(`Error en create: ${error.message}`);
            return res.status(500).json({
                exito: false,
                mensaje: "Error al crear el Usuario",
                error: error.message
            });
        }
    };

    usuarioPorID = async (req, res) => {
        const {
            id
        } = req.params;
        try {
            const usuario = await this.usuariosService.buscarPorID(id);

            if (!usuario) {
                return res.status(404).json({
                    exito: false,
                    mensaje: "Usuario no encontrado",
                    datos: null
                });
            }

            return res.status(200).json({
                exito: true,
                mensaje: "Usuario obtenido con éxito",
                datos: usuario
            });

        } catch (error) {
            console.error(`Error en usuarioPorID: ${error.message}`);
            return res.status(500).json({
                exito: false,
                mensaje: "Error interno del servidor",
                datos: null
            });
        }
    };

    obtenerTodos = async (req, res) => {
        try {
            const usuarios = await this.usuariosService.listarUsuarios();
            return res.status(200).json({
                exito: true,
                mensaje: "Usuarios encontrados",
                datos: usuarios
            });

        } catch (error) {
            console.log(error)
            return res.status(404).json({
                exito: false,
                mensaje: "Usuarios no encontrados",
                datos: null
            });
        }
    }

    usuarioActualizar = async (req, res) => {
        try {
            const {
                id
            } = req.params;
            const idNumerico = parseInt(id);
            const datosNuevos = req.dto;

            if (isNaN(idNumerico) || idNumerico <= 0) {
                return res.status(400).json({
                    exito: false,
                    mensaje: "El ID proporcionado debe ser un número entero válido y mayor a cero",
                    datos: null
                });
            }

            const UsActual = await this.usuariosService.buscarPorID(id)
            if (!UsActual) {
                return res.status(404).json({
                    exito: false,
                    mensaje: "Usuario no encontrado",
                    datos: null
                });
            }

            const usFinal = {
                documento: datosNuevos.documento || UsActual.documento,
                apellido: datosNuevos.apellido || UsActual.apellido,
                nombres: datosNuevos.nombres || UsActual.nombres,
                email: datosNuevos.email || UsActual.email,
                contrasenia: datosNuevos.contrasenia || UsActual.contrasenia,
                foto_path: datosNuevos.foto_path || UsActual.foto_path,
                rol: datosNuevos.rol ?? UsActual.rol,
                activo: datosNuevos.activo ?? UsActual.activo
            };

            const us = await this.usuariosService.editarUsuario(id, usFinal);

            return res.status(200).json({
                exito: true,
                mensaje: "Usuario actualizado con éxito",
                datos: us
            });
        } catch (error) {
            console.error(`Error en update: ${error.message}`);
            return res.status(500).json({
                exito: false,
                mensaje: "Error al actualizar el Usuaiorio",
                error: error.message
            });
        }

    }

    borrarUsuario = async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id) || id <= 0) {
                return res.status(400).json({
                    exito: false,
                    mensaje: "El parámetro debe ser un entero válido"
                })
        }

            const usuario = await this.usuariosService.buscarPorID(id)
            if (!usuario) {
                return res.status(404).json({
                    exito: false,
                    mensaje: "Usuario no encontrado"
                })
            }

            const result = await this.usuariosService.eliminarUsuario(id)
            console.log("📊 Resultado del service:", result)

                if (result.affectedRows > 0) {
                    return res.status(200).json({
                        exito: true,
                        mensaje: "Usuario eliminado"
                    })
                }

                return res.status(404).json({
                    exito: false,
                    mensaje: "Usuario no encontrado"
                })

        } catch (error) {
            console.error(error)
            return res.status(500).json({
                exito: false,
                mensaje: "Error interno."
            })
        }
    }
}