import { body, validationResult } from 'express-validator';

export const validarTurno = [
    body('id_medico')
        .custom((value, { req }) => req.dto?.id_medico !== null)
        .withMessage('El ID del médico es obligatorio')
        .custom((value, { req }) => Number.isInteger(req.dto.id_medico) && req.dto.id_medico > 0)
        .withMessage('El ID del médico debe ser un número entero válido'),

    body('id_paciente')
        .custom((value, { req }) => req.dto?.id_paciente !== null)
        .withMessage('El ID del paciente es obligatorio')
        .custom((value, { req }) => Number.isInteger(req.dto.id_paciente) && req.dto.id_paciente > 0)
        .withMessage('El ID del paciente debe ser un número entero válido'),

    body('id_obra_social')
        .custom((value, { req }) => req.dto?.id_obra_social !== null)
        .withMessage('El ID de la obra social es obligatorio')
        .custom((value, { req }) => Number.isInteger(req.dto.id_obra_social) && req.dto.id_obra_social > 0)
        .withMessage('El ID de la obra social debe ser un número entero válido'),

    body('fecha_hora')
        .custom((value, { req }) => req.dto?.fecha_hora !== null)
        .withMessage('La fecha y hora del turno son obligatorias')
        .custom((value, { req }) => !isNaN(Date.parse(req.dto.fecha_hora)))
        .withMessage('El formato de fecha y hora no es válido')
        .custom((value, { req }) => new Date(req.dto.fecha_hora) > new Date())
        .withMessage('No se pueden registrar turnos en el pasado'),

    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({
                exito: false,
                mensaje: "Error de validación en los datos del turno",
                errores: errores.array().map(err => ({ campo: err.path, mensaje: err.msg }))
            });
        }
        next();
    }
];