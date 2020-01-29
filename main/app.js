import mainProductArray from '../utils/catelog.js';
import { displayChoices, SuperProductArray, calculateVotes } from '../utils/functions.js';


//dom
const testField = document.getElementById('test-field');
const form = document.querySelector('form');

//state
let testCount, productVotes, newProductArray, currentProductsShown;


//initialize page
initializeState();

const newChoices = newProductArray.generateRandomChoices();

displayChoices(newChoices, testField, currentProductsShown); //and update currentProductsShown


//respond to event
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const voteData = new FormData(form);

    calculateVotes(voteData, productVotes, currentProductsShown);

    //reached 25 tests logic
    testCount++;
    console.log(productVotes);
    currentProductsShown = [];
    const newNewChoices = newProductArray.generateRandomChoices();
    displayChoices(newNewChoices, testField, currentProductsShown);

});

function initializeState() {
    newProductArray = new SuperProductArray(mainProductArray);
    testCount = 0;
    productVotes = [];
    currentProductsShown = [];
}
