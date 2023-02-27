function Validation(){
    function showMess(spanID,mess) {
        getEle(spanID).style.display = "block";
        getEle(spanID).innerHTML = mess; 
    }

    function hideMess(spanID) {
        getEle(spanID).style.display = "none";
        getEle(spanID).innerHTML = ""; 
    }

    this.checkEmpty = function(value,spanID,mess){
        if(value ===""){
            showMess(spanID,mess);
            return false;
        }
        hideMess(spanID);
        return true;
    }

    this.checkNumber = function(value,spanID,mess){
        var regex = /^[0-9]+$/;
        if(value.match(regex)){
            hideMess(spanID);
            return true;
        }
        showMess(spanID,mess);
        return false;
    }
}