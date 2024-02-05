const PDFDocument = require('pdfkit');
const fs = require('fs');

const generatePdf = async (emergency) => {
  const date = new Date().toISOString()

  const text = `Emergency

  Date (timestamp): ${date}
  ID: ${emergency.id}
  Latitude: ${emergency.lat}
  Longitude: ${emergency.lon}
  Location: ${emergency.location}
  Message: ${emergency.message}
  Level: ${emergency.level}`;

  const doc = new PDFDocument();
  doc.image('/tmp/map.png', 50, 50, {width: 300})
  doc.text(text, 50, 280)
  doc.pipe(fs.createWriteStream(`/tmp/emergency_${emergency.id}.pdf`));
  doc.end();
}

exports.generatePdf = generatePdf;