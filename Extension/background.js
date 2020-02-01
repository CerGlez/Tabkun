chrome.tabs.onCreated.addlistener(function(tab){
    var xhr = new XMLHttpRequest();
    xhr.open('GET',`http://localhost:5000/window/change/${tab}`);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            console.info('Se ha hecho un cambio');
        }
    }
    xhr.send();
});