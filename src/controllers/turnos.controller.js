import TurnosServicio from "../services/turnos.service.js";
import MedicosServicio from "../services/medicos.service.js";
import ObrasSocialesService from "../services/obra-social.service.js";
import PacientesService from '../services/pacientes.service.js';

export default class TurnosController {
    constructor() {
        this.turnosService = new TurnosServicio();
        this.medicosService = new MedicosServicio();
        this.obrasSocialesService = new ObrasSocialesService();
        this.pacientesService = new PacientesService()
    }

    registrar = async (req, res) => {
        try {
            const {
                id_medico,
                id_paciente,
                id_obra_social,
                fecha_hora
            } = req.dto;

            if (!id_medico || !id_paciente || !id_obra_social || !fecha_hora) {
                return res.status(400).json({
                    exito: false,
                    mensaje: "Faltan campos obligatorios para registrar el turno (id_medico, id_paciente, id_obra_social, fecha_hora).",
                    datos: null
                });
            }

            const medico = await this.medicosService.buscarPorID(id_medico);
            if (!medico) {
                return res.status(404).json({
                    exito: false,
                    mensaje: "Médico no encontrado",
                    datos: null
                });
            }

            const obraSocial = await this.obrasSocialesService.buscarPorID(id_obra_social);
            if (!obraSocial) {
                return res.status(404).json({
                    exito: false,
                    mensaje: "Obra Social no encontrada",
                    datos: null
                });
            }

            let valorTotal = 0;
            const valorConsulta = parseFloat(medico.valor_consulta);
            const descuento = parseFloat(obraSocial.porcentaje_descuento);

            if (parseInt(obraSocial.es_particular, 10) === 1) {
                valorTotal = valorConsulta;
            } else {
                valorTotal = valorConsulta - (descuento * valorConsulta / 100);
            }

            const nuevoTurno = {
                id_medico,
                id_paciente,
                id_obra_social,
                fecha_hora,
                valor_total: valorTotal.toFixed(2),
                atentido: 0
            };

            const resultado = await this.turnosService.crearTurno(nuevoTurno);

            return res.status(201).json({
                exito: true,
                mensaje: "Turno registrado y reservado con éxito",
                datos: resultado
            });

        } catch (error) {
            console.error(`Error en registrarTurno: ${error.message}`);
            return res.status(500).json({
                exito: false,
                mensaje: "Error interno del servidor al registrar el turno",
                error: error.message
            });
        }
    }

    atenderTurnoController = async (req, res) => {
        try {
            const {
                id_turno_reserva
            } = req.dto;

            const modificado = await this.turnosService.atenderTurno(id_turno_reserva);
            if(!modificado){
                return res.status(400).json({
                    exito: false,
                    mensaje: "No se pudo actualizar el estado del turno.",
                    datos: null
                });
            }

            return res.status(200).json({
                exito: true,
                mensaje: `El turno N° ${id_turno_reserva} fue marcado como atendido.`,
                datos: null
            });
        } catch (error) {
            return res.status(400).json({
                exito: false,
                mensaje: "No se pudo actualizar el estado del turno.",
                datos: error.message
            });
        }
    };

    listarTurnosController = async (req, res) => {
        try {
            // Llamamos al método obtenerTodos del servicio (el que creamos en el paso anterior)
            const turnos = await this.turnosService.obtenerTodos();

            return res.status(200).json({
                exito: true,
                mensaje: "Lista de turnos obtenida con éxito.",
                datos: turnos
            });
        } catch (error) {
            return res.status(500).json({
                exito: false,
                mensaje: "Error interno al intentar listar los turnos.",
                datos: error.message
            });
        }
    }

    solicitarTurno = async (req, res) => {
        try {
            const { id_paciente, id_medico, id_obra_social, fecha_hora } = req.dto;

            if (!id_paciente || !id_medico || !id_obra_social || !fecha_hora) {
                return res.status(400).json({
                    exito: false,
                    mensaje: "Faltan datos obligatorios para registrar el turno.",
                    datos: null
                });
            }

            const medico = await this.medicosService.buscarPorID(id_medico);
            const obraSocial = await this.obrasSocialesService.buscarPorID(id_obra_social);

            const valorConsulta = Number(medico?.valor_consulta) || 0;
            const descuento = Number(obraSocial?.porcentaje_descuento) || 0;

            let valorTotal = valorConsulta;
            if (parseInt(obraSocial.es_particular, 10) !== 1) {
                valorTotal -= (descuento * valorConsulta / 100);
                }

            const nuevoTurno = {
                id_medico,
                id_paciente, 
                id_obra_social,
                fecha_hora,
                valor_total: valorTotal.toFixed(2),
                atentido: 0
            };

            const resultado = await this.turnosService.crearTurno(nuevoTurno);

            return res.status(201).json({
                exito: true,
                mensaje: "Turno registrado y reservado con éxito",
                datos: resultado
            });

        } catch (error) {
            return res.status(500).json({
                exito: false,
                mensaje: "Error interno del servidor al registrar el turno",
                error: error.message
            });
        }
    }

}