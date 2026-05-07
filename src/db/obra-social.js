import pool from "../db/conexion.js";

export default class ObraSocial {

    obtenerPorId = async (id) => {

        const query = 'SELECT * FROM obras_sociales WHERE id_obra_social = ? AND activo = 1';
        const [os] = await pool.query(query, [id]);

        if (os.length === 0) {
            return null;
        }

        // Retornamos el primer (y único) resultado
        return os[0];
    }

    insertar = async (datos) => {
        
        const query = `
            INSERT INTO obras_sociales 
            (nombre, descripcion, porcentaje_descuento, es_particular, activo) 
            VALUES (?, ?, ?, ?, ?)
        `;
        
        const [result] = await pool.query(query, [
            datos.nombre,
            datos.descripcion || '',
            datos.porcentaje_descuento || 0,
            datos.es_particular || 0,
            1  
        ]);

        // Retornamos el ID autogenerado para confirmar la creación
        return result.insertId;
    }
}
