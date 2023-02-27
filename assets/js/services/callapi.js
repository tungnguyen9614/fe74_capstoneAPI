function CallAPI (){
    this.fetchList = function(){
        return axios({
            url :"https://63ee04315e9f1583bdba6587.mockapi.io/api/CapstoneAPI",
            method:"GET",
        });
    }
}