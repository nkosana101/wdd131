// Static weather values — must match the values displayed in the HTML
const temperature = 8; // °C
const windSpeed = 12; // km/h

// One-line wind chill formula for metric units
function calculateWindChill(temp, wind) {
  return 13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16);
}

function displayWindChill() {
  const windChillElement = document.getElementById('windchill');

  // Only calculate when conditions are viable
  if (temperature <= 10 && windSpeed > 4.8) {
    const chill = calculateWindChill(temperature, windSpeed);
    windChillElement.textContent = `${chill.toFixed(1)} °C`;
  } else {
    windChillElement.textContent = 'N/A';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  displayWindChill();

  document.getElementById('currentYear').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = document.lastModified;
});