const temples = [
  {
    name: "Salt Lake Temple",
    location: "Salt Lake City, Utah, USA",
    dedicated: "1893-04-06",
    area: 253015,
    image: "temple1.jpg",
    alt: "Salt Lake Temple"
  },

    {
        name: "Johannesburg Temple",
        location: "Johannesburg, South Africa",
        dedicated: "1985-08-24",
        area: 19184,
        image: "temple2.jpg",
        alt: "Johannesburg Temple"
    },

    {
        name: "Tokyo Temple",
        location: "Tokyo, Japan",
        dedicated: "1980-10-27",
        area: 52000,
        image: "temple3.jpg",
        alt: "Tokyo Temple"
    },

    {
        name: "São Paulo Temple",
        location: "São Paulo, Brazil",
        dedicated: "1978-10-30",
        area: 59246,
        image: "temple4.jpg",
        alt: "São Paulo Temple"
    },

    {
        name: "Rome Temple",
        location: "Rome, Italy",
        dedicated: "2019-03-10",
        area: 41010,
        image: "temple5.jpg",
        alt: "Rome Temple"
    },

    {
        name: "Accra Ghana Temple",
        location: "Accra, Ghana",
        dedicated: "2004-01-11",
        area: 17500,
        image: "temple6.jpg",
        alt: "Accra Ghana Temple"
    },

    {
        name: "Paris France Temple",
        location: "Le Chesnay, France",
        dedicated: "2017-05-21",
        area: 44175,
        image: "temple7.jpg",
        alt: "Paris France Temple"
    },

    {
        name: "Apia Samoa Temple",
        location: "Apia, Samoa",
        dedicated: "1983-08-05",
        area: 18691,
        image: "temple8.jpg",
        alt: "Apia Samoa Temple"
    },

    {
        name: "Provo Utah Temple",
        location: "Provo, Utah",
        dedicated: "1972-02-09",
        area: 128325,
        image: "temple9.jpg",
        alt: "Provo Utah Temple"
    }
]; 

const container = document.querySelector("#temple-container"); // adjust selector

function createTempleCard(temple) {
  return `
    <figure class="temple-card">
      <img src="${temple.image}" alt="${temple.alt}" loading="lazy">
      <figcaption>
        <h3>${temple.name}</h3>
        <p>Location: ${temple.location}</p>
        <p>Dedicated: ${temple.dedicated}</p>
        <p>Area: ${temple.area.toLocaleString()} sq ft</p>
      </figcaption>
    </figure>
  `;
}

function displayTemples(filteredTemples) {
  container.innerHTML = filteredTemples.map(createTempleCard).join("");
}

// Filter functions
function filterOld() {
  displayTemples(temples.filter(t => new Date(t.dedicated).getFullYear() < 1900));
}
function filterNew() {
  displayTemples(temples.filter(t => new Date(t.dedicated).getFullYear() > 2000));
}
function filterLarge() {
  displayTemples(temples.filter(t => t.area > 90000));
}
function filterSmall() {
  displayTemples(temples.filter(t => t.area < 10000));
}
function showAll() {
  displayTemples(temples);
}

// Nav event listeners (adjust IDs/classes to match your nav)
document.querySelector("#old").addEventListener("click", filterOld);
document.querySelector("#new").addEventListener("click", filterNew);
document.querySelector("#large").addEventListener("click", filterLarge);
document.querySelector("#small").addEventListener("click", filterSmall);
document.querySelector("#home").addEventListener("click", showAll);

// Initial display
showAll();

// Footer
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;