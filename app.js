document.getElementById("date-start").valueAsDate = new Date(); 
const numPersons = document.getElementById("num-persons");
const numSuitcases = document.getElementById("num-suitcases");
const carsContainer = document.querySelector(".cars");
const form = document.getElementById("form");
const dateStart = document.getElementById("date-start");
const dateHandIn = document.getElementById("date-end");
let carBox = "";

function validDates(dateStart, dateHandIn) {
  const arrival = new Date(dateStart);
  const departure = new Date(dateHandIn);
  if (arrival > departure) {
    return false;
  } else {
    return true;
  }
}

function calcRentalDays(dateStart, dateHandIn) {
  const arrival = new Date(dateStart);
  const departure = new Date(dateHandIn);
  const timediff = departure.getTime() - arrival.getTime();
  const diffindays = timediff / (1000 * 3600 * 24) + 1;
  return diffindays;
}

function calcRentalCost(days, priceperday) {
  const totalprice = priceperday * days;
  return totalprice;
}

form.addEventListener("submit", function (e) { //
  e.preventDefault();


  const datesValid = validDates(dateStart.value, dateHandIn.value);
  if (datesValid) {
    for (const car of cars) {
      const cost = calcRentalCost(
        calcRentalDays(dateStart.value, dateHandIn.value),
        car.price
      );
      if (numPersons.value <= 4 || numSuitcases <= 4) {
        if (car.category === "Standard") {
          carBox = `
              <div class="first-car" id="car-box">
                      <img class="car-one-logo" id="car-logo" src="${car.image}" />
                      <p class="car-name" id="car-name">${car.name}</p>
                      <div>
                      <p id="car-category">Type: ${car.type}</p>
                      <p id="car-persons">Persons: ${car.persons}</p>
                      <p id="car-suitcases">Suitcases: ${car.suitcases}</p>
                      </div>
                      <div>
                      <p id="car-price">${cost} kr</p>
                      <button class="book-car-btn" id="car-book-btn">Book Now</button>
                      </div>
                  </div>
              `;
          carsContainer.insertAdjacentHTML("beforeend", carBox);
        }
      }
      if (numPersons.value > 4 || numSuitcases > 4) {
        if (car.category === "Van" || car.category === "Limousine") {
          carBox = `
                <div class="first-car" id="car-box">
                        <img class="car-one-logo" id="car-logo" src="${car.image}" />
                        <p class="car-name" id="car-name">${car.name}</p>
                        <div>
                        <p id="car-category">Type: ${car.type}</p>
                        <p id="car-persons">Persons: ${car.persons}</p>
                        <p id="car-suitcases">Suitcases: ${car.suitcases}</p>
                        </div>
                        <div>
                        <p id="car-price">${car.price} kr</p>
                        <button class="book-car-btn" id="car-book-btn">Book Now</button>
                        </div>
                    </div>
                `;
          carsContainer.insertAdjacentHTML("beforeend", carBox);
        }
      }
    }
  } else {
    carsContainer.insertAdjacentHTML(
      "beforeend",
      "Pick up date can not be later than handing in date"
    );
  }
});
