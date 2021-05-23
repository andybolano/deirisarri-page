function validarNumero(e) {
    var key;
    if (window.event) {
        key = e.keyCode;
    } else if (e.which) {
        key = e.which;
    }
    if (key < 48 || key > 57) {
        if (key == 46 || key == 8) { return true; } else { return false; }
    }
    return true;
}

function validarTexto(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 8) return true;
    patron = /[A-Za-z\s]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}

function validarEmail(email) {
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!expr.test(email))
        document.getElementById("email").value = "";


}

function validarNumeroTarjeta(numero) {
    if (numero.length !== 16) {
        toastr['error']("Verifica el número de la tarjeta");
        $("#numero_tarjeta").focus();
        $("#numero_tarjeta").addClass('input-error');
        return
    } else {
        $("#numero_tarjeta").removeClass('input-error');
    }
}

function validarCcv(numero) {

    if (numero.length !== 3) {
        toastr['error']("Verifica el número CCV");
        $("#ccv").focus();
        $("#ccv").addClass('input-error');
        return
    } else {
        $("#ccv").removeClass('input-error');
    }
}

function format(input) {
    var num = input.value.replace(/\./g, '');
    if (!isNaN(num)) {
        num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
        num = num.split('').reverse().join('').replace(/^[\.]/, '');
        input.value = num;
    } else {
        alert('Solo se permiten numeros');
        input.value = input.value.replace(/[^\d\.]*/g, '');
    }
}


/*
devuelve valores:
0: son iguales.
<0: la primera fecha es menor.
>0: la primera fecha es mayor.
*/
function dateComapreTo(fecha1, fecha2) {
    var temp = new Array();
    temp = fecha1.split("-");
    var f1 = new Date(temp[0], temp[1], temp[2]);
    temp = fecha2.split("-");
    var f2 = new Date(temp[0], temp[1], temp[2]);
    return f1.getTime() - f2.getTime();
}