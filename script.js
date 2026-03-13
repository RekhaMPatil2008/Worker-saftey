/* PAGE SWITCHING */

function showPage(page){

document.getElementById("dashboard").classList.remove("active");
document.getElementById("workers").classList.remove("active");

document.getElementById(page).classList.add("active");

}


/* CHART LABELS */

const labels=[];


/* CREATE CHART FUNCTION */

function createChart(id,label,color){

return new Chart(document.getElementById(id),{

type:'line',

data:{
labels:labels,
datasets:[{
label:label,
data:[],
borderColor:color,
backgroundColor:color,
fill:false,
tension:0.4
}]
},

options:{
responsive:true,

scales:{
x:{
title:{
display:true,
text:"Time"
}
},

y:{
beginAtZero:true
}
}

}

});

}


/* CREATE GRAPHS */

const gasChart=createChart("gasChart","Gas","red");
const tempChart=createChart("tempChart","Temperature","orange");
const humChart=createChart("humChart","Humidity","blue");


/* CREATE MAP */

const map=L.map('map').setView([12.9716,77.5946],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19
}).addTo(map);

let marker=L.marker([12.9716,77.5946]).addTo(map);


/* LOAD SENSOR DATA */

async function loadData(){

try{

const res=await fetch("/data");
const data=await res.json();

console.log(data);


/* TIME LABEL */

const time=new Date().toLocaleTimeString();

labels.push(time);


/* UPDATE GRAPHS */

gasChart.data.datasets[0].data.push(data.gas);
tempChart.data.datasets[0].data.push(data.temperature);
humChart.data.datasets[0].data.push(data.humidity);

gasChart.update();
tempChart.update();
humChart.update();


/* UPDATE DASHBOARD VALUES */

document.getElementById("gasValue").innerText=data.gas;
document.getElementById("tempValue").innerText=data.temperature+" °C";
document.getElementById("humValue").innerText=data.humidity+" %";


/* UPDATE WORKERS TABLE */

document.getElementById("w1gas").innerText=data.gas;
document.getElementById("w1temp").innerText=data.temperature;
document.getElementById("w1hum").innerText=data.humidity;

document.getElementById("w2gas").innerText=data.gas;
document.getElementById("w2temp").innerText=data.temperature;
document.getElementById("w2hum").innerText=data.humidity;


/* UPDATE MAP LOCATION */

marker.setLatLng([data.lat,data.lon]);


/* GAS ALERT */

if(data.gas>300){

marker.bindPopup("⚠ GAS HAZARD DETECTED").openPopup();
alert("⚠ Gas Leak Detected!");

}

}catch(error){

console.log("Error:",error);

}

}


/* REFRESH EVERY 3 SECONDS */

setInterval(loadData,3000);


/* FIRST LOAD */

loadData();


/* DOWNLOAD REPORT */

function downloadReport(){

window.location="/report";

}