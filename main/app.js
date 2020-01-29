import mainProductArray from '../utils/catelog.js';
import { displayChoices, SuperProductArray, calculateVotes, getVoteData } from '../utils/functions.js';


//dom
const testField = document.getElementById('test-field');
const form = document.querySelector('form');

//state
let testCount, newProductArray;


//initialize page
initializeState();

const newChoices = newProductArray.generateRandomChoices();

displayChoices(newChoices, testField);


//respond to event
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // const voteData = new FormData(form);
    const currentVote = document.querySelector('input[name="choices"]:checked').value;

    calculateVotes(currentVote);
    
    ////reached 25 tests logic
    if (testCount > 25) {
        window.location = './results';
    } else {
        testCount = testCount + 1;
    }
    

    reinitializeTestState();

});

function reinitializeTestState() {
    currentProductsShown.forEach(object => {
        const child = document.getElementById(object);
        testField.removeChild(child);
    });
    
    const newNewChoices = newProductArray.generateRandomChoices();
    displayChoices(newNewChoices, testField, currentProductsShown);
}

function initializeState() {
    newProductArray = new SuperProductArray(mainProductArray);
    testCount = 0;
    
}
