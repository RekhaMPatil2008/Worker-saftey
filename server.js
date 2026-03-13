const express = require("express");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");

const app = express();

app.use(express.json());
app.use(express.static("public"));

/* SENSOR DATA */

let sensorData = {
  gas: 0,
  temperature: 0,
  humidity: 0,
  lat: 12.9716,
  lon: 77.5946,
  sos: false
};

/* HISTORY FOR GRAPH + REPORT */

let history = [];

/* WORKER EMAILS */

const workers = [
  "worker1@gmail.com",
  "worker2@gmail.com"
];

/* EMAIL TRANSPORT */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "youremail@gmail.com",
    pass: "your_app_password"
  }
});

/* SEND ALERT */

function sendAlert(gas) {

  workers.forEach(email => {

    transporter.sendMail({
      from: "youremail@gmail.com",
      to: email,
      subject: "⚠ Worker Safety Alert",
      text: `Danger! Gas leak detected. Gas level: ${gas}`
    });

  });

}

/* RECEIVE DATA FROM ESP32 */

app.post("/api/data", (req, res) => {

  sensorData = req.body;

  console.log("Data received:", sensorData);

  /* SAVE HISTORY */

  history.push({
    time: new Date().toLocaleTimeString(),
    gas: sensorData.gas,
    temperature: sensorData.temperature,
    humidity: sensorData.humidity
  });

  if (history.length > 50) {
    history.shift();
  }

  /* GAS ALERT */

  if (sensorData.gas > 300) {
    sendAlert(sensorData.gas);
  }

  /* SOS ALERT */

  if (sensorData.sos === true) {
    workers.forEach(email => {

      transporter.sendMail({
        from: "youremail@gmail.com",
        to: email,
        subject: "🚨 Worker SOS Alert",
        text: "A worker pressed the SOS emergency button!"
      });

    });
  }

  res.json({ status: "success" });

});

/* SEND DATA TO DASHBOARD */

app.get("/data", (req, res) => {
  res.json(sensorData);
});

/* PDF REPORT */

app.get("/report", (req, res) => {

  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=safety_report.pdf");

  doc.pipe(res);

  doc.fontSize(20).text("Worker Safety Report", { align: "center" });

  doc.moveDown();

  history.forEach(item => {

    doc.text(
      `Time: ${item.time} | Gas: ${item.gas} | Temp: ${item.temperature} | Humidity: ${item.humidity}`
    );

  });

  doc.end();

});

/* SERVER PORT (Important for cloud) */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});