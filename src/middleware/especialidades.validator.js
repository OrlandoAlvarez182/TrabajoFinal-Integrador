import { body, validationResult } from 'express-validator';

export const validarEspecialidades = [
    body ('nombre')
        .if((value, { req }) => req.method === 'POST' || (req.method === 'PUT' && value !== undefined))
        .notEmpty().withMessage('El nombre es requerido')
        .trim()
        .isLength({ max: 120 }).withMessage('El nombre no puede exceder los 120 caracteres'),

]