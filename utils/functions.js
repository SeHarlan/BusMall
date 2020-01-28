export function displayChoices(itemArray, elementToAppend) {

    itemArray.forEach(item => {
        const name = item.name;
        const nameElement = document.createElement('p');
        nameElement.textContent = name;
        elementToAppend.appendChild(nameElement);
        
        const image = `../assets/${item.image}`;
        const imageElement = document.createElement('img');
        imageElement.alt = item.name;
        imageElement.src = image;
        elementToAppend.appendChild(imageElement);

        const radioElement = document.createElement('input');
        radioElement.type = 'radio';
        radioElement.value = item.id;
        radioElement.name = 'choices';
        elementToAppend.appendChild(radioElement);
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
    
}