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

export function calculateVotes(currentVote) {

    const productVotesData = getVoteData();
    
    const voteId = currentVote;
    
    const currentVoteIndex = findIndexById(productVotesData, voteId);

    
    if (currentVoteIndex) {
        productVotesData[currentVoteIndex].votes++;
    } else {
        const newVoteObject = {
            id: voteId,
            votes: 1
        };
        productVotesData.push(newVoteObject);
    }

    setVoteData(productVotesData);
}




export class SuperProductArray {
    constructor(products) {
        this.products = [...products];
    }

    getRandomProduct() {
        const choiceIndex = Math.floor(Math.random() * this.products.length);
        return this.products[choiceIndex];
    }

    generateRandomChoices() {
        let choiceOne = this.getRandomProduct();
        let choiceTwo = this.getRandomProduct();
        let choiceThree = this.getRandomProduct();
    
        //make sure they arent the same
        while (choiceOne.id === choiceTwo.id || choiceTwo.id === choiceThree.id || choiceThree.id === choiceOne.id) {
            choiceOne = this.getRandomProduct();
            choiceTwo = this.getRandomProduct();
        }

        //make sure it doesnt match last choice 
        //tbd

        return [choiceOne, choiceTwo, choiceThree];
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

export function getVoteData() {
    const stringyVoteData = localStorage.getItem('VOTES');
    if (!stringyVoteData) return [];
   
    const voteInfo = JSON.parse(stringyVoteData);
    return voteInfo;
    
}

export function setVoteData(voteDataArray) {
    const dataToSet = JSON.stringify(voteDataArray);
    localStorage.setItem('VOTES', dataToSet);
}