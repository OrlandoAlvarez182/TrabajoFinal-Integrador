import puppeteer from "puppeteer";
import Handlebars from "handlebars";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class InformeServicio {

    reporteTurnosPorPaciente = async (datos) => {
    const plantillaPath = path.join(__dirname, '../utiles/handlebars/turnosPorPaciente.hbs');
    const plantillaHtml = fs.readFileSync(plantillaPath, 'utf-8');

    const template = Handlebars.compile(plantillaHtml);
    const html = template({ datos, fecha: new Date().toLocaleDateString() });

    const browser = await puppeteer.launch();
    const pagina = await browser.newPage();
    await pagina.setContent(html);
    const pdf = await pagina.pdf({ format: 'A4' });
    await browser.close();

    return pdf
}
}



