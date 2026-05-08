import ObraSocialService from "../services/obra-social.service.js";
import ObraSocialValidator from "../validators/obra-social.validator.js";

export default class ObraSocialController {

    constructor() {
        this.obraSocialService = new ObraSocialService();
    }

    
    create = async (req, res) => {
        try {
            
            const validacion = ObraSocialValidator.validarDatosCreacion(req.body);

            if (!validacion.esValido) {
                return res.status(400).json({ 
                    exito: false, 
                    mensaje: "Error de validación",
                    errores: validacion.errores 
                });
            }

            
            const id = await this.obraSocialService.addObraSocial(req.body);
            
            return res.status(201).json({ 
                exito: true, 
                mensaje: "Obra Social creada con éxito",
                datos: { id } 
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
        const { id } = req.params;
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
            console.error(`Error en obraSocialPorID: ${error.message}`);
            return res.status(500).json({
                exito: false,
                mensaje: "Error interno del servidor",
                datos: null
            });
        }
    };

    //update
    obraSocialActualizar = async (req, res) => {
        try {
            const { id } = req.params;
            const idNumerico = parseInt(id);

            if (isNaN(idNumerico) || idNumerico <= 0) {
                return res.status(400).json({
                    exito: false,
                    mensaje: "El ID proporcionado debe ser un número entero válido y mayor a cero",
                    datos: null
                });
            }

            const resultado = this.obraSocialService.buscarPorID(id)
            if (!resultado){
                return res.status(404).json({ 
                exito: false, 
                mensaje: "Obra Social no encontrada",
                datos: null
            }); 
            }

            const OS = await this.obraSocialService.editarObraSocial(id, req.body);

            return res.status(201).json({ 
                exito: true, 
                mensaje: "Obra Social actualizada con éxito",
                datos: OS
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
