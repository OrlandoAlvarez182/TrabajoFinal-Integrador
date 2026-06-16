import { body, validationResult } from 'express-validator';

export const validarMedico = [
    body('documento')
        .custom((value, { req }) => req.dto?.documento !== null).withMessage('El documento es obligatorio')
        .custom((value, { req }) => /^[0-8]{7,8}$/.test(req.dto.documento)).withMessage('El documento debe ser un número válido de 7 u 8 dígitos'),

    body('apellido')
        .custom((value, { req }) => req.dto?.apellido !== null).withMessage('El apellido es obligatorio'),

    body('nombres')
        .custom((value, { req }) => req.dto?.nombres !== null).withMessage('El nombre es obligatorio'),

    body('email')
        .custom((value, { req }) => req.dto?.email !== null).withMessage('El email es obligatorio')
        .custom((value, { req }) => req.dto.email.includes('@')).withMessage('El formato del email no es válido'),

    body('contrasenia')
        .custom((value, { req }) => req.dto?.contrasenia !== null).withMessage('La contraseña es obligatoria')
        .custom((value, { req }) => req.dto.contrasenia.length >= 6).withMessage('La contraseña debe tener al menos 6 caracteres'),

    body('id_especialidad')
        .custom((value, { req }) => req.dto?.id_especialidad !== null).withMessage('La especialidad es obligatoria')
        .custom((value, { req }) => Number.isInteger(req.dto.id_especialidad) && req.dto.id_especialidad > 0).withMessage('El ID de la especialidad debe ser un número entero válido'),

    body('matricula')
        .custom((value, { req }) => req.dto?.matricula !== null).withMessage('La matrícula es obligatoria')
        .custom((value, { req }) => Number.isInteger(req.dto.matricula) && req.dto.matricula > 0).withMessage('La matrícula debe ser un número entero positivo'),

    body('valor_consulta')
        .custom((value, { req }) => req.dto?.valor_consulta !== null).withMessage('El valor de la consulta es obligatorio')
        .custom((value, { req }) => !isNaN(req.dto.valor_consulta) && req.dto.valor_consulta >= 0).withMessage('El valor de la consulta debe ser un número decimal válido'),

    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({
                exito: false,
                mensaje: "Error de validación al registrar el médico",
                errores: errores.array().map(err => ({ campo: err.path, mensaje: err.msg }))
            });
        }
        next();
    }
];