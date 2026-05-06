import ObraSocialService from "../services/obra-social.service.js";

export default class ObraSocialController {

    constructor() {
        this.obraSocialService = new ObraSocialService();
    }

    obraSocialPorID = async (req, res) => {
        const {
            id
        } = req.params;

        // Comprobamos si el ID es un número entero
        const idNumerico = parseInt(id);

        if (isNaN(idNumerico) || idNumerico <= 0) {
            return res.status(400).json({
                exito: false,
                mensaje: "El ID proporcionado debe ser un número entero válido y mayor a cero",
                datos: null
            });
        }

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
            console.error(`Error en ObraSocialController: ${error.message}`);

            return res.status(500).json({
                exito: false,
                mensaje: "Error interno del servidor",
                datos: null
            });
        }
    }
}