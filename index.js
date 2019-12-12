//const {createDomElement, addToDom} = require("./utils");
let loading = false;
let data = null;
let error = null;


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
  price.innerText = element.price
  pic.src = element.image_link
  brand.innerText = element.brand
  buyBtn.innerText = "Buy Now"
  cartBtn.innerText = "Add to Cart"
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


// 'http://makeup-api.herokuapp.com/'