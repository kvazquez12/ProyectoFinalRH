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
        document.querySelector('.btn-primary').addEventListener('click', modifyemployee);
    }else{
        window.location.href = "index.html"
    }
    
}
    function modifyemployee() {
        var id = document.getElementById('input-id').value;
        var name = document.getElementById('input-name').value;
        var correo = document.getElementById('input-mail').value;
        var lastn = document.getElementById('input-lastn').value;
        var phone = document.getElementById('input-phone').value;
        var dir = document.getElementById('input-dir').value; 
        
        var data = {
            id_empleado: id,
            nombre: name,
            email: correo,
            apellidos: lastn,
            telefono: phone,
            direccion: dir
        }
        
        axios.put(url + "/empleados/" + id, data, headers)
        .then(function(res) {
            console.log(res);
            alert("Empleado modificado");
        }).catch(function(err) {
            console.log(err);
        })
    
    }