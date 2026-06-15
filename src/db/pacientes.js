import { pool } from "./conexion.js";

export default class Pacientes {

    reporteTurnosPorPaciente = async () => {
        const sql = `CALL reporte_turnos_por_paciente_mes_anterior()`;
        const [datos] = await pool.execute(sql);
        return datos[0]
    }
}
