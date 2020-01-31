import { getVoteData, findNameById, getGlobalData } from '../utils/functions.js';
import mainProductArray from '../utils/catelog.js';



//state
const currentVoteData = getVoteData();
const globalVoteData = getGlobalData();


//do things
const localNames = sortNames(currentVoteData);
const localVotes = sortVotes(currentVoteData);
const localShown = sortShown(currentVoteData);

const globalNames = sortNames(globalVoteData);
const globalVotes = sortVotes(globalVoteData);
const globalShown = sortShown(globalVoteData);

//LOCAL CHART JS STUFF
const ctx = document.getElementById('local-chart').getContext('2d');
const ctx2 = document.getElementById('global-chart').getContext('2d');

const labelColors = ['blue', 'yellow', 'green', 'purple', 'orange', 'red', 'blue', 'yellow', 'green', 'purple', 'orange', 'red', 'blue', 'yellow', 'green', 'purple', 'orange', 'red', 'blue', 'yellow', 'green', 'purple', 'orange'];

const localChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: localNames,
        datasets: [{
            label: '# of Votes',
            data: localVotes,
            backgroundColor: labelColors
        }, {
            label: 'Times shown',
            data: localShown,
            backgroundColor: 'grey'
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


const globalChart = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: globalNames,
        datasets: [{
            label: '# of Votes',
            data: globalVotes,
            backgroundColor: labelColors
        }, {
            label: 'Times shown',
            data: globalShown,
            backgroundColor: 'grey'
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

function sortShown(data) {
    const shownArray = [];
    data.forEach(object => {
        const newShown = object.shown;
        shownArray.push(newShown);
    });
    return shownArray;
}

