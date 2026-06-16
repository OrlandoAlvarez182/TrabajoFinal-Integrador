import {
    pool
} from "./conexion.js";

// 1. Agregamos la declaración de la clase y el export por defecto
export default class Medicos {

    relacionarConObraSocial = async (id_medico, obras_sociales) => {
        const conexion = await pool.getConnection();

        try {
            await conexion.beginTransaction();

            for (const os of obras_sociales) {
                const sql = "INSERT INTO medicos_obras_sociales (id_medico, id_obra_social) VALUES (?, ?)";
                await conexion.execute(sql, [id_medico, os.id_obra_social]);
            }

            await conexion.commit();
            return true;
        } catch (error) {
            await conexion.rollback();
            throw error;
        } finally {
            conexion.release();
        }
    }

    obtenerPorId = async (id) => {
        const sql = "SELECT * FROM medicos WHERE id_medico = ?";
        const [rows] = await pool.query(sql, [id]);
        return rows[0];
    }
}