import mainProductArray from '../utils/catelog.js';
import { displayChoices, SuperProductArray } from '../utils/functions.js';


//dom
const testField = document.getElementById('test-field');


//state
const newProductArray = new SuperProductArray(mainProductArray);


const choices = [newProductArray.products[0], newProductArray.products[2], newProductArray.products[5]];

console.log(choices);


displayChoices(choices, testField);
