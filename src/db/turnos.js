import { pool } from "./conexion.js";

export default class Turnos {
    
    // 🆕 Agregamos el método real que hace la consulta a la base de datos
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