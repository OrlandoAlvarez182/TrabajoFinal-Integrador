// 1. IMPORTANTE: Importamos usando el nombre exacto de tu archivo de servicio
import MedicosServicio from "../services/medicos.service.js";

// Instanciamos el servicio para poder usar sus métodos
const medicosServicio = new MedicosServicio();

export const asociarMedicoObrasSociales = async (req, res) => {
    // id_medico viene de la URL (ej: /api/v1/medicos/1/obras-sociales)
    const { id_medico } = req.params; 
    
    // obras_sociales viene en el cuerpo de la petición (el JSON del body)
    const { obras_sociales } = req.body; 

    try {
        // Llamamos al método del servicio que preparaste en el paso anterior
        const resultado = await medicosServicio.asociarMedicoObrasSociales(id_medico, obras_sociales);
        
        // Si todo salió bien y se ejecutó la transacción en la base de datos
        if (resultado) {
            return res.status(201).json({
                exito: true,
                mensaje: "Obras sociales asociadas al médico correctamente.",
                datos: null
            });
        }
    } catch (error) {
        // Si MySQL rechaza algo o falla la conexión, entra acá
        return res.status(500).json({
            exito: false,
            mensaje: "Error interno del servidor al asociar las obras sociales.",
            datos: error.message
        });
    }
};

export const asociarMedicoEspecialidades = async (req, res) => {
    const { id_medico } = req.params;
    const { especialidades } = req.body;

    try {
        await medicosServicio.asociarMedicoEspecialidades(id_medico, especialidades);
        res.status(201).json({ exito: true, mensaje: "Especialidades asociadas correctamente.", datos: null });
    } catch (error) {
        res.status(500).json({ exito: false, mensaje: "Error al asociar especialidades.", datos: error.message });
    }
};