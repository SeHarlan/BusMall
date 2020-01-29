import { getVoteData, findNameById } from '../utils/functions.js';
import mainProductArray from '../utils/catelog.js';

//dom
// const localResultField = document.getElementById('local-results');
// const globalResultField = document.getElementById('global-results');


//state
const currentVoteData = getVoteData();

console.log(currentVoteData);



//do things
const localNames = sortNames(currentVoteData);
const localVotes = sortVotes(currentVoteData);

//LOCAL CHART JS STUFF
const ctx = document.getElementById('local-chart').getContext('2d');

const labelColors = ['blue', 'yellow', 'green', 'purple', 'orange', 'red', 'blue', 'yellow', 'green', 'purple', 'orange', 'red', 'blue', 'yellow', 'green', 'purple', 'orange'];

const localChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: localNames,
        datasets: [{
            label: '# of Votes',
            data: localVotes,
            backgroundColor: labelColors
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});





//functions

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