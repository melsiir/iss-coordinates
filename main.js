
const iss = document.getElementById("iss");
const lat = document.getElementById('lat')
const lng = document.getElementById('lng')
const vel = document.getElementById('vel')
const alt = document.getElementById('alt')

//make our map
const map = L.map('map', {
    center: [0, 0],
    zoom: 2
});

const attribution = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'

const tile = "https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=TB4pMiu6Y2xZhKGiGo1k"

const issIcon = L.icon({
    iconUrl: './iss.png',
    iconSize: [50, 40],
    iconAnchor: [25, 16],
});

L.tileLayer(tile,{ attribution }).addTo(map)
const marker = L.marker([50.5, 30.5], {icon: issIcon} ).addTo(map);

let firstTime = true

async function getIss() {
  const respone = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
  const issData = await respone.json();
  // console.log(issData)
  const {latitude, longitude, velocity, altitude } = issData
  marker.setLatLng([latitude, longitude])

  if (firstTime) {
  map.setView([latitude, longitude], 2) 
  firstTime = false
  }

  lat.textContent = latitude
  lng.textContent = longitude
  vel.textContent = velocity
  alt.textContent = altitude
}


getIss()
setInterval(getIss, 1000)

