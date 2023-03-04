function getEle(id){
    return document.getElementById(id);
}
const callApi = new CallAPI();

function getListProduct (){
    var promise = callApi.fetchList()
    promise
    .then((result) => {
        console.log(result.data);
        renderListProduct(result.data);
    }).catch((err) => {
        console.log(err);
    });
}

getListProduct()

function renderListProduct (data){
    var content = "";
    data.forEach(items => {
        content += `
        <div class="col-lg-3">
            <div id="card">
                <div class="card-top d-flex align-items-center justify-content-between">
                    <p class="my-0">In Stock</p>
                </div>
                <div class="card-img">
                    <img id = "cardImg" src="${items.img}" alt="">
                </div>
                <div class="card-bottom">
                    <div id="cardName">${items.name}</div>
                    <div class="cardInfo">
                    <div id="screen">Màn hình : ${items.screen}</div>
                    <div id="backCamera">Camera sau : ${items.backCamera}</div>
                    <div id="frontCamera">Camera trước : ${items.frontCamera}"</div>
                    <div id="desc">Mô tả : ${items.desc}</div>
                    <div id="type">Thể loại : ${items.type}</div>
                    </div>
                    <div class="cardPrice d-flex align-items-center justify-content-between my-3">
                        <div id="price">$${items.price}</div>
                    <button id="btnAddCard" onclick ="AddtoCart(${items.id})">
                        <span>Add</span>
                        <i class="fas fa-chevron-right"></i>
                    </button>
                    </div>
                </div>
            </div>
        </div>
       `
    });
    getEle('cardMain').innerHTML = content;
}

/**
 * Search Product
 */
const getAll = () => {
    getListProduct();
}

const getSamsung = () => {
    let arrSamsung = [];
    let promise =  callApi.fetchList();
    promise
        .then((result)=>{
            let arr = result.data;
            for(let index=0 ; index< arr.length; index++){
                if(arr[index].type === "Samsung"){
                    arrSamsung.push(arr[index]);
                }
            }
            renderListProduct(arrSamsung);
        })
        .catch((error)=>{
            console.log(error);
        })
}

const getIphone = () => {
    let arrIphone = [];
    let promise =  callApi.fetchList();
    promise
        .then((result)=>{
            let arr = result.data;
            for(let index=0 ; index< arr.length; index++){
                if(arr[index].type === "Iphone"){
                    arrIphone.push(arr[index]);
                }
            }
            renderListProduct(arrIphone);
        })
        .catch((error)=>{
            console.log(error);
        })
}

//Cart
const showCart = () => {
    getEle("cart").style.transform = "translateX(0px)";
    getEle("cart").style.transition = "all 0.5s";
    document.querySelector('.cartOverplay').style.display = "block"
}

//Close Cart layout
getEle("closeCart").addEventListener("click",()=>{
    getEle("cart").style.transform = "translateX(1000px)";
    getEle("cart").style.transition = "all 0.5s";
    document.querySelector('.cartOverplay').style.display = "none"
})
document.querySelector('.cartOverplay').addEventListener('click',()=>{
    document.querySelector('.cartOverplay').style.display = "none"
    getEle("cart").style.transform = "translateX(1000px)";
    getEle("cart").style.transition = "all 0.5s";
})

// Add to Cart

let cartList =JSON.parse(localStorage.getItem("CartList")) || [];
updateCart()

function AddtoCart(id) {
    callApi.getProductByID(id)
    .then((result) =>{
        console.log(result.data)
        if(cartList.some((item) => item.id == id)){
            alert("Products already in the cart");
            showCart();
        }else{
            const cartItem = new CartItem(result.data)
            cartItem.id = result.data.id
            cartList.push(cartItem);
            updateCart();
            console.log(cartList);
        }
          
       
    })
    .catch((error) =>{
        console.log(error);
    })
}

function updateCart(){
    renderCartItem();
    renderTotal();
    // Save cart local storage
    localStorage.setItem("CartList",JSON.stringify(cartList));
    
}

function renderCartItem(){
    document.querySelector('.empty-cart').style.display = "none";
    getEle('cardList').innerHTML = "";
    cartList.forEach(item =>{
        let price = parseFloat(item.product.price) * parseFloat(item.quality)
        getEle('cardList').innerHTML += 
        `<div class="cardList">
        <img class="card-list-img" src="${item.product.img}" alt=""> 
         <p class="card-list-name">${item.product.name}</p>
         <div class="btn-number">
           <button class="btn-minimus" onclick = "changeNumber(${item.product.id},false)">
             <i class="fa-solid fa-chevron-left"></i>
           </button>
           <span class="quanlity-number quality${item.product.id}">${item.quality}</span>
           <button class="btn-plus"  onclick= "changeNumber(${item.product.id},true)">
             <i class="fa-solid fa-chevron-right"></i>
           </button>
         </div>
         <p class="card-list-price">
           $${price}
         </p>
         <button class="btn btn-danger" onclick="deleteCart(${item.product.id})">Remove</button>
     </div>`
    })
    
}



// Change number Unit 
function changeNumber(id,action){
    if(cartList !== null){
        let item = cartList.find((item) => item.id == id);
        console.log(item);
        if(item){
            let qualityEle = document.querySelector(`.quality${id}`);
            console.log(qualityEle);
            let quality = parseInt(qualityEle.textContent);
            console.log(quality)
            if(quality >= 10){
                alert("You Can Only Buy 10 Items For Each Product!");
            }
            if(quality > 0 && quality < 11){
                if(action){
                    if(quality < 10){
                        quality += 1;
                        console.log("up")
                    }
                }else{
                    quality -= 1;
                }
                item.quality = quality;
            }
            qualityEle.textContent = item.quality;
            if(quality < 1){
                deleteCart(id);
            }

        }
    }
    updateCart()
}
//  delete to cart 
function deleteCart (id){
    let index = cartList.findIndex((item) => item.id == id);
    console.log(index) 
    if(index !== -1){
        cartList.splice(index,1);
        updateCart()
    }
}
// render Total
function renderTotal (){
    let totalPrice = 0;
    let toltalProduct = 0;
    cartList.find((item) =>{
        totalPrice += parseFloat(item.product.price) * parseFloat(item.quality);
        toltalProduct += item.quality;
    })
    document.querySelector(".total-qty").innerHTML = `${toltalProduct}`;
    document.querySelector(".total").innerHTML = `Toltal : $${totalPrice}`;
}

// Clear Cart 
function clearCart(){
    cartList = [];
    updateCart()
    document.querySelector('.empty-cart').style.display = "block";
}
//  Modal order
const orderPayment = () => {
    document.querySelector('.modal').style.display = "none"
    document.querySelector('.order').style.transform = "translateY(0px)"
    document.querySelector('.order').style.transition = "all 1s"
    totalP =  cartList.reduce((total , cardItem) =>{
        return (total += 
            parseFloat(cardItem.quality) * parseFloat(cardItem.product.price));
    },0);
    getEle('payed').textContent = `$${totalP}`;
}

getEle('btnOK').addEventListener('click',()=>{
    alert("Your order has been placed , Thanks for shopping with us");
    document.querySelector('.order').style.transform = "translateY(-1000px)"
    location.reload()
    clearCart();
    
})

// render
const renderInvoice = (data) => {
    let succes = data.reduce((contentHTML,cartItem) =>{
        let price =
        parseFloat(cartItem.product.price) * parseFloat(cartItem.quality);
        return (contentHTML += `<div class="shipping-items">
        <div class="items-name">
          <span>${cartItem.product.name}<b> x ${cartItem.quality}</b></span>
        </div>
        <div class="items-price">
          <span>${price}</span>
        </div>
        
      </div>
      <hr/>`);
    },"");
    return succes;
}

// buy
const buy = () => {
        document.querySelector(".modal-body").innerHTML = renderInvoice(cartList);
        getToltal();
}
// total Payment 
const getToltal = () => {
   totalP =  cartList.reduce((total , cardItem) =>{
        return (total += 
            parseFloat(cardItem.quality) * parseFloat(cardItem.product.price));
    },0);
    document.querySelector(".pay").textContent = `${totalP}`
}







