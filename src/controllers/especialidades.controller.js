import EspecialidadesService from '../services/especialidades.service.js'

export default class especialidadesController {
    constructor() {
        this.especialidadesService = new EspecialidadesService();
    }

    buscarEspecialidades = async (req, res) => {
        try {

            const especialidades = await this.especialidadesService.buscarTodas();

            res.status(200).json({
                'estado': true,
                'especialidades': especialidades
            });

        } catch (error) {
            console.log(`Error en GET /especialidades ${error}`);
            res.status(500).json({
                'estado': false,
                'mensaje': "Error interno",
            });
        }
    }

    buscarMedicosPorEspecialidad = async (req, res) => {
        try {
            const nombreEspecialidad = req.params.nombreEspecialidad;

            const resultado = await this.especialidadesService.buscarLosMedicosPorEspecialidad(nombreEspecialidad);

            if (!resultado || resultado.length === 0) {
                return res.status(200).json({
                    exito: true,
                    mensaje: "No registrás medicos en esta especialidad en el sistema.",
                    datos: []
                });
            }

            return res.status(200).json({
                exito: true,
                mensaje: `Los Medicos de la especialidad ${nombreEspecialidad} fueron recuperados con éxito.`,
                datos: resultado
            });

        } catch (error) {
            console.error(`Error en especialidades por medico: ${error.message}`);
            return res.status(500).json({
                exito: false,
                mensaje: "Error interno del servidor al recuperar las Especialidades.",
                datos: error.message
            });
        }
    }

    buscarIdEspecialidades = async (req, res) => {
        try {
            const id_especialidad = req.params.id_especialidad;
            // Corregido: se usa this.especialidadesService
            const especialidad = await this.especialidadesService.buscarIdEspecialidades(id_especialidad);

            if (especialidad.lenght === 0) {
                return res.status(404).json({
                    estado: true,
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
            const {
                nombre
            } = req.dto;

            const especialidad = await this.especialidadesService.buscarPorNombre(nombre);

            if (especialidad.length > 0) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'Especialidad ya existente'
                });
            }

            // Corregido: se usa this.especialidadesService
            const nuevaEspecialidad = await this.especialidadesService.crear(nombre);


            if (!nuevaEspecialidad || nuevaEspecialidad.lenght === 0) {
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
                mensaje: "Error interno",
            });
        }
    }

    modificar = async (req, res) => {
        try {
            const id_especialidad = req.params.id_especialidad;
            const {
                nombre
            } = req.dto;

            // Corregido: se usa this.especialidadesService
            const especialidadModificada = await this.especialidadesService.modificar(id_especialidad, nombre);



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

    eliminar = async (req, res) => {
        try {
            const id_especialidad = req.params.id_especialidad;

            const existe = await this.especialidadesService.buscarPorId(id_especialidad);
            if (existe.length === 0) {
                return res.status(404).json({
                    estado: false,
                    mensaje: "Especialidad no encontrada",
                });
            }

            const especialidadEliminada = await this.especialidadesService.eliminar(id_especialidad);

            if (especialidadEliminada === null) {
                return res.status(404).json({
                    estado: false,
                    mensaje: "Especialidad no encontrada",
                });
            }

            return res.status(200).json({
                estado: true,
                mensaje: "Especialidad eliminada",
            });

        } catch (error) {
            console.log(`Error en DELETE /especialidades/:id_especialidad ${error}`);
            res.status(500).json({
                estado: false,
                mensaje: "Error interno",
            })
        }
    }

}