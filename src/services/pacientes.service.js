import Pacientes from "../db/pacientes.js";

export default class PacientesServicio {
    constructor() {
        this.db = new Pacientes();
    }

    async reporteTurnosPorPaciente() {
        return await this.db.reporteTurnosPorPaciente();
    }
}
