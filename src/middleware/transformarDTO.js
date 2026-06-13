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
}