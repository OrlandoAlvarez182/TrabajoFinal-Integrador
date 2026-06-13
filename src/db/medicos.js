import { pool } from "./conexion.js";

// 1. Agregamos la declaración de la clase y el export por defecto
export default class Medicos {

    // 2. Metemos el método que armaste dentro de la clase
    relacionarConObraSocial = async (id_medico, obras_sociales) => {
        const conexion = await pool.getConnection();

        try {
            await conexion.beginTransaction();

            for (const os of obras_sociales) {
                // El objeto 'os' debe traer 'id_obra_social' desde el cuerpo del JSON
                const sql = "INSERT INTO medicos_obras_sociales (id_medico, id_obra_social) VALUES (?, ?)";
                await conexion.execute(sql, [id_medico, os.id_obra_social]);
            }

            await conexion.commit();
            return true;
        } catch (error) {
            await conexion.rollback();
            throw error; // Es mejor lanzar el error para que lo ataje el controlador
        } finally {
            conexion.release(); // Siempre liberamos la conexión al pool
        }
    }
} // 3. Acordate de cerrar la llave de la clase al final de todo