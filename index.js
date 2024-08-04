const { marge } = require('mochawesome-report-generator');
const { merge } = require('mochawesome-merge');
const fs = require('fs');
const path = require('path');

module.exports = (on, config) => {
    on('after:run', async (results) => {
        const mergedResults = await merge();

        // Diretório onde os relatórios serão armazenados
        const reportDir = path.join(config.projectRoot, 'mochawesome-report');

        // Garante que o diretório exista
        if (!fs.existsSync(reportDir)) {
            fs.mkdirSync(reportDir, { recursive: true });
        }

        // Gera o relatório Mochawesome
        const report = marge.create(mergedResults, {
            reportDir,
            overwrite: false,
            html: false,
            json: true,
        });

        console.log('Mochawesome Report is generated at:', report);

        return report;

    });
};