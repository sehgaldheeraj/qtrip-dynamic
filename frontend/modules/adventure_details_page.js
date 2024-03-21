import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let params =new URLSearchParams(search);
  // console.log(params.get(`adventure`));
  return params.get(`adventure`);

  // Place holder for functionality to work in the Stubs
  // return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    const data = await fetch(config.backendEndpoint+`/adventures/detail?adventure=${adventureId}`);
    
    return await data.json();
  }catch{
    return null;
  }

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  // id = adventure-name
  document.getElementById("adventure-name").append(adventure.name);
  // id = adventure-subtitle
  document.getElementById("adventure-subtitle").append(adventure.subtitle);
  // id = photo-content
  for(let i=0;i<adventure.images.length;i++){
    let div = document.createElement("div");
    let img = document.createElement("img");

    img.setAttribute("class","activity-card-image");
    img.src = adventure.images[i];
    div.append(img);
    document.getElementById("photo-gallery").append(div);
  }
  // id = adventure-content
  document.getElementById("adventure-content").append(adventure.content);
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  // source: Carousel-bootstrap documentation
  document.getElementById("photo-gallery").innerHTML=`
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="carousel-inner">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `;
  let carInner = document.getElementById("carousel-inner");
  images.forEach((linker, index) => {
    let divInner = document.createElement("div");
    index === 0 ? divInner.setAttribute("class","carousel-item active"):divInner.setAttribute("class","carousel-item")
    divInner.innerHTML =`
    <img src=${linker} class="d-block w-100 activity-card-image"/>
    `;
    carInner.append(divInner);
  } );

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let resSol = document.getElementById("reservation-panel-sold-out");
  let resAvail = document.getElementById("reservation-panel-available");
  
  if(adventure.available===true){
    resSol.style.display="none";
    resAvail.style.display="block";
    let resCost = document.getElementById("reservation-person-cost");
    resCost.textContent=adventure.costPerHead;
  }
  else{
    resSol.style.display="block";
    resAvail.style.display="none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").textContent=persons*adventure.costPerHead;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const myForm = document.getElementById("myForm");
  myForm.addEventListener("submit", async (e) =>{
    e.preventDefault();
    let data = {
      name: myForm.elements["name"].value,
      date: new Date(myForm.elements["date"].value),
      person: myForm.elements["person"].value,
      adventure: adventure["id"]
    }
    
      // const url=`${config.backendEndpoint}/reservations/new`;
      let res = await fetch(config.backendEndpoint+"/reservations/new",{
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
      });
      if(res.ok){
        alert("success");
        window.location.reload();
      }
      else{
        alert("failed");
      }

  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure["reserved"]==true){
    document.getElementById("reserved-banner").style.display ="block";
  }
  else{
    document.getElementById("reserved-banner").style.display ="none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
