(function () {
    'use strict';
    angular
        .module('app')
        .controller('CarritoController', ['appService', '$scope', '$rootScope', 'ubicacionService', function (appService, $scope, $rootScope, ubicacionService) {
            var vm = this;
            vm.anios = [];


            $rootScope.ciudades = [];
            $rootScope.paises = [];

            vm.Cliente = {
                identificacion: "",
                email: "",
                nombres: "",
                apellidos: "",
                pais: "",
                ciudad: "",
                direccion: "",
                telefono: ""
            };
            vm.envioa = true;
            vm.terminos = false;
            vm.envio = 0;
            vm.mobile = false;
            vm.descuento = 0;
            vm.filtroCodigoDescuento = {codigo : ""};
            vm.codigoDescuento = null;

            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                vm.mobile = true;
            }

            jQuery("#cbox_recogerLocal").attr('checked', true);

            var fecha = new Date();
            var ano = fecha.getFullYear();
            vm.Pago = {
                num_cuotas: 1,
                mes: "01",
                metodo: "VISA",
                anio: '' + ano + ''
            }

            vm.anios[0] = ano;

            for (var i = 1; i <= 11; i++) {
                vm.anios.push(ano + i);
            }

            if (!localStorage.getItem('cart')) {

            } else {
                if (vm.mobile) {
                    $("#XMLID_1_m").html($rootScope.Carrito.length);
                } else {
                    $("#XMLID_1_").html($rootScope.Carrito.length);
                }

            }


            vm.verCarrito = function () {
                if ($('#spanish').hasClass('active-lang')) {
                    (function () {
                        $("[data-translate]").jqTranslate('js/traductor/lang', {
                            defaultLang: 'en',
                            forceLang: "es",
                            asyncLangLoad: false
                        });
                    })();
                } else {
                    (function () {
                        $("[data-translate]").jqTranslate('js/traductor/lang', {
                            defaultLang: 'es',
                            forceLang: "en",
                            asyncLangLoad: false
                        });
                    })();
                }

                if (!localStorage.getItem('cart')) {
                    swal(
                        'Oops!',
                        'Aun no has agregado ningun producto al carrito!',
                        'error'
                    )
                    return

                } else {

                    var data = JSON.parse(localStorage.getItem('cart'));

                    if (data.length == 0) {
                        swal(
                            'Oops!',
                            'Aun no has agregado ningun producto al carrito!',
                            'error'
                        )
                        return
                    }
                    open_modal();
                    document.getElementById("overlay").style.display = "block";
                    document.getElementById("modal_carrito").style.display = "block";


                }

                vm.getPaises();

            }

            vm.getPaises = function () {

                ubicacionService.getPaises().then(success, error);

                function success(d) {


                    $rootScope.paises = d.data;

                    for (var i = 0; i < $rootScope.paises.length; i++) {
                        $("#pais").append("<option value='" + d.data[i].id + "'>" + d.data[i].name + "</option>");
                    }

                    document.getElementById('pais').value = "47";
                    vm.getCiudades();

                }

                function error(error) {
                    toastr.error("Problemas de conexion, por favor recargar pagina");
                }
            }

            vm.getCiudades = function () {



                $("#ciudad").empty();
                ubicacionService.getCiudades(document.getElementById('pais').value).then(success, error);

                function success(d) {
                    $rootScope.ciudades = d.data;
                    for (var i = 0; i < d.data.length; i++) {
                        $("#ciudad").append("<option value='" + d.data[i].id + "'>" + d.data[i].name + "</option>");
                    }

                    setTimeout(() => {
                        if (document.getElementById('pais').value == "47") {
                            document.getElementById('ciudad').value = '779';
                        }

                        vm.getDepartament();
                    }, 500)

                }

                function error(error) {
                    toastr.error("Problemas de conexion, por favor recargar pagina");
                }
            }


            vm.getDepartament = function () {
                $("#departament").empty();
                ubicacionService.getDepartament(document.getElementById('ciudad').value).then(success, error);

                function success(d) {
                    $rootScope.departament = d.data;
                    for (var i = 0; i < d.data.length; i++) {
                        $("#departament").append("<option value='" + d.data[i].id + "'>" + d.data[i].name + "</option>");
                    }
                }

                function error(error) {
                    toastr.error("Problemas de conexion, por favor recargar pagina");
                }

            };


            vm.getTotal = function () {
                var total = 0;
        
                for (var i = 0; i < $rootScope.Carrito.length; i++) {

                    var product = $rootScope.Carrito[i].producto;
                
                    if ($rootScope.lang == 'es') {
                        total += (product.precio * $rootScope.Carrito[i].cantidad);
                    } else if ($rootScope.lang == 'en') {
                        total += (product.precio_usd * $rootScope.Carrito[i].cantidad);
                    }

                }
                vm.getDescuento();
                return total;
            }

            vm.getDescuento = function () {
                process_descuento().then(val => {
                    vm.descuento = val;
                })
            }

            let process_descuento = async function () {
                try {
                    let descuento_acum = [];
                    let descuentos = [];
                    let cart = $rootScope.Carrito;
                    let productos = await extract_count_by_product(cart);
                    let descuento = 0;

                    for (let i = 0; i < productos.length; i++) {
                        descuentos = productos[i].descuento;
                        descuento = 0;
                        for (let x = 0; x < descuentos.length; x++) {

                            if (productos[i].cantidad >= parseInt(descuentos[x].cantidad)) {
                                if ($rootScope.lang == 'es') {
                                    descuento = (productos[i].precio * productos[i].cantidad) * (descuentos[x].descuento / 100);
                                } else {
                                    descuento = (productos[i].precio_usd * productos[i].cantidad) * (descuentos[x].descuento / 100);
                                }
                            }
                        }

                        descuento_acum.push(descuento);

                        var descuentoPorCodigo = 0;
                        if(vm.codigoDescuento != null){
                            if ($rootScope.lang == 'es') {
                                descuentoPorCodigo = (productos[i].precio * productos[i].cantidad) * (vm.codigoDescuento.percentage / 100);
                            } else {
                                descuentoPorCodigo = (productos[i].precio_usd * productos[i].cantidad) * (vm.codigoDescuento.percentage / 100);
                            }

                            if(descuentoPorCodigo > 0){
                                descuento_acum.push(descuentoPorCodigo);
                            }
                        }
                    }

                    let total = 0;

                    for (let i = 0; i < descuento_acum.length; i++) {
                        total += descuento_acum[i];
                    }


                    return parseInt(total);
                } catch (e) {
                    // error
                    console.log(e);
                }
            }

            function extract_count_by_product(cart) {

                return new Promise(resolve => {
                    let productos = [];
                    for (let i = 0; i < cart.length; i++) {
                        let index = productos.findIndex(item => item.producto == cart[i].producto.id);
                        if (index == -1) {

                            productos.push({ precio_usd: cart[i].producto.precio_usd, precio: cart[i].producto.precio, producto: cart[i].producto.id, cantidad: cart[i].cantidad, descuento: cart[i].descuento, compra_min: cart[i].producto.compra_min });
                        } else {
                            productos[index].cantidad += cart[i].cantidad;
                        }
                    }
                    resolve(productos);
                });
            }

            let get_products_by_count = async function (cart) {
                let list = await extract_count_by_product(cart);
                return list;
            }

            vm.closeCarrito = function () {
                $.fn.fullpage.setAllowScrolling(true);
                $.fn.fullpage.setKeyboardScrolling(true)
                document.getElementById("overlay").style.display = "none";
                document.getElementById("modal_carrito").style.display = "none";

            }

            vm.eliminarProducto = function (index) {
                $rootScope.Carrito.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify($rootScope.Carrito));
                $("#XMLID_1_").html($rootScope.Carrito.length);

                if ($rootScope.Carrito.length == 0) {
                    vm.closeCarrito();
                }
            }

            vm.pay = function () {



                if ($rootScope.lang == 'es') {
                    if ((vm.getTotal() < $rootScope.Envio.valor_min_cop)) {
                        swal({
                            position: 'center',
                            type: "warning",
                            title: "Revisa tu carrito!",
                            text: "Su pedido no supera el valor minimo de compra!",
                            showConfirmButton: false,
                            timer: 3500
                        })
                        return;
                    }
                }

                if ($rootScope.lang == 'en') {
                    if ((vm.getTotal() < $rootScope.Envio.valor_min_usd)) {
                        swal({
                            position: 'center',
                            type: "warning",
                            title: "check your cart!",
                            text: "Your order does not exceed the minimum purchase value!",
                            showConfirmButton: false,
                            timer: 3500
                        })
                        return;
                    }
                }

                get_products_by_count($rootScope.Carrito).then(val => {

                    for (let i = 0; i < val.length; i++) {
                        if (val[i].cantidad < val[i].compra_min) {
                            swal({
                                position: 'center',
                                type: "warning",
                                title: "Revisa tu carrito!",
                                text: 'para comprar el producto' + $rootScope.Carrito[i].producto.nombreES + 'debes incluir minimo ' + $rootScope.Carrito[i].producto.compra_min + 'unidades',
                                showConfirmButton: false,
                                timer: 3500
                            })
                            return;
                        }
                    }

                })

                if (!vm.Cliente.nit || vm.Cliente.nit == "") {
                    toastr.warning("Ingresar identificacion");
                    return false
                }

                if (!vm.Cliente.email || vm.Cliente.email == "") {
                    toastr.warning("Ingresar email");
                    return false
                }

                if (!vm.Cliente.nombres || vm.Cliente.nombres == "") {
                    toastr.warning("Ingresar nombres");
                    return false
                }

                if (!vm.Cliente.apellidos || vm.Cliente.apellidos == "") {
                    toastr.warning("Ingresar apellidos");
                    return false
                }

                if (!vm.Cliente.direccion || vm.Cliente.direccion == "") {
                    toastr.warning("Ingresar direccion");
                    return false
                }

                if (!vm.Cliente.telefono || vm.Cliente.telefono == "") {
                    toastr.warning("Ingresar telefono");
                    return false
                }

                if (!$('#cbox_terminos').prop('checked')) {
                    toastr.warning("Aceptar terminos y condiciones");
                    return false
                }

                var productos = []

                for (var i = 0; i < $rootScope.Carrito.length; i++) {
                    productos.push({
                        'producto': parseInt($rootScope.Carrito[i].producto.id),
                        'color': $rootScope.Carrito[i].color.nombre,
                        'talla': $rootScope.Carrito[i].talla,
                        'cantidad': $rootScope.Carrito[i].cantidad
                    })
                }


                let pais = $rootScope.paises.find(pais => {
                    return pais.id == parseInt(document.getElementById('pais').value);
                })

                vm.Cliente.pais = pais.name;

                let ciudad = $rootScope.ciudades.find(ciudad => {
                    return ciudad.id == parseInt(document.getElementById('ciudad').value);
                })

                vm.Cliente.ciudad = ciudad.name;

                if (document.getElementById('departament').value) {
                    let dep = $rootScope.departament.find(departament => {
                        return departament.id == parseInt(document.getElementById('departament').value);
                    })


                    vm.Cliente.ciudad += "," + dep.name;
                }


                if (!vm.Cliente.pais || vm.Cliente.pais == "") {
                    toastr.warning("Ingresar pa¨ªs");
                    return false
                }

                if (!vm.Cliente.ciudad || vm.Cliente.ciudad == "") {
                    toastr.warning("Ingresar ciudad");
                    return false
                }

                var object = {
                    cliente: vm.Cliente,
                    productos: productos,
                    envio: vm.envio,
                    descuento: vm.descuento,
                    referenceCode: "dir" + addControl()
                }


                appService.pay(object).then(success, error);

                function success(d) {
                    if (d.data.result) {

                        const apiKey = d.data.Content.apiKey;
                        const merchantId = d.data.Content.merchantId;
                        const referenceCode = object.referenceCode;
                        const accountId = d.data.Content.accountId;
                        
                        
                        /*const apiKey = '4Vj8eK4rloUd272L48hsrarnUA';
                        const merchantId = '508029';
                        const referenceCode = object.referenceCode;
                        const accountId = '512321';*/
                        
                        
                        const total = vm.getTotal() - vm.descuento + vm.envio;

                        let currency = "COP";

                        if ($rootScope.lang == 'es') {
                            currency = "COP";
                        } else if ($rootScope.lang == 'en') {
                            currency = "USD";
                        }




                        var signature = String(CryptoJS.MD5(apiKey + "~" + merchantId + "~" + referenceCode + "~" + total + "~" + currency));
                        const url_test = 'https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu';
                        const url = 'https://checkout.payulatam.com/ppp-web-gateway-payu/';

                        var text = "";
                        text += '<form method="post" action="'+url+'">';
                        text += '<input name="merchantId" type="hidden" value="' + merchantId + '">';
                        text += '<input name="accountId" type="hidden" value="' + accountId + '">';
                        text += '<input name="ApiKey" type="hidden" value="' + apiKey + '">';
                        text += '<input name="description" type="hidden" value="Compra Deirisarri">';
                        text += '<input name="referenceCode" type="hidden" value="' + referenceCode + '">';
                        text += '<input name="amount" type="hidden" value="' + total + '">';
                        text += '<input name="tax" type="hidden" value="0">';
                        text += '<input name="taxReturnBase" type="hidden" value="0">';
                        text += '<input name="signature" type="hidden" value="' + signature + '">';
                        text += '<input name="currency" type="hidden" value="' + currency + '">';
                        text += '<input name="buyerFullName" type="hidden" value="' + vm.Cliente.nombres + ' ' + vm.Cliente.apellidos + '">';
                        text += '<input name="buyerEmail" type="hidden" value="' + vm.Cliente.email + '">';
                        text += '<input name="shippingAddress" type="hidden" value="' + vm.Cliente.direccion + '">';
                        text += '<input name="shippingCity" type="hidden" value="' + vm.Cliente.ciudad + '">';
                        text += '<input name="shippingCountry" type="hidden" value="' + vm.Cliente.pais + '">';
                        text += '<input name="telephone" type="hidden" value="' + vm.Cliente.telefono + '">';
                        text += '<input name="test" type="hidden"  value="0" >';
                        text += '<input name="responseUrl" type="hidden" value="https://deirisarri.co/pagos/response.php">';
                        text += '<input name="confirmationUrl" type="hidden" value="https://deirisarri.co/api/public/api/pay/confirmation">';
                        text += '<input name="Submit" type="submit" id="buy" value="REALIZAR PAGO" class="button comprar finalizar" data-translate="finalizarCompra">';
                        text += '</form>';

                        $('#buttonPay').html(text);



                        vm.Cliente = {
                            identificacion: "",
                            email: "",
                            nombres: "",
                            apellidos: "",
                            pais: "",
                            ciudad: "",
                            direccion: "",
                            telefono: ""
                        }

                        $rootScope.Carrito = [];
                        localStorage.removeItem('cart')

                        $('#modalConfirm').show()


                    }
                }

                function error(error) {
                    toastr.error("Problemas de conexion, no se pudo realizar la compra");
                }


            }

            $('input:radio[name=envio]').change(function () {

                if (this.value == 'CO') {
                    if ($rootScope.lang == 'es') {
                        vm.envio = parseInt($rootScope.Envio.envioCO);
                    } else if ($rootScope.lang == 'en') {
                        vm.envio = parseFloat($rootScope.Envio.envioCO_usd);
                    }

                }
                if (this.value == 'IN') {
                    if ($rootScope.lang == 'es') {
                        vm.envio = parseInt($rootScope.Envio.envioIN);
                    } else if ($rootScope.lang == 'en') {
                        vm.envio = parseFloat($rootScope.Envio.envioIN_usd);
                    }

                }
                if (this.value == 'LO') {

                    vm.envio = 0;

                }
                if (this.value == 'BO') {

                    if ($rootScope.lang == 'es') {
                        vm.envio = parseInt($rootScope.Envio.envioBO);
                    } else if ($rootScope.lang == 'en') {
                        vm.envio = parseFloat($rootScope.Envio.envioBO_usd);
                    }

                }


            });

            function addZero(x, n) {
                while (x.toString().length < n) {
                    x = "0" + x;
                }
                return x;
            }

            function addControl() {
                var d = new Date();
                var x = document.getElementById("demo");
                var h = addZero(d.getHours(), 2);
                var m = addZero(d.getMinutes(), 2);
                var s = addZero(d.getSeconds(), 2);
                var ms = addZero(d.getMilliseconds(), 3);
                return h + "" + m + "" + s + "" + ms;
            }

            vm.getCodigoDescuento = function(){
                appService.getCodigoPromocional(vm.filtroCodigoDescuento.codigo).then(success, error);

                function success(d) {
                    var response = d.data;
                    if(response.isOk){
                        vm.filtroCodigoDescuento.codigo = "";
                        vm.codigoDescuento = response.Content;
                        toastr.success(response.Mensaje);
                    }
                    else{
                        toastr.error(response.Mensaje);
                    }
                }

                function error(error) {
                    if ($rootScope.lang == 'es') {
                        toastr.error("Se ha producido un error por favor intente nuevamente");
                    }
                    if ($rootScope.lang == 'en') {
                        toastr.error("An error has occurred please try again");

                    }
                }
                
            };

            vm.eliminarCodigoDescuento = function(){
                vm.codigoDescuento = null;
                if ($rootScope.lang == 'es') {
                    toastr.success("Se ha quitado el cÃ³digo de descuento");
                }
                if ($rootScope.lang == 'en') {
                    toastr.success("Discount code has been removed");

                }
            };

        }]);

})();

$("input").focus(function () {
    $(this).removeClass('input-error');
});