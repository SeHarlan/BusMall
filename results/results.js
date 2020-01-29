import { getVoteData, findNameById } from '../utils/functions.js';
import mainProductArray from '../utils/catelog.js';

//dom
const localResultField = document.getElementById('local-results');
const globalResultField = document.getElementById('global-results');


//state
const currentVoteData = getVoteData();

console.log(currentVoteData);



//do things
const localNames = sortNames(currentVoteData);
const localVotes = sortVotes(currentVoteData);



localResultField.textContent = localVotes;



function sortNames(data) {
    const names = [];
    data.forEach(object => {
        const newName = findNameById(mainProductArray, object.id);
        names.push(newName);
    });
    return names;
}

function sortVotes(data) {
    const votes = [];
    data.forEach(object => {
        const newVote = object.votes;
        votes.push(newVote);
    });
    return votes;
}