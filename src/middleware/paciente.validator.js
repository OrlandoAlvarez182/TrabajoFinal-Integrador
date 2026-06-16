import { body, validationResult } from 'express-validator';

export const validarPaciente = [
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

    body('id_obra_social')
        .custom((value, { req }) => req.dto?.id_obra_social !== null).withMessage('La obra social es obligatoria')
        .custom((value, { req }) => Number.isInteger(req.dto.id_obra_social) && req.dto.id_obra_social > 0).withMessage('El ID de la obra social debe ser un número entero válido'),

    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({
                exito: false,
                mensaje: "Error de validación al registrar el paciente",
                errores: errores.array().map(err => ({ campo: err.path, mensaje: err.msg }))
            });
        }
        next();
    }
];