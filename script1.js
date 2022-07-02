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

class Workout{
    date = new Date();
    id = (Date.now() + '').slice(-10);

    constructor(coords,distance,duration){
        this.coords =  coords;
        this.distance = distance;
        this.duration = duration;
    }
};

class Running extends Workout {
    constructor(coords,distance,duration,cadence){
        super(coords,distance,duration);
        this.cadence = cadence;
        this.calcPace();
    }

    calcPace() {
        this.pace = this.duration / this.distance;
        return this.pace;
    };
}

class Cycling extends Workout{
    constructor(coords,distance,duration,elevationGain){
        super(coords,distance,duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
    }

    calcSpeed() {
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    };
}

const running1 = new Running([29, -12],2,30,250);
const cycling2 = new Cycling([29, -12],20,2,550);



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
