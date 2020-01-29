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

export function calculateVotes(currentVote) {

    const productVotesData = getVoteData();
    
    const currentVoteObject = findById(productVotesData, currentVote);
    console.log('current object', currentVoteObject);
    if (currentVoteObject) {
        currentVoteObject.votes++;
    } else {
        const newVoteObject = {
            id: currentVote,
            votes: 1
        };
        productVotesData.push(newVoteObject);
    }
    console.log('voteDataArray: ', productVotesData);

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


function findById(array, objectId) {
    let foundObject;
    array.forEach(item => {
        if (item.id === objectId) {
            foundObject = item;
        } else {
            foundObject = false;
        }
    });
    return foundObject;
}

export function getVoteData() {
    const stringyVoteData = localStorage.getItem('VOTES');
    let voteData;
    if (stringyVoteData) {
        voteData = JSON.parse(stringyVoteData);
    } else {
        voteData = [];
    }
    return voteData;
}

export function setVoteData(voteDataArray) {
    const parsedVoteData = JSON.stringify(voteDataArray);
    localStorage.setItem('VOTES', parsedVoteData);
}