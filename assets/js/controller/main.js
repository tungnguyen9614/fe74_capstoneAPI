function getEle(id){
    return document.getElementById(id);
}
const callApi = new CallAPI();

function getListProduct (){
    var promise = callApi.fetchList()
    promise
    .then((result) => {
        console.log(result.data)
        renderListProduct(result.data)
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
                    <i class="fab fa-apple"></i>
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
                    <button id="btnAddCard">
                        Add card
                    </button>
                    </div>
                </div>
            </div>
        </div>
       `
    });
    getEle('cardMain').innerHTML = content;
}

