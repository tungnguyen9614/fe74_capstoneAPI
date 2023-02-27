function CallAPI (){
    this.fetchList = function(){
        return axios({
            url :"https://63ee04315e9f1583bdba6587.mockapi.io/api/CapstoneAPI",
            method:"GET",
        });
    }

    this.deleteProduct = function(id){
        return axios({
            url : `https://63ee04315e9f1583bdba6587.mockapi.io/api/CapstoneAPI/${id}`,
            method:"DELETE"
        })
    }

    this.addProduct = function(product){
        return axios({
            url: "https://63ee04315e9f1583bdba6587.mockapi.io/api/CapstoneAPI",
            method: "POST",
            data: product
        })
    }

    this.getProductByID = function(id){
        return axios({
            url: `https://63ee04315e9f1583bdba6587.mockapi.io/api/CapstoneAPI/${id}`,
            method: "GET"
        })
    }

    this.updateProduct = function(product){
        return axios({
            url: `https://63ee04315e9f1583bdba6587.mockapi.io/api/CapstoneAPI/${product.id}`,
            method: "PUT",
            data: product
        })
    }
}