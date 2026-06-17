import Pacientes from "../db/pacientes.js";

export default class PacientesServicio {
    constructor() {
        this.db = new Pacientes();
    }

    async reporteTurnosPorPaciente() {
        return await this.db.reporteTurnosPorPaciente();
    }

    async listarTurnosPropiosDePaciente(id_paciente) {
        return await this.db.listarTurnosPropiosDePaciente(id_paciente);
    }
}
