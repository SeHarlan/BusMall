import mainProductArray from '../utils/catelog.js';
import { displayChoices, SuperProductArray, calculateVotes, removeChoices } from '../utils/functions.js';


//dom
const testField = document.getElementById('test-field');
const form = document.getElementById('form');

//state
let testCount, newProductArray;


//initialize page
initializeState();

const newChoices = newProductArray.generateRandomChoices();
displayChoices(newChoices, testField);


//respond to event
form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const currentVote = document.querySelector('input[name="choices"]:checked').value;
    const currentElementsOnPage = document.querySelectorAll('label');
    
    calculateVotes(currentVote);
    
    if (testCount > 25) {
        window.location = './results';
    } else {
        testCount = testCount + 1;
    }

    reinitializeTestState(currentElementsOnPage);

});

function reinitializeTestState(currentElementsOnPage) {
    removeChoices(currentElementsOnPage, testField);
    const newNewChoices = newProductArray.generateRandomChoices();
    displayChoices(newNewChoices, testField);
}

function initializeState() {
    newProductArray = new SuperProductArray(mainProductArray);
    testCount = 0;
    
}
