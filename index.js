const baseUrl = 'http://localhost:3000/burgers';
let burgerMenu = document.querySelector('#burger-menu');
let orderList = document.querySelector('#order-list');
let newForm = document.querySelector('#custom-burger');

document.addEventListener("DOMContentLoaded", () => {
  //Implement Your Code Here
  fetchBurgers();
  listenToForm();
})

function fetchBurgers() {
  fetch(baseUrl)
  .then(res => res.json())
  .then(function(result){
    result.forEach(function(burger){
      showBurger(burger);
    })
  })
}

function showBurger(burger){
  let div = document.createElement('div');
  let orderBtn = document.createElement('button')
  div.setAttribute('class', 'burger');
  div.innerHTML = `
  <h3 class="burger_title">${burger['name']}</h3>
    <img src=${burger['image']} alt=${burger['name']}>
    <p class="burger_description">
      ${burger['description']}
    </p>
  `
  orderBtn.setAttribute('class', 'button');
  orderBtn.textContent = 'Add to Order';
  div.append(orderBtn);
  burgerMenu.append(div);
  orderBtn.addEventListener('click', function(event){
    addToOrder(event);
  })
}

function addToOrder(event) {
  const burgerDiv = event.target.parentElement;
  const burgerTitle = burgerDiv.querySelector('.burger_title').textContent;
  let li = document.createElement('li')
  li.textContent = burgerTitle;
  orderList.append(li);
}

function listenToForm() {
  newForm.addEventListener('submit', function(event){
    let form = event.target;
    let newBurger = {
      'name': form.name.value,
      'description': form.description.value, 
      'image': form.url.value
    }
    fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify(newBurger)
    })
    .then(res => res.json())
    .then(function(result){
      showBurger(result);
    })
  })
}
