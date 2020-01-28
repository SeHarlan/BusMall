import mainProductArray from '../utils/catelog.js';
import { displayChoices, SuperProductArray } from '../utils/functions.js';


//dom
const testField = document.getElementById('test-field');


//state
const newProductArray = new SuperProductArray(mainProductArray);


const choices = [newProductArray.getRandomProduct(), newProductArray.getRandomProduct(), newProductArray.getRandomProduct()]

console.log(choices);


displayChoices(choices, testField);
