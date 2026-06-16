export default class TransformarDTO {
    obrasSocialesCrearDTO = async (req, res, next) => {
        const {
            nombre,
            descripcion,
            porcentaje_descuento,
            es_particular
        } = req.body;

        req.dto = {
            nombre: nombre ? nombre.trim().toUpperCase() : null,
            descripcion: descripcion ? descripcion.trim() : null,
            porcentaje_descuento,
            es_particular
        };

        next();
    }

    obrasSocialesActualizarDTO = async (req, res, next) => {
        const {
            nombre,
            descripcion,
            porcentaje_descuento,
            es_particular
        } = req.body;

        req.dto = {
            nombre: nombre ? nombre.trim().toUpperCase() : null,
            descripcion: descripcion ? descripcion.trim() : null,
            porcentaje_descuento,
            es_particular
        };

        next();
    }

    especialidadesCrearDTO = async (req, res, next) => {
        const {
            nombre,
        } = req.body;

        req.dto = {
            nombre: nombre ? nombre.trim().toUpperCase() : null,
        };

        next();
    }

    especialidadesActualizarDTO = async (req, res, next) => {
        const {
            nombre,
        } = req.body;

        req.dto = {
            nombre: nombre ? nombre.trim().toUpperCase() : null,
        };
        next();
    }

    turnoAtendidoDTO = async (req, res, next) => {
        const {
            id
        } = req.params;
        const {
            observaciones
        } = req.body;

        req.dto = {
            id_turno_reserva: id ? parseInt(id, 10) : null,
            observaciones: observaciones ? observaciones.trim() : null // 
        };

        next();
    }

    usuariosCrearDTO = async (req, res, next) => {
        const {
            documento,
            apellido,
            nombres,
            email,
            contrasenia,
            rol
        } = req.body;

        req.dto = {
            documento: documento ? String(documento).trim() : null,
            apellido: apellido ? String(apellido).trim().toUpperCase() : null,
            nombres: nombres ? String(nombres).trim().toUpperCase() : null,
            email: email ? String(email).trim().toLowerCase() : null,
            contrasenia: contrasenia ? String(contrasenia) : null,
            rol: rol !== undefined ? parseInt(rol, 10) : null,
            foto_path: "" // Se crea inicialmente sin foto
        };

        next();
    }

    usuariosActualizarDTO = async (req, res, next) => {
        const {
            documento,
            apellido,
            nombres,
            email,
            contrasenia,
            rol,
            activo
        } = req.body;

        req.dto = {
            documento: documento ? String(documento).trim() : undefined,
            apellido: apellido ? String(apellido).trim().toUpperCase() : undefined,
            nombres: nombres ? String(nombres).trim().toUpperCase() : undefined,
            email: email ? String(email).trim().toLowerCase() : undefined,
            contrasenia: contrasenia ? String(contrasenia) : undefined,
            rol: rol !== undefined ? parseInt(rol, 10) : undefined,
            activo: activo !== undefined ? parseInt(activo, 10) : undefined,
            // Si Multer guardó un archivo, usamos ese nombre único; si no, queda undefined
            foto_path: req.file ? req.file.filename : undefined
        };

        next();
    }
}