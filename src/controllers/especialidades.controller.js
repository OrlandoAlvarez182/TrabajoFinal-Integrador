import EspecialidadesService from '../services/especialidades.service.js'

export default class especialidadesController {
    constructor() {
        this.especialidadesService = new EspecialidadesService();
    }

    buscarEspecialidades = async (req, res) => {
        try {
<<<<<<< HEAD
            const pools = await this.especialidadesService.buscarEspecialidades();
            res.status(200).json({
                'estado': true,
                'especialidades': pools
            });
=======

            const especialidades = await this.especialidadesService.buscarTodas();

            res.status(200).json({
                'estado': true,
                'especialidades': especialidades
            });

>>>>>>> 174632510fdae290e91003275af0697469d6bfdd
        } catch (error) {
            console.log(`Error en GET /especialidades ${error}`);
            res.status(500).json({
                'estado': false,
                'mensaje': "Error interno",
            });
        }
    }
<<<<<<< HEAD
=======

>>>>>>> 174632510fdae290e91003275af0697469d6bfdd

    buscarIdEspecialidades = async (req, res) => {
        try {
            const id_especialidad = req.params.id_especialidad;
            // Corregido: se usa this.especialidadesService
            const especialidad = await this.especialidadesService.buscarIdEspecialidades(id_especialidad);

<<<<<<< HEAD
            // Corregido: length bien escrito
            if (especialidad.length === 0) {
                return res.status(404).json({
                    estado: false,
=======
            if (especialidad.lenght === 0) {
                return res.status(404).json({
                    estado: true,
>>>>>>> 174632510fdae290e91003275af0697469d6bfdd
                    mensaje: 'especialidad no encontrada'
                });
            }

            return res.status(200).json({
                estado: true,
                mensaje: 'especialidad encontrada',
                especialidad: especialidad
            });
<<<<<<< HEAD
=======

>>>>>>> 174632510fdae290e91003275af0697469d6bfdd
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
<<<<<<< HEAD
            const { nombre } = req.body;
            const especialidad = { nombre: nombre };
=======
            const {
                nombre
            } = req.body;
>>>>>>> 174632510fdae290e91003275af0697469d6bfdd

            // Corregido: se usa this.especialidadesService
            const nuevaEspecialidad = await this.especialidadesService.crear(especialidad);

<<<<<<< HEAD
            // Corregido: length bien escrito
            if (!nuevaEspecialidad || nuevaEspecialidad.length === 0) {
=======
            const nuevaEspecialidad = await this.especialidades.crear(especialidad);

            if (!nuevaEspecialidad || nuevaEspecialidad.lenght === 0) {
>>>>>>> 174632510fdae290e91003275af0697469d6bfdd
                return res.status(400).json({
                    estado: false,
                    mensaje: 'No se pudo crear la especialidad'
                });
            }

            return res.status(201).json({
                exito: true,
                mensaje: "especialidad creada",
            });
<<<<<<< HEAD
=======


>>>>>>> 174632510fdae290e91003275af0697469d6bfdd
        } catch (error) {
            console.log(`Error en POST /especialidades ${error}`);
            res.status(500).json({
                'estado': false,
<<<<<<< HEAD
                'mensaje': "Error interno",
=======
                mensaje: "Error interno",
>>>>>>> 174632510fdae290e91003275af0697469d6bfdd
            });
        }
    }

    modificar = async (req, res) => {
        try {
            const id_especialidad = req.params.id_especialidad;
<<<<<<< HEAD
            const { nombre } = req.body;
            const especialidad = { nombre: nombre };
=======
            const {
                nombre
            } = req.body;
>>>>>>> 174632510fdae290e91003275af0697469d6bfdd

            // Corregido: se usa this.especialidadesService
            const especialidadModificada = await this.especialidadesService.modificar(id_especialidad, especialidad);

<<<<<<< HEAD
=======
            const especialidadModificada = await this.especialidades.modificar(id_especialidad, especialidad);

>>>>>>> 174632510fdae290e91003275af0697469d6bfdd
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
<<<<<<< HEAD
=======

>>>>>>> 174632510fdae290e91003275af0697469d6bfdd
        } catch (error) {
            console.log(`Error en PUT /especialidades/:id_especialidad ${error}`);
            res.status(500).json({
                'estado': false,
                'mensaje': "Error interno",
            });
        }
    }
<<<<<<< HEAD
} // 👈 La llave que cierra la clase AL FINAL de todo el archivo.
=======

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
>>>>>>> 174632510fdae290e91003275af0697469d6bfdd
