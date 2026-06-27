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

        req.dto = {
            id_turno_reserva: id ? parseInt(id, 10) : null
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

    turnosCrearDTO = async (req, res, next) => {
        const {
            id_medico,
            id_paciente,
            id_obra_social,
            fecha_hora
        } = req.body;

        req.dto = {
            id_medico: id_medico ? parseInt(id_medico, 10) : null,
            id_paciente: req.usuario && req.usuario.rol === 2 ? req.usuario.id_usuario : (id_paciente ? parseInt(id_paciente, 10) : null),
            id_obra_social: id_obra_social ? parseInt(id_obra_social, 10) : null,
            fecha_hora: fecha_hora ? String(fecha_hora).trim() : null
        };

        next();
    }

    pacientesCrearDTO = async (req, res, next) => {
        const {
            documento,
            apellido,
            nombres,
            email,
            contrasenia,
            id_obra_social
        } = req.body;

        req.dto = {
            documento: documento ? String(documento).trim() : null,
            apellido: apellido ? String(apellido).trim().toUpperCase() : null,
            nombres: nombres ? String(nombres).trim().toUpperCase() : null,
            email: email ? String(email).trim().toLowerCase() : null,
            contrasenia: contrasenia ? String(contrasenia) : null,
            foto_path: "",
            rol: 2,

            id_obra_social: id_obra_social !== undefined ? parseInt(id_obra_social, 10) : null
        };

        next();
    }

    medicosCrearDTO = async (req, res, next) => {
        const {
            documento,
            apellido,
            nombres,
            email,
            contrasenia,
            id_especialidad,
            matricula,
            descripcion,
            valor_consulta
        } = req.body;

        req.dto = {
            documento: documento ? String(documento).trim() : null,
            apellido: apellido ? String(apellido).trim().toUpperCase() : null,
            nombres: nombres ? String(nombres).trim().toUpperCase() : null,
            email: email ? String(email).trim().toLowerCase() : null,
            contrasenia: contrasenia ? String(contrasenia) : null,
            foto_path: "",
            rol: 1,

            id_especialidad: id_especialidad !== undefined ? parseInt(id_especialidad, 10) : null,
            matricula: matricula !== undefined ? parseInt(matricula, 10) : null,
            descripcion: descripcion ? String(descripcion).trim() : null,
            valor_consulta: valor_consulta !== undefined ? parseFloat(valor_consulta) : null
        };

        next();
    }
}