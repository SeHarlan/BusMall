export function displayChoices(itemArray, elementToAppend) {

    itemArray.forEach(item => {
        const labelElement = document.createElement('label');

        const name = item.name;
        const nameElement = document.createElement('p');
        nameElement.textContent = name;
        labelElement.appendChild(nameElement);
        
        const image = `../assets/${item.image}`;
        const imageElement = document.createElement('img');
        imageElement.alt = item.name;
        imageElement.src = image;
        labelElement.appendChild(imageElement);

        const radioElement = document.createElement('input');
        radioElement.type = 'radio';
        radioElement.value = item.id;
        radioElement.name = 'choices';
        labelElement.appendChild(radioElement);

        elementToAppend.appendChild(labelElement);
    });
}

export function generateRandomChoices(newArrayClass) {
    let choiceOne = newArrayClass.getRandomProduct();
    let choiceTwo = newArrayClass.getRandomProduct();
    let choiceThree = newArrayClass.getRandomProduct();

    //make sure they arent the same
    while (choiceOne.id === choiceTwo.id || choiceOne.id === choiceThree) {
        choiceOne = newArrayClass.getRandomProduct();
    }
    while (choiceTwo.id === choiceThree || choiceTwo.id === choiceOne.id) {
        choiceTwo = newArrayClass.getRandomProduct();
    }

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
        while (choiceOne.id === choiceTwo.id || choiceOne.id === choiceThree) {
            choiceOne = this.getRandomProduct();
        }
        while (choiceTwo.id === choiceThree || choiceTwo.id === choiceOne.id) {
            choiceTwo = this.getRandomProduct();
        }

        //make sure it doesnt match last choice 
        //tbd

        return [choiceOne, choiceTwo, choiceThree];
    }
    
}