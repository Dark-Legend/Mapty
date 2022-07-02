'use strict';

//List of elements
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

//Function to get the current location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { longitude } = position.coords;
      const { latitude } = position.coords;

      const coords = [latitude,longitude];

      const map = L.map('map').setView(coords, 13);

      //LeafLet Library for Map
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      //Map Marker Implementation
      map.on('click', function(mapEvent){

        const {lat,lng} = mapEvent.latlng;

        L.marker([lat,lng])
          .addTo(map)
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
          
      });
    },
    function () {
      alert(`Not able to find your current location.`);
    }
  );
}
