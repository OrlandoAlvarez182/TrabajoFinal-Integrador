import {
    pool
} from "./conexion.js";

export default class Turnos {

    crearTurno = async (turno) => {
        const sql = `
            INSERT INTO turnos_reservas 
            (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total, activo, atentido) 
            VALUES (?, ?, ?, ?, ?, 1, 0)
        `;
        const [resultado] = await pool.query(sql, [
            turno.id_medico,
            turno.id_paciente,
            turno.id_obra_social,
            turno.fecha_hora,
            turno.valor_total
        ]);
        return resultado.insertId;
    }

    obtenerTodosLosTurnos = async () => {
        // Consultamos a la tabla real "turnos_reservas"
        const sql = `SELECT * FROM turnos_reservas WHERE activo = 1`;
        const [resultado] = await pool.query(sql);
        return resultado;
    }

    marcarComoAtendido = async (id_turno) => {
        const sql = `
            UPDATE turnos_reservas 
            SET atendido = 1 
            WHERE id_turno_reserva = ? AND activo = 1
        `;

        const [resultado] = await pool.query(sql, [id_turno]);
        return resultado.affectedRows > 0;
    }
}