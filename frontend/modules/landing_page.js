import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  //console.log("from inti()");
  console.log(config.backendEndpoint);
  let cities = await fetchCities();
  //console.log(cities);
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
  // console.log(cities);
}
//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const data = await fetch(config.backendEndpoint+`/cities`);
    return data.json();

  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let card = document.getElementById("data");
  let cardC = document.createElement("div");
  cardC.className = "col-6 col-md-4 col-lg-3 mb-4";
  cardC.innerHTML = `
  <a href="pages/adventures/?city=${id}" id="${id}">
  <div class="tile">
    <div class="tile-text text-center">
        <h5>${city}</h5>
        <p>${description}</p>
    </div>
    <img class="img-responsive" src="${image}">
  </div>
  
</a>
  `;
  card.appendChild(cardC);

}

export { init, fetchCities, addCityToDOM };
