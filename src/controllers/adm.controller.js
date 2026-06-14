import { asociarObraSocialServicio } from '../services/adm.service.js';

export const asociarPacienteObraSocialController = async (req, res) => {
    const { idPaciente } = req.params;
    const { obra_social_id } = req.body;

    try {
        const resultado = await asociarObraSocialServicio(idPaciente, obra_social_id);
        
        if (!resultado) {
            return res.status(404).json({
                exito: false,
                mensaje: "No se encontró el paciente especificado en el sistema."
            });
        }

        return res.status(200).json({
            exito: true,
            mensaje: "Administración: Obra social vinculada al paciente con éxito.",
            datos: resultado
        });
    } catch (error) {
        return res.status(500).json({
            exito: false,
            mensaje: "Error interno en el módulo de administración.",
            error: error.message
        });
    }
};