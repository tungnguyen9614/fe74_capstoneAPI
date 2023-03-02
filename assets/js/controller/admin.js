var callAPI = new CallAPI();
var validation = new Validation();
var imgServer = "";

function getEle(id){
    return document.getElementById(id);
}

function resetForm(){
    getEle("formProduct").reset();
}

function getListData() {
    callAPI
        .fetchList()
        .then(function(result){
            renderData(result.data);
        })
        .catch(function(error){
            console.log(error);
        })
}

getListData()

function renderData(data){
    var contentHTML = "";
    data.forEach(function(item,i){
        contentHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.screen}</td>
                <td>${item.backCamera}</td>
                <td>${item.frontCamera}</td>
                <td>
                    <img width="60" src="${item.img}" alt="">
                </td>
                <td>${item.desc}</td>
                <td>${item.type}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="handleEdit(${item.id})">Edit</button>
                    <button class="btn btn-danger" onclick="handleDelete(${item.id})">Delete</button>
                </td>
            </tr>
        `
    })

    getEle("tblListProduct").innerHTML = contentHTML;
}

/**
 * Add product
 */
getEle("btnAdd").addEventListener("click",function(){
    document.getElementsByClassName("modal-title")[0].innerHTML = "Add product";
    document.getElementsByClassName("modal-footer")[0].innerHTML = `
        <button class="btn btn-success" onclick="handleAdd()">Add</button>
    `
})

function handleAdd(){
    var name = getEle("name").value;
    var price = getEle("priceAdmin").value;
    var screen = getEle("screen").value;
    var backCam = getEle("backCam").value;
    var frontCam = getEle("frontCam").value;
    var desc = getEle("desc").value;
    var type = getEle("type").value;
    var img = "";
    if(getEle("image").files.length >0){
        img = getEle("image").files[0].name;
    }

    var isValid = true;
    isValid &= validation.checkEmpty(name,"nameNoti","(*)Please insert product's name");
    isValid &= validation.checkEmpty(price,"priceNoti","(*)Please insert product's price")
        && validation.checkNumber(price,"priceNoti","(*)Price must be a number");
    isValid &= validation.checkEmpty(screen,"screenNoti","(*)Please insert product's screen");
    isValid &= validation.checkEmpty(backCam,"backCamNoti","(*)Please insert product's back Camera");
    isValid &= validation.checkEmpty(frontCam,"frontCamNoti","(*)Please insert product's front Camera");
    isValid &= validation.checkEmpty(desc,"descNoti","(*)Please insert product's descripstion");
    isValid &= validation.checkEmpty(name,"nameNoti","(*)Please insert product's name");

    if (!isValid) return null;

    var product = new Product("",name, price, screen, backCam, frontCam, img, desc, type);
    callAPI.addProduct(product)
        .then(function(){
            getListData();
            document.getElementsByClassName("close")[0].click();
            resetForm();
        })
        .catch(function(error){
            console.log(error);
        })
}

/**
 * Devare product
 */
function handleDelete(id){
    callAPI.deleteProduct(id)
        .then(function(result){
            getListData();
        })
        .catch(function(error){
            console.log(error);
        })

}

/**
 * Edit Product
 */
function handleEdit(id) {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Edit Product";
    document.getElementsByClassName("modal-footer")[0].innerHTML = `
      <button class="btn btn-success" onclick="handleUpdate(${id})">Update</button>
    `;

    callAPI.getProductByID(id)
        .then(function(result){
            var product = result.data;
            getEle("name").value = product.name;
            getEle("priceAdmin").value = product.price;
            getEle("screen").value = product.screen;
            getEle("backCam").value = product.backCamera;
            getEle("frontCam").value = product.frontCamera;
            getEle("desc").value = product.desc;
            getEle("type").value = product.type;
            imgServer = product.img;
        })
        .catch(function(error){
            console.log(error);
        })
}

/**
 * Update Product
 */
function handleUpdate(id){

    var name = getEle("name").value;
    var price = getEle("priceAdmin").value;
    var screen = getEle("screen").value;
    var backCam = getEle("backCam").value;
    var frontCam = getEle("frontCam").value;
    var desc = getEle("desc").value;
    var type = getEle("type").value;
    var img = "";
    if(getEle("image").files.length >0){
        img = getEle("image").files[0].name;
    }

    if(!img){
        img = imgServer;
    }

    var isValid = true;
    isValid &= validation.checkEmpty(name,"nameNoti","(*)Please insert product's name");
    isValid &= validation.checkEmpty(price,"priceNoti","(*)Please insert product's price")
        && validation.checkNumber(price,"priceNoti","(*)Price must be a number");
    isValid &= validation.checkEmpty(screen,"screenNoti","(*)Please insert product's screen");
    isValid &= validation.checkEmpty(backCam,"backCamNoti","(*)Please insert product's back Camera");
    isValid &= validation.checkEmpty(frontCam,"frontCamNoti","(*)Please insert product's front Camera");
    isValid &= validation.checkEmpty(desc,"descNoti","(*)Please insert product's descripstion");
    isValid &= validation.checkEmpty(name,"nameNoti","(*)Please insert product's name");

    if (!isValid) return null;

    var product = new Product(id,name,price,screen,backCam,frontCam,img,desc,type);
    callAPI
        .updateProduct(product,id)
        .then(function(){
            getListData();
            document.getElementsByClassName("close")[0].click();
            imgServer= "";
           
        })
        .catch(function(error){
            console.log(error);
        });
    resetForm();
}