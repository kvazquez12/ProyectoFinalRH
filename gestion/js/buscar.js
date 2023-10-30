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
            window.location.href = "gestion.html"
        });
        document.querySelector('.btn-primary').addEventListener('click', seekndestroy)

    }
    else {
        window.location.href = "index.html"
    }
}

function seekndestroy() {
    var nombre = document.getElementById('input-name').value;
    axios.get(url + "/empleados/" + nombre, headers)
    .then(function(res) {
        displayEmpleado(res.data.message);
    }).catch(function(err) {
        console.log(err);
    })

    function displayEmpleado(empleados) {
        var body = document.querySelector("body");
        for (var i = 0; i<empleados.length; i++) {
            body.innerHTML += `<br><br><br>`
            body.innerHTML += `<h6>ID: ${empleados[i].id_empleado} <br>NOMBRE: ${empleados[i].nombre} <br>APELLIDOS: ${empleados[i].apellidos} <br>TELEFONO: ${empleados[i].telefono}</h6>`
            body.innerHTML += `<h6> CORREO: ${empleados[i].email} <br>DIRECCION: ${empleados[i].direccion} </h6>`
        }
    }
}