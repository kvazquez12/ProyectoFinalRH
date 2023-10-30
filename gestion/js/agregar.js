window.onload = init
var headers = {};
var url = "http://localhost:3000";
function init () {
    if(localStorage.getItem("token")) {  
        token = localStorage.getItem("token");
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }  
        
        document.querySelector('.btn-secondary').addEventListener('click', function() {
            window.location.href = "login.html";
        });
        document.querySelector('.btn-primary').addEventListener('click', addemployee);
    }else{
        window.location.href = "index.html"
    }
    
}
    function addemployee() {
        var name = document.getElementById('input-name').value;
        var correo = document.getElementById('input-mail').value;
        var lastn = document.getElementById('input-lastn').value;
        var phone = document.getElementById('input-phone').value;
        var dir = document.getElementById('input-dir').value; 
        
        var data = {
            nombre: name,
            email: correo,
            apellidos: lastn,
            telefono: phone,
            direccion: dir
        }
        axios.post(url + "/empleados", data, headers)
        .then(function(res) {
            console.log(res);
            alert("Empleado agregado");
        }).catch(function(err) {
            console.log(err);
        })
    
    }