export function displayChoices(itemArray, elementToAppend) {

    itemArray.forEach(item => {
        const labelElement = document.createElement('label');
        labelElement.id = item.id;

        const name = item.name;
        const nameElement = document.createElement('p');
        nameElement.textContent = name;
        labelElement.appendChild(nameElement);

        const radioElement = document.createElement('input');
        radioElement.type = 'radio';
        radioElement.value = item.id;
        // radioElement.id = item.id;
        radioElement.name = 'choices';
        radioElement.required = 'true';
        labelElement.appendChild(radioElement);
        
        const image = `../assets/${item.image}`;
        const imageElement = document.createElement('img');
        imageElement.alt = item.name;
        imageElement.src = image;
        labelElement.appendChild(imageElement);

        elementToAppend.appendChild(labelElement);
    });
}

export function removeChoices(elementsToRemove, parent) {
    elementsToRemove.forEach(el => {
        parent.removeChild(el);
    });
}

export function calculateVotes(currentVote, elementsShown) {

    const productVotesData = getVoteData();
    const globalData = getGlobalData();
    const voteId = currentVote;
    
    elementsShown.forEach(el => {
        //deal with votes
        updateData(el, voteId, productVotesData);
        updateData(el, voteId, globalData);

    });

    setVoteData(productVotesData);
    setGlobalData(globalData);
}


export class SuperProductArray {
    constructor(products) {
        this.products = [...products];
    }

    getRandomProduct() {
        const choiceIndex = Math.floor(Math.random() * this.products.length);
        return this.products[choiceIndex];
    }

    generateRandomChoices(prevShown) {
        let choiceOne = this.getRandomProduct();
        let choiceTwo = this.getRandomProduct();
        let choiceThree = this.getRandomProduct();
        
        //make sure it doesnt match last choice 
        // if (prevShown) {
            
        // }



        //make sure they arent the same
        while (choiceOne.id === choiceTwo.id || choiceTwo.id === choiceThree.id || choiceThree.id === choiceOne.id) {
            choiceOne = this.getRandomProduct();
            choiceTwo = this.getRandomProduct();
        }

        

        return [choiceOne, choiceTwo, choiceThree];
    }

    
}


function updateData(el, voteId, dataArray) {
    if (el.id === voteId) {
        const currentVoteIndex = findIndexById(dataArray, voteId);
        if (currentVoteIndex) {
            dataArray[currentVoteIndex].votes++;
            dataArray[currentVoteIndex].shown++;
        }
        else {
            const newVoteObject = {
                id: voteId,
                votes: 1,
                shown: 1
            };
            dataArray.push(newVoteObject);
        }
    }
    else {
        //deal with shown data
        const currentElIndex = findIndexById(dataArray, el.id);
        if (currentElIndex) {
            dataArray[currentElIndex].shown++;
        }
        else {
            const newShownObject = {
                id: el.id,
                votes: 0,
                shown: 1
            };
            dataArray.push(newShownObject);
        }
    }
}

function findIndexById(array, objectId) {
    if (!array) return;
    let foundIndex;
    array.forEach((item, index) => {
        if (item.id === objectId) {
            foundIndex = index;
        } 
    });
    return foundIndex;
}

export function findNameById(array, objectId) {
    if (!array) return;
    let foundName;
    array.forEach(item => {
        if (item.id === objectId) {
            foundName = item.name;
        }
    });
    return foundName;
}

export function getVoteData() {
    const stringyVoteData = localStorage.getItem('VOTES');
    if (!stringyVoteData) return [];
   
    const voteInfo = JSON.parse(stringyVoteData);
    return voteInfo;
    
}

export function getGlobalData() {
    const stringyGlobalData = localStorage.getItem('GLOBAL');
    if (!stringyGlobalData) return [];

    const globalInfo = JSON.parse(stringyGlobalData);
    return globalInfo;
}

export function setVoteData(voteDataArray) {
    const dataToSet = JSON.stringify(voteDataArray);
    localStorage.setItem('VOTES', dataToSet);
}

export function setGlobalData(globalDataArray) {
    const dataToSet = JSON.stringify(globalDataArray);
    localStorage.setItem('GLOBAL', dataToSet);
}