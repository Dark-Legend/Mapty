'use strict'

//List of elements
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


//Function to get the current location
if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(function(position){
    console.log(position);
},function(){
    alert(`Not able to find your current location.`)
});
}