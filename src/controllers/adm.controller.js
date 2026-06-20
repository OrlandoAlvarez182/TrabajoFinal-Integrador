import AdmService from '../services/adm.service.js';


export default class AdmController {
    constructor() {
        this.admService = new AdmService();
    }


    asociarPacienteObraSocialController = async (req, res) => {
        const {
            idPaciente
        } = req.params;
        const {
            obra_social_id
        } = req.body;

        console.log(idPaciente);
        console.log(obra_social_id);

        try {
            const resultado = await this.admService.asociarObraSocialServicio(idPaciente, obra_social_id);

            if (!resultado) {
                return res.status(404).json({
                    exito: false,
                    mensaje: "No se encontró el paciente especificado en el sistema."
                });
            }

            return res.status(200).json({
                exito: true,
                mensaje: "Administración: Obra social vinculada al paciente con éxito.",
                datos: {
                    id_paciente: resultado.id_paciente,
                    id_obra_social: resultado.id_obra_social,
                    estado_actualizacion: "COMPLETADO",
                    fecha_asociacion: new Date().toLocaleString('es-AR') // Te tira la fecha y hora del cambio
                }
            });
        } catch (error) {
            return res.status(500).json({
                exito: false,
                mensaje: "Error interno en el módulo de administración.",
                error: error.message
            });
        }
    };

}