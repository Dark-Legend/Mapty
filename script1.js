'use strict';

//List of elements
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

//Refactoring the code using Class

class App {
  #map;
  #mapEvent;

  constructor() {
    this.__getPosition();
    form.addEventListener('submit', this.__newWorkout.bind(this));
    //for changing the input types for cycling and running
    inputType.addEventListener('change', this.__toggleElevationField);
  }

  //This method gives the current position of the person
  __getPosition() {
    //Function to get the current location
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this.__loadMap.bind(this),
        function () {
          alert(`Not able to find your current location.`);
        }
      );
  }

  //This Method Load the map into the Website
  __loadMap(position) {
    const { longitude } = position.coords;
    const { latitude } = position.coords;

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, 15);

    //LeafLet Library for Map
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //Map Marker Implementation
    this.#map.on('click', this.__showForm.bind(this));
  }

  __showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  __toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  __newWorkout(e) {
    e.preventDefault();

    //clearing input fields

    inputDistance.value =
      inputCadence.value =
      inputDuration.value =
      inputElevation.value =
        '';

    //For Displaying Marker
    const { lat, lng } = this.#mapEvent.latlng;

    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Workout')
      .openPopup();
  }
}

const app = new App();
