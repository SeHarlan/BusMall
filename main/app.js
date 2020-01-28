import mainProductArray from '../utils/catelog.js';
import { displayChoices, SuperProductArray } from '../utils/functions.js';


//dom
const testField = document.getElementById('test-field');
const form = document.getElementById('form');


//state
const newProductArray = new SuperProductArray(mainProductArray);


const newChoices = newProductArray.generateRandomChoices();




displayChoices(newChoices, testField);
