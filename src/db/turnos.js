import { pool } from "./conexion.js";

export default class Turnos {
    
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