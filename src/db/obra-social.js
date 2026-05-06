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
}