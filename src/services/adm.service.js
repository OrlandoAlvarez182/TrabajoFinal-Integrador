import { pool } from '../db/conexion.js'; 

export const asociarObraSocialServicio = async (idPaciente, idObraSocial) => {
    
    const sql = 'UPDATE pacientes SET id_obra_social = ? WHERE id_paciente = ?';
    const [resultado] = await pool.query(sql, [idObraSocial, idPaciente]); 

    if (resultado.affectedRows === 0) {
        return null;
    }

    return { idPaciente, idObraSocial };
};