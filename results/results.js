import { getVoteData, findNameById } from '../utils/functions.js';
import mainProductArray from '../utils/catelog.js';



//state
const currentVoteData = getVoteData();

setGlobalData(currentVoteData);

const globalVoteData = getGlobalData();

console.log('current:', currentVoteData);
console.log('global:', globalVoteData);



//do things
const localNames = sortNames(currentVoteData);
const localVotes = sortVotes(currentVoteData);
const localShown = sortShown(currentVoteData);

//LOCAL CHART JS STUFF
const ctx = document.getElementById('local-chart').getContext('2d');

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

function getGlobalData() {
    let globalArray = [];
    const round = JSON.parse(localStorage.getItem('ROUND'));
    if (!round) return;
    for (let i = 1; i <= round; i++) {
        const roundKey = `VOTEROUND${i}`;
        const dataToGet = localStorage.getItem(roundKey);
        globalArray.push(dataToGet);
    }
    return globalArray;
}

function setGlobalData(localData) {
    const dataToPush = JSON.stringify(localData);
    const parentData = getGlobalData();
    if (!parentData) {
        const roundToPush = JSON.stringify(1);
        localStorage.setItem('ROUND', roundToPush);
        localStorage.setItem('VOTEROUND1', dataToPush);
    } else {
        parentData.push(dataToPush);
        const roundToPush = JSON.stringify(parentData.length)
        localStorage.setItem('ROUND', roundToPush);
        
        for (let k = 1; k <= parentData.length; k++) {
            const roundKey = `VOTEROUND${k}`;
            const dataToSet = JSON.stringify(parentData[k - 1]);
            localStorage.setItem(roundKey, dataToSet);
        }
    }
    localStorage.removeItem('VOTES');
}