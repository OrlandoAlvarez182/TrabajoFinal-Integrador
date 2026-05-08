import { body, validationResult } from 'express-validator';

export const validarObraSocial = [
    body('nombre')
        .if((value, { req }) => req.method === 'POST' || (req.method === 'PUT' && value !== undefined))
        .notEmpty().withMessage('El nombre es requerido')
        .trim()
        .isLength({ max: 120 }).withMessage('El nombre no puede exceder los 120 caracteres'),

    body('descripcion')
        .if((value, { req }) => req.method === 'POST' || (req.method === 'PUT' && value !== undefined))
        .notEmpty().withMessage('La descripción es requerida')
        .isLength({ max: 255 }).withMessage('La descripción no puede exceder los 255 caracteres'),

    body('porcentaje_descuento')
        .if((value, { req }) => req.method === 'POST' || (req.method === 'PUT' && value !== undefined))
        .isDecimal().withMessage('El porcentaje debe ser un valor decimal (ej: 20.50)')
        .custom(value => value >= 0 && value <= 100).withMessage('El descuento debe estar entre 0 y 100'),

    body('es_particular')
        .optional()
        .isInt({ min: 0, max: 1 }).withMessage('El campo es_particular debe ser 0 o 1'),

    body('activo')
        .optional()
        .isInt({ min: 0, max: 1 }).withMessage('El campo activo debe ser 0 o 1'),

    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({
                exito: false,
                mensaje: "Error en los datos enviados",
                datos: errores.array().map(err => ({
                    campo: err.path,
                    mensaje: err.msg
                }))
            });
        }
        next();
    }
];