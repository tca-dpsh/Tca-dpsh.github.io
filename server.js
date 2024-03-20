const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware untuk mengurai data dari body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint untuk menerima laporan
app.post('/laporan', (req, res) => {
    const data = req.body;
    saveReport(data);
    res.status(201).send('Laporan berhasil disimpan.');
});

// Fungsi untuk menyimpan laporan ke file JSON
function saveReport(data) {
    const reports = JSON.parse(fs.readFileSync('reports.json', 'utf8'));
    reports.push(data);
    fs.writeFileSync('reports.json', JSON.stringify(reports, null, 2));
}

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan pada http://localhost:${PORT}`);
});
