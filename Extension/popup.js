console.info('si entro');
chrome.storage.sync.get(["status",'user','password'], function(items) {
    if (!chrome.runtime.error) {
      console.log(items);
      console.info(items.status);
      
    }else{
        console.log('Se dio un error al acceder al almacenamiento interno');
        
    }
  });
//Eventos del DOM
document.addEventListener('DOMContentLoaded', function() {
    if(mostrarAlmacen() == false){
        document.getElementById('registro').style.display = 'block';
    }else{
        document.getElementById('muestra').style.display = 'block';
        durante();
    }
    //cargar();
    var link = document.getElementById('enviar');
    // onClick's logic below:
    link.addEventListener('click', function() {
        //nuevaPeticion();
        var name =  document.getElementById('email').value;
        var p1 = document.getElementById('p1').value;
        var p2 = document.getElementById('p2').value;
        if(name != null && p1 !=null && p2 != null){
            if(p1 === p2){
                console.info('Si cumple');
                //crear(name,p1);
                var xhr = new XMLHttpRequest();
                xhr.open("GET", `http:localhost:5000/create/${name}`, true);

                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                xhr.onreadystatechange = function() {//Call a function when the state changes.
                    if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                        // Request finished. Do processing here.
                        console.info('funciono');
                        var respi = JSON.parse(xhr.responseText);
                        console.log(respi.status);
                        
                        if(respi.status == true){
                            
                            cambiarVista();
                            document.getElementById('formulario').reset();
                            almacenar(name,p1);
                            //contar();
                            durante();
                        }

                    }
                }
                xhr.send(); 
}
            }
        //document.getElementById('eso').innerHTML = 'se enviaran los datos';
    });
});
//Cambiar de vista
function cambiarVista(){
    document.getElementById('muestra').style.display = 'block';
    document.getElementById('registro').style.display = 'none';
};
function cambiarVistaInv(){
    document.getElementById('muestra').style.display = 'none';
    document.getElementById('registro').style.display = 'block';
};
//Guardar en local
function almacenar(name,pass){
    chrome.storage.sync.set({'status': true,'user': name,'password':pass}, function() {
        // Notificacion de que se guardo
        console.info('Settings saved');
      });
}
function almacenarInv(){
    chrome.storage.sync.set({'status': false}, function() {
        // Notificacion de que se guardo
        console.info('Settings saved');
      });
}
function mostrarAlmacen(){
    var estado;
    chrome.storage.sync.get(["status",'user','password'], function(items) {
        if (!chrome.runtime.error) {
          console.log(items);
          console.info(items.status);
          estado=items.status;
        }else{
            console.log('Se dio un error al acceder al almacenamiento interno');
            
        }
      });
      console.log(`Estado: ${estado}`);
      
      return estado;
}
//Resetear
function reseteoForm(){
    document.getElementById('emai').value = '';
    document.getElementById('p1').value = "";
    document.getElementById('p2').value = "";
}
//Durante el manejo
function durante(){
    var tabsCount;
    contar();
    mostrarAlmacen();
    var logOut = document.getElementById('cerrar');
    logOut.addEventListener('click', function(){
        console.info('se hizo clic');
        almacenarInv();
        cambiarVistaInv();
        mostrarAlmacen();
    }
)};
function contar(){
    chrome.tabs.query({}, function(foundTabs) {
        tabsCount = foundTabs.length;
        for(var i = 0; i< tabsCount; i++){
            var titulo = foundTabs[i].title.substr(0,13);
            console.info('Titulo: ' + foundTabs[i].title + ' Url: ' + foundTabs[i].url + ' Id: ' + foundTabs[i].id);
            document.getElementById('tabs').innerHTML += `<div id="${i}" class="form-control mb-1" style="font-size: 1em;color:gray;">${titulo + '...'}</div>`
        }
        console.info("tabsCount = " + tabsCount);
    });
}
/*function agregar(){
    var caja = document.getElementById('tabs');
    for()
}*/





//Request
/*
function crear(name,pass){
    var http_request = new XMLHttpRequest();
    http_request.open("POST", `http://localhost:5000/create`, true);
    http_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    http_request.onreadystatechange = function() {
        if (http_request.readyState == 4) {

    // JSON.parse does not evaluate the attacker's scripts.
        var respi = JSON.parse(http_request.responseText);
        
    }
    http_request.send(`name=${name}`);
}

};
*/