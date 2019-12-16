const {createDomElement, addToDom} = require("./utils");
let buttonSelector = null
let loading = false;
let data = null;
let error = null;
let cartItems = [];

const buyCart = document.getElementById("cart")
buyCart.addEventListener("click", (e) =>{
  console.log("Toggle Cart")
  toggleCart()
})

function toggleCart(){
  drawCartCards()
}

// function toggleCart(){
//   if (cart.style.display === "none") {
//     buyCart.style.display = "block";
//     if(cartItems.length !== 0){
//       drawCartCards()
//     }
//     else{
//       let card = document.createElement("div");
//       card.innerText = "Cart Empty"
//       document.querySelector("#cart-items").appendChild(card)
//     }
//   } else {
//     document.querySelector("#cart-items").innerHTML = null
//   }
// }

function addToCart(itemId){
  const cartItem = data.find(item => {
    return item.id == itemId
  })
  cartItems.push(cartItem)
  saveToLocalStorage(cartItems)
}

function saveToLocalStorage(cartItems){
  localStorage.setItem("cartdata", JSON.stringify(cartItems))
}

function getFromLocalStorage(){
  for(i=0; i < window.localStorage.length; i++){
    if(window.localStorage.key(i) === "cartdata"){
      cartItems = JSON.parse(window.localStorage.getItem("cartdata"))
    }
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
  const price = createDomElement("h4", {innerText: element.price})
  const pic = createDomElement("img", {src: element.image_link})
  const brand = createDomElement("h3", {innerText:element.brand})
  let buyBtn = document.createElement("button")
  let cartBtn = document.createElement("button")
  card.className = "card"
  card.id = element.id
  buyBtn.innerText = "Buy Now"
  buyBtn.type = "submit"
  buyBtn.addEventListener("click", () =>{
    console.log("I will buy now", element.id)
  })
  cartBtn.innerText = "Add to Cart"
  cartBtn.type = "submit"
  cartBtn.addEventListener("click", () =>{  
    addToCart(element.id)
  })
  
  addToDom("#app", card)
  Array.from([pic, price, brand, buyBtn, cartBtn]).forEach(content =>{
  addToDom(card, content)
  })
  // addToDom(card, pic)
  // card.appendChild(price)
  // card.appendChild(brand)
  // card.appendChild(buyBtn)
  // card.appendChild(cartBtn)
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
  card.className = "cart-card"
  price.innerText = el.price
  pic.src = el.image_link 
  removeBtn.innerText = "Remove"
  removeBtn.type = "submit"
  removeBtn.addEventListener("click", () =>{  
    removeFromCart(el.id)
  })
  document.querySelector("#cart-items").appendChild(card)
  document.querySelector(`#cart-items > div:nth-child(${i+1})`).appendChild(pic)
  document.querySelector(`#cart-items > div:nth-child(${i+1})`).appendChild(price)
  document.querySelector(`#cart-items > div:nth-child(${i+1})`).appendChild(removeBtn)
}

function drawCartCards(){
  cartItems.forEach((el, i) => {
    drawCartCard(el, i)
  });
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
  }
  if(error){
    renderError()
  }
}

getData()
getFromLocalStorage()


// 'http://makeup-api.herokuapp.com/'