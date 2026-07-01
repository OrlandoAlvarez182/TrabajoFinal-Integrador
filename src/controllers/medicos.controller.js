import MedicosServicio from "../services/medicos.service.js";

export default class MedicosController {
    constructor() {
        this.medicosServicio = new MedicosServicio();
    }

    asociarMedicoAObrasSociales = async (req, res) => {
        const {
            id_medico
        } = req.params;

        const {
            obras_sociales
        } = req.body;

        if (!obras_sociales || !Array.isArray(obras_sociales) || obras_sociales.length === 0) {
            return res.status(400).json({
                exito: false,
                mensaje: "Se requiere un arreglo 'obras_sociales' válido con los IDs a asociar."
            });
        }

        try {
            const resultado = await this.medicosServicio.asociarMedicoAObrasSociales(id_medico, obras_sociales);

            if (!resultado) {
                return res.status(404).json({
                    exito: false,
                    mensaje: "No se pudieron asociar las obras sociales."
                });
            }

            if (resultado) {
                return res.status(201).json({
                    exito: true,
                    mensaje: "Obras sociales asociadas al médico correctamente.",
                    datos: null
                });
            }
        } catch (error) {
            return res.status(500).json({
                exito: false,
                mensaje: "Error interno del servidor al asociar las obras sociales.",
                datos: error.message
            });
        }
    };


    listarTurnosPropios = async (req, res) => {
        try {
            const id_medico = req.usuario.id_usuario;
            const turnos = await this.medicosServicio.ObtenerTurnos(id_medico);

            if (!turnos || turnos.length === 0) {
                return res.status(404).json({
                    mensaje: "no hay turnos programados"
                });
            }
            return res.status(200).json(turnos);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                mensaje: "error interno del servidor"
            });
        }
    };


};