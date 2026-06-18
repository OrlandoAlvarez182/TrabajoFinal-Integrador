import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).json({
            exito: false,
            mensaje: "No se proporcionó un token de autenticación"
        });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({
            exito: false,
            mensaje: "Formato de token inválido. Debe ser Bearer [Token]"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_uner_2026');
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            exito: false,
            mensaje: "Token inválido o expirado"
        });
    }
};

export const permitirRoles = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                exito: false,
                mensaje: "Se intentó validar el rol sin verificar el token primero"
            });
        }

        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({
                exito: false,
                mensaje: "No tienes permisos suficientes para acceder a este recurso"
            });
        }

        next();
    };
};