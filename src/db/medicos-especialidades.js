import { pool } from "./conexion.js";

export default class MedicosEspecialidades {
    relacionarConEspecialidades = async (id_medico, especialidades) => {
        const conexion = await pool.getConnection();

        try {
            await conexion.beginTransaction();

            for (const esp of especialidades) {
                const sql = "INSERT INTO medicos_especialidades (id_medico, id_especialidad) VALUES (?, ?)";
                await conexion.execute(sql, [id_medico, esp.id_especialidad]);
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
}
