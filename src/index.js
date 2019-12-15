//const {createDomElement, addToDom} = require("./utils");
let buttonSelector = null
let loading = false;
let data = null;
let error = null;
let cartItems = [];
let buyCart = document.getElementById("cart")
buyCart.style.display = "none"

function toggleCart(){
  if (buyCart.style.display === "none") {
    buyCart.style.display = "block";
    if(cartItems.length !== 0){
      drawCartCards()
      //addBtnHandlers()
    }
    else{
      let card = document.createElement("div");
      card.innerText = "Cart Empty"
      document.querySelector("#cart").appendChild(card)
    }
  } else {
    document.querySelector("#cart").innerHTML = null
    buyCart.style.display = "none";
  }
}

function btnHandler(btnAttribute, itemId){
  switch(btnAttribute){
    case("buy-now"):      
    break;
    case("add-to-cart"):
    console.log("Add to Cart")     
    addToCart(itemId)
    break;
    case("remove-from-cart"):      
    removeFromCart(itemId)
    break;
  }
}

function addToCart(itemId){
  const cartItem = data.find(item => {
    return item.id == itemId
  })
  cartItems.push(cartItem)
  console.log(cartItems)
  saveToLocalStorage(cartItems)
}

function saveToLocalStorage(cartItems){
  localStorage.setItem("cartdata", JSON.stringify(cartItems))
}

function getFromLocalStorage(){
  if(window.localStorage.length != 0){
    cartItems = JSON.parse(window.localStorage.getItem("cartdata"))
  }  
}

function removeFromCart(itemId){
  const cartItem = data.filter(item => {
    return item.id == itemId
  })
  cartItems.pop(cartItem)
  drawCartCards()
}

function getData(){
  loading = true
  render()
  fetch('http://makeup-api.herokuapp.com/api/v1/products.json?product_type=nail_polish')
  .then(res => res.json())
  .then(json => {
    loading = false
    data = json
    render()
  })
  .catch(e =>{
    loading = false
    error = "Error!"
    render()
  })
}

function spinner(){
  let spinner = document.createElement("div");
  spinner.className = "loader"
  document.querySelector("#app").appendChild(spinner)
}

function drawCard (element, i){
  let card = document.createElement("div");
  let price = document.createElement("h4")
  let pic = document.createElement("img")
  let brand = document.createElement("h3")
  let buyBtn = document.createElement("button")
  let cartBtn = document.createElement("button")
  card.className = "card"
  card.id = element.id
  price.innerText = element.price
  pic.src = element.image_link
  brand.innerText = element.brand
  buyBtn.innerText = "Buy Now"
  buyBtn.type = "submit"
  buyBtn.id = "buy-now"
  cartBtn.innerText = "Add to Cart"
  cartBtn.type = "submit"
  cartBtn.id = "add-to-cart"
  document.querySelector("#app").appendChild(card)
  document.querySelector(`#app > div:nth-child(${i+1})`).appendChild(pic)
  document.querySelector(`#app > div:nth-child(${i+1})`).appendChild(price)
  document.querySelector(`#app > div:nth-child(${i+1})`).appendChild(brand)
  document.querySelector(`#app > div:nth-child(${i+1})`).appendChild(buyBtn)
  document.querySelector(`#app > div:nth-child(${i+1})`).appendChild(cartBtn)
}


function drawCards(){
  data.forEach((element, i) => {
    drawCard(element, i)
  });
}

function drawCartCard(el, i){
  let card = document.createElement("div");
  let pic = document.createElement("img");
  let price = document.createElement("h4");
  let removeBtn = document.createElement("button");  
  card.className = "card-cart"
  price.innerText = el.price
  pic.src = el.image_link 
  removeBtn.innerText = "Remove"
  removeBtn.id = "remove-from-cart"
  removeBtn.type = "submit"
  document.querySelector("#cart").appendChild(card)
  document.querySelector(`#cart > div:nth-child(${i+1})`).appendChild(pic)
  document.querySelector(`#cart > div:nth-child(${i+1})`).appendChild(price)
  document.querySelector(`#cart > div:nth-child(${i+1})`).appendChild(removeBtn)
}

function drawCartCards(){
  cartItems.forEach((el, i) => {
    drawCartCard(el, i)
  });
}

function addBtnHandlers(){
  buttonSelector = document.querySelectorAll("button")
  buttonSelector.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const btnAttribute = e.target.id
      const itemId = e.target.parentNode.id
      btnHandler(btnAttribute, itemId)
    })
  })
}

function renderError(){
  console.log("Error")
}

function render(){
  document.querySelector("#app").innerHTML = null
  if(loading){
    spinner()
  }
  if(data){
    drawCards()
    addBtnHandlers()
  }
  if(error){
    renderError()
  }
}

getData()
getFromLocalStorage()


// 'http://makeup-api.herokuapp.com/'