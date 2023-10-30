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
            window.location.href = "login.html"
        });
        document.querySelector('.btn-primary').addEventListener('click', deletemployee)

    }
    else {
        window.location.href = "index.html"
    }
}

function deletemployee() {
    var id = document.getElementById('input-id').value;
    axios.delete(url + "/empleados/" + id, headers)
    .then(function(res) {
        console.log(res);
        alert("Empleado eliminado");
    }).catch(function(err) {
        console.log(err);
    })

}