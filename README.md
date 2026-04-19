# 🚧 Worker Safety Monitoring System

## 📌 Problem Statement

Workers in industries such as construction, mining, and manufacturing are frequently exposed to hazardous gases and unsafe environmental conditions.

Traditional safety monitoring systems are either manual or lack real-time responsiveness, leading to delayed hazard detection and increased risk of accidents.

---

## 💡 Solution

The **Worker Safety Monitoring System** is an IoT-based solution that continuously monitors environmental conditions and provides real-time alerts when hazardous gas levels are detected.

By integrating sensors, a backend server, and alert mechanisms, the system ensures faster response times and improved worker safety.

---

## 🎯 Objectives

* Real-time detection of hazardous gas levels
* Immediate alert generation for dangerous conditions
* Centralized monitoring through a web interface
* Visualization of hazard locations for quick action
* Reduction of workplace risks and accidents

---

## 🛠️ Tech Stack

* **Hardware:** ESP32, MQ Gas Sensor
* **Backend:** Node.js, Express.js
* **Frontend:** HTML, JavaScript
* **Communication:** HTTP (Wi-Fi)
* **Alerts:** Nodemailer (Gmail SMTP)
* **Data Format:** JSON

---

## 🏗️ System Architecture

The system is divided into three main layers:

### 1. Sensor Layer

* Gas sensor detects environmental conditions
* ESP32 processes sensor data
* Data is transmitted to the server via Wi-Fi

### 2. Backend Layer

* Receives incoming sensor data
* Evaluates hazard conditions using threshold logic
* Triggers alert mechanisms
* Sends structured responses to frontend

### 3. Presentation Layer

* Displays hazard data on a web interface
* Shows real-time updates
* Helps in monitoring and decision-making

---

## 🔄 Workflow

1. Sensor reads gas concentration
2. ESP32 sends data to the backend server
3. Server validates and processes the data
4. If threshold exceeded:

   * ⚠️ Hazard is detected
   * 📧 Email alert is triggered
   * 🗺️ Location is updated on the interface

---

## 📂 Project Structure

```
worker-safety-monitoring/
│
├── index.html        # Frontend interface
├── script.js         # Client-side logic and API handling
├── server.js         # Backend server and hazard detection logic
├── package.json      # Dependency configuration
├── package-lock.json # Dependency lock file
└── README.md         # Documentation
```

---

## ⚙️ Setup & Installation

### 1. Clone Repository

```bash
git clone https://github.com/RekhaMPatil2008/worker-safety-monitoring.git
cd worker-safety-monitoring
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Email Service

* Enable 2-Step Verification in Gmail
* Generate an App Password
* Update credentials in `server.js`:

```js
auth: {
  user: "your-email@gmail.com",
  pass: "your-app-password"
}
```

### 4. Run the Application

```bash
node server.js
```

---

## 📡 API Specification

### Endpoint: `POST /data`

**Request Body:**

```json
{
  "gasLevel": 300,
  "latitude": 12.9716,
  "longitude": 77.5946
}
```

**Response:**

* `200` → Data received successfully
* `-1` → Error in processing

---

## 📊 Key Features

* 📡 Real-time environmental monitoring
* ⚠️ Hazard detection using threshold logic
* 📧 Automated email alert system
* 🗺️ Location-based hazard visualization
* 🔄 Continuous data transmission

---

## 📸 Demonstration

<img width="881" height="961" alt="Screenshot 2026-03-08 192038" src="https://github.com/user-attachments/assets/86097b86-5aa3-4c7c-82ed-305ba59e7f4b" />


```
images/
├── map.png
├── email.png
```

---

## 🧪 Testing & Validation

* Simulated high gas values to trigger alerts
* Verified server responses (`200` / `-1`)
* Tested email notification system
* Validated frontend map updates

---

## ⚠️ Challenges Faced

* Sensor calibration inconsistencies
* Email authentication issues (Gmail security restrictions)
* Handling real-time data synchronization
* Debugging API communication between ESP32 and server

---

## 🔮 Future Enhancements

* SMS/Push notification integration
* Mobile application for remote monitoring
* Multi-sensor scalability
* Cloud deployment (AWS / Firebase)
* AI-based predictive safety analytics

---

## 🌍 Impact

This project contributes to:

* Improved workplace safety
* Faster hazard response time
* Reduction in industrial accidents
* Scalable IoT-based monitoring solutions

---

## 👨‍💻 Contributors

* Rekha M Patil
#### * Team Members:
* Shweta Jadhav
* Varsha Badage
* Prema Meti

---

## 📜 License

This project is licensed under the MIT License.
