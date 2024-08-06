let openShopping = document.querySelector('.logo');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.list-card');
let body = document.querySelector('body');
let quantityBody = document.querySelector('.quantity');
let total = document.querySelector('.total');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'PRODUCT NAME 1',
        image: '1.PNG',
        price: 10000
    },
    {
        id: 2,
        name: 'PRODUCT NAME 2',
        image: '2.PNG',
        price: 20000
    },
    {
        id: 3,
        name: 'PRODUCT NAME 3',
        image: '3.PNG',
        price: 30000
    },
    {
        id: 4,
        name: 'PRODUCT NAME 4',
        image: '4.PNG',
        price: 40000
    },
    {
        id: 5,
        name: 'PRODUCT NAME 5',
        image: '5.PNG',
        price: 50000
    },
    {
        id: 6,
        name: 'PRODUCT NAME 6',
        image: '6.PNG',
        price: 60000
    }
];

let listCards  = [];

function initApp() {
    products.forEach((element, key)=>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="assets/images/${element.image}">
            <div class="title">${element.name}</div>
            <div class="price">${element.price.toLocaleString()}</div>
            <button onclick="addToCart(${key})">Add To Cart</button>
        `
        list.appendChild(newDiv);
    });
}
initApp();

function addToCart(key) {
    if (listCards[key] == null) {
        listCards[key] = products[key];
        listCards[key].quantity = 1;
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let amount = 0;
    let sum = 0;

    listCards.forEach((element, key)=> {
        sum += element.price;
        amount += element.quantity;

        if(element != null) {
            let newLi = document.createElement('li');
            newLi.innerHTML = `
                <img src="assets/images/${element.image}"></img>
                <div>${element.name}</div>
                <div>${element.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${element.quantity - 1})">-</button>
                    <div class="count">${element.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${element.quantity + 1})">+</button>
                </div>
            `
            listCard.appendChild(newLi);
        }
        total.textContent = amount.toLocaleString();
        quantityBody.textContent = sum;
    });
}

function changeQuantity(key, quantity) {
    if(quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
        console.log(listCards[key].price);
        
    }
    reloadCard();
}
