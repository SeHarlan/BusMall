import mainProductArray from '../utils/catelog.js';
import { displayChoices, SuperProductArray, calculateVotes } from '../utils/functions.js';


//dom
const testField = document.getElementById('test-field');
const form = document.querySelector('form');


//state
const newProductArray = new SuperProductArray(mainProductArray);



//initialize page
const newChoices = newProductArray.generateRandomChoices();

displayChoices(newChoices, testField);

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(form);
    const voteData = new FormData(form);
    calculateVotes(voteData);
});