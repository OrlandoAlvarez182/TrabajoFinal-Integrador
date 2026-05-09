import ObraSocialService from "../services/obra-social.service.js";

export default class ObraSocialController {
    constructor() {
        this.obraSocialService = new ObraSocialService();
    }
    create = async (req, res) => {
        try {

            const id = await this.obraSocialService.addObraSocial(req.body);

            return res.status(201).json({
                exito: true,
                mensaje: "Obra Social creada con éxito",
                datos: {
                    id
                }
            });
        } catch (error) {
            console.error(`Error en create: ${error.message}`);
            return res.status(500).json({
                exito: false,
                mensaje: "Error al crear la obra social",
                error: error.message
            });
        }
    };

    obraSocialPorID = async (req, res) => {
        const {
            id
        } = req.params;
        try {
            const obraSocial = await this.obraSocialService.buscarPorID(id);

            if (!obraSocial) {
                return res.status(404).json({
                    exito: false,
                    mensaje: "Obra Social no encontrada",
                    datos: null
                });
            }

            return res.status(200).json({
                exito: true,
                mensaje: "Obra Social obtenida con éxito",
                datos: obraSocial
            });
        } catch (error) {
            console.error(`Error en obraSocialPorID: ${error.message}`);
            return res.status(500).json({
                exito: false,
                mensaje: "Error interno del servidor",
                datos: null
            });
        }
    };

    obtenerTodas = async (req, res) => {
        try {
            const obraSociales = await this.obraSocialService.listarObrasSociales();
            return res.status(200).json({
                exito: true,
                mensaje: "Obra Sociales encontradas",
                datos: obraSociales
            });

        } catch (error) {
            console.log(error)
            return res.status(404).json({
                exito: false,
                mensaje: "Obra Sociales no encontradas",
                datos: null
            });
        }
    }

    obraSocialActualizar = async (req, res) => {
        try {
            const {
                id
            } = req.params;
            const idNumerico = parseInt(id);
            const datosNuevos = req.body;

            if (isNaN(idNumerico) || idNumerico <= 0) {
                return res.status(400).json({
                    exito: false,
                    mensaje: "El ID proporcionado debe ser un número entero válido y mayor a cero",
                    datos: null
                });
            }

            const osActual = await this.obraSocialService.buscarPorID(id)
            if (!osActual) {
                return res.status(404).json({
                    exito: false,
                    mensaje: "Obra Social no encontrada",
                    datos: null
                });
            }

            const osFinal = {
                nombre: datosNuevos.nombre || osActual.nombre,
                descripcion: datosNuevos.descripcion || osActual.descripcion,
                porcentaje_descuento: datosNuevos.porcentaje_descuento ?? osActual.porcentaje_descuento,
                es_particular: datosNuevos.es_particular ?? osActual.es_particular,
                activo: datosNuevos.activo ?? osActual.activo
            };

            const OS = await this.obraSocialService.editarObraSocial(id, osFinal);

            return res.status(201).json({
                exito: true,
                mensaje: "Obra Social actualizada con éxito",
                datos: osFinal
            });
        } catch (error) {
            console.error(`Error en update: ${error.message}`);
            return res.status(500).json({
                exito: false,
                mensaje: "Error al actualizar la obra social",
                error: error.message
            });
        }

    }
}