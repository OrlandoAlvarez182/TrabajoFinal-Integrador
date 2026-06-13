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
                mensaje: "Error interno",
            });
        }
    }


    buscarIdEspecialidades = async (req, res) => {
        try {

            const id_especialidad = req.params.id_especialidad;
            const especialidad = await this.especialidades.buscarIdEspecialidades(id_especialidad);

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
                mensaje: "Error interno",
            });
        }
    }

    crear = async (req, res) => {
        try {
            const {
                nombre
            } = req.body;

            const especialidad = {
                nombre: nombre
            }

            const nuevaEspecialidad = await this.especialidades.crear(especialidad);

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
            } = req.body;

            const especialidad = {
                nombre: nombre
            }

            const especialidadModificada = await this.especialidades.modificar(id_especialidad, especialidad);

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
                mensaje: "Error interno",
            })
        }
    }

    eliminar = async (req, res) => {
        try {
            const id_especialidad = req.params.id_especialidad;

            const especialidadEliminada = await this.especialidades.eliminar(id_especialidad);

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