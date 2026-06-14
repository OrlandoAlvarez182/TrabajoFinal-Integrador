import especialidadesService from "../services/especialidades.service.js";

export default class especialidadesController {
    constructor() {
        this.especialidadesService = new especialidadesService();
    }

    buscarEspecialidades = async (req, res) => {
        try {
            const pools = await this.especialidadesService.buscarEspecialidades();
            res.status(200).json({
                'estado': true,
                'especialidades': pools
            });
        } catch (error) {
            console.log(`Error en GET /especialidades ${error}`);
            res.status(500).json({
                'estado': false,
                'mensaje': "Error interno",
            });
        }
    }

    buscarIdEspecialidades = async (req, res) => {
        try {
            const id_especialidad = req.params.id_especialidad;
            // Corregido: se usa this.especialidadesService
            const especialidad = await this.especialidadesService.buscarIdEspecialidades(id_especialidad);

            // Corregido: length bien escrito
            if (especialidad.length === 0) {
                return res.status(404).json({
                    estado: false,
                    mensaje: 'especialidad no encontrada'
                });
            }

            return res.status(200).json({
                estado: true,
                mensaje: 'especialidad encontrada',
                especialidad: especialidad
            });
        } catch (error) {
            console.log(`Error en GET /especialidades ${error}`);
            res.status(500).json({
                'estado': false,
                'mensaje': "Error interno",
            });
        }
    }

    crear = async (req, res) => {
        try {
            const { nombre } = req.body;
            const especialidad = { nombre: nombre };

            // Corregido: se usa this.especialidadesService
            const nuevaEspecialidad = await this.especialidadesService.crear(especialidad);

            // Corregido: length bien escrito
            if (!nuevaEspecialidad || nuevaEspecialidad.length === 0) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'No se pudo crear la especialidad'
                });
            }

            return res.status(201).json({
                exito: true,
                mensaje: "especialidad creada",
            });
        } catch (error) {
            console.log(`Error en POST /especialidades ${error}`);
            res.status(500).json({
                'estado': false,
                'mensaje': "Error interno",
            });
        }
    }

    modificar = async (req, res) => {
        try {
            const id_especialidad = req.params.id_especialidad;
            const { nombre } = req.body;
            const especialidad = { nombre: nombre };

            // Corregido: se usa this.especialidadesService
            const especialidadModificada = await this.especialidadesService.modificar(id_especialidad, especialidad);

            if (especialidadModificada === null) {
                return res.status(404).json({
                    estado: false,
                    mensaje: "Especialidad no encontrada",
                });
            }

            return res.status(200).json({
                estado: true,
                mensaje: "Especialidad modificada",
            });
        } catch (error) {
            console.log(`Error en PUT /especialidades/:id_especialidad ${error}`);
            res.status(500).json({
                'estado': false,
                'mensaje': "Error interno",
            });
        }
    }
} // 👈 La llave que cierra la clase AL FINAL de todo el archivo.