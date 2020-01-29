export function displayChoices(itemArray, elementToAppend, currentProductsShown) {

    itemArray.forEach(item => {
        const labelElement = document.createElement('label');
        labelElement.for = item.id;

        const name = item.name;
        const nameElement = document.createElement('p');
        nameElement.textContent = name;
        labelElement.appendChild(nameElement);

        const radioElement = document.createElement('input');
        radioElement.type = 'radio';
        radioElement.value = item.id;
        radioElement.id = item.id;
        radioElement.name = 'choices';
        radioElement.required = 'true';
        labelElement.appendChild(radioElement);
        
        const image = `../assets/${item.image}`;
        const imageElement = document.createElement('img');
        imageElement.alt = item.name;
        imageElement.src = image;
        labelElement.appendChild(imageElement);

        elementToAppend.appendChild(labelElement);

        currentProductsShown.push(item.id);
    });
}

export function calculateVotes(voteData, productVotes, currentProductsShown) {

    const currentVote = voteData.get('choices');
    
    currentProductsShown.forEach(item => {
        console.log(item);
        //voted logic
        if (item === currentVote) {
            
            //if in productvotes array
            console.log(productVotes, currentVote);
            if (matchProductId(productVotes, currentVote)) {
                const currentObject = findById(productVotes, currentVote);
                currentObject.voteCount++;
                currentObject.item.shownCount++;
                console.log(currentObject);
            } else {
                const newVoteData = {
                    id: item,
                    voteCount: 1,
                    shownCount: 1
                };
                productVotes.push(newVoteData);
            }

        } else {
            //not voted logic
            if (matchProductId(productVotes, item)) {
                const currentShownProduct = findById(productVotes, item);
                currentShownProduct.shownCount++;
            } else {
                const newShownData = {
                    id: item,
                    voteCount: 0,
                    shownCount: 1
                };
                productVotes.push(newShownData);
            }
        }
    });

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

function matchProductId(array, objectId) {
    let match; 
    array.forEach(item => {
        if (item.id === objectId) {
            match = true;
        } else {
            match = false;
        }
    });
    return match;
}

function findById(array, itemId) {
    array.forEach(item => {
        if (item.id === itemId) {
            return item;
        }
    });
}
