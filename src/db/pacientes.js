import {
    pool
} from "./conexion.js";

export default class Pacientes {

    reporteTurnosPorPaciente = async () => {
        const sql = `CALL reporte_turnos_por_paciente_mes_anterior()`;
        const [datos] = await pool.execute(sql);
        return datos[0]
    }

    listarTurnosPropiosDePaciente = async (idUsuarioPaciente) => {
        const sql = `
            SELECT
            tr.id_turno_reserva,
                tr.fecha_hora,
                tr.valor_total,
                tr.atentido,
                CONCAT(u_med.apellido, ', ', u_med.nombres) AS medico_nombre,
                e.nombre AS especialidad
            FROM turnos_reservas AS tr
            INNER JOIN pacientes AS p
            ON tr.id_paciente = p.id_paciente
            INNER JOIN medicos AS m
            ON tr.id_medico = m.id_medico
            INNER JOIN usuarios AS u_med
            ON m.id_usuario = u_med.id_usuario
            INNER JOIN especialidades AS e
            ON m.id_especialidad = e.id_especialidad
            WHERE p.id_usuario = ?
                AND tr.activo = 1
            ORDER BY tr.fecha_hora DESC;
        `;
        const [datos] = await pool.execute(sql, [idUsuarioPaciente]);

        return datos;
    }
}