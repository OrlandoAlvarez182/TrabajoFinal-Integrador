import {
    pool
} from "./conexion.js";

// 1. Agregamos la declaración de la clase y el export por defecto
export default class Medicos {

    relacionarConObraSocial = async (id_medico, obras_sociales) => {
        const conexion = await pool.getConnection();

        try {
            await conexion.beginTransaction();

            for (const id_obra_social of obras_sociales) {
                const sql = `
                    INSERT INTO medicos_obras_sociales (id_medico, id_obra_social, activo) 
                    VALUES (?, ?, 1)
                    ON DUPLICATE KEY UPDATE activo = 1
                `;
                await conexion.execute(sql, [id_medico, id_obra_social]);
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

    buscarturnos = async (id) => {
        const sql = `
                SELECT 
                    tr.id_turno_reserva,
                    tr.fecha_hora,
                    tr.valor_total,
                    tr.atentido,
                    CONCAT(u_pac.apellido, ', ', u_pac.nombres) AS paciente_nombre,
                    u_pac.documento AS paciente_documento
                FROM turnos_reservas AS tr
                INNER JOIN medicos AS m 
                    ON tr.id_medico = m.id_medico
                INNER JOIN pacientes AS p 
                    ON tr.id_paciente = p.id_paciente
                INNER JOIN usuarios AS u_pac 
                    ON p.id_usuario = u_pac.id_usuario
                WHERE m.id_usuario = ? 
                AND tr.activo = 1 
                ORDER BY tr.fecha_hora ASC;
            `;
        const [resultado] = await pool.query(sql, [id]);
        return resultado;
    }

    actualizarEspecialidad = async (id_medico, id_especialidad) => {
        const sql = `
            UPDATE medicos 
            SET id_especialidad = ? 
            WHERE id_medico = ? AND activo = 1;
        `;

        const [resultado] = await pool.execute(sql, [id_especialidad, id_medico]);
        return resultado.affectedRows > 0;
    };
}