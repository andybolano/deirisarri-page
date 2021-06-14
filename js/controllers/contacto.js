(function() {
    'use strict';
    angular
        .module('app')
        .controller('ContactoController', ['appService', '$sce', function(appService, $sce) {
            var vm = this;
            vm.datosContacto= {};
            vm.data = {
                nombre: "",
                email: "",
                tema: "",
                mensaje: ""
            }

            vm.enviar = function() {
                if (vm.data.nombre == "") {
                    swal(
                        'Oops...',
                        'Ingresar nombre!',
                        'error'
                    )
                    return;
                }
                if (vm.data.email == "") {
                    swal(
                        'Oops...',
                        'Ingresar email!',
                        'error'
                    )
                    return;
                }
                if (vm.data.tema == "") {
                    swal(
                        'Oops...',
                        'Ingresar tema!',
                        'error'
                    )
                    return;
                }
                if (vm.data.mensaje == "") {
                    swal(
                        'Oops...',
                        'Ingresar mensaje!',
                        'error'
                    )
                    return;
                }

                var promisePost = appService.sendMessage(vm.data);
                promisePost.then(function(d) {
                    swal(
                        'Enviando',
                        'Gracias por tu mensaje!',
                        'success'
                    )
                    vm.data = {};

                }, function(err) {
                    if (err.status == 402) {
                        console.log(err.data.respuesta);
                    } else {
                        console.log("Ha ocurrido un problema!");
                    }
                });


            }

            _init();

            function _init(){
                _traerContacto();
            }

            function _traerContacto(){
                var promisePost = appService.getContacto();
                promisePost.then(function (d) {
                    var response = d.data;
                    if(response.isOk){
                        vm.datosContacto.ContactoES = $sce.trustAsHtml(response.Content.ContactoES);
                        vm.datosContacto.ContactoEN = $sce.trustAsHtml(response.Content.ContactoEN);
                    }
                }, function (err) {
                    if (err.status == 402) {
                        toastr["error"](err.data.respuesta);
                    } else {
                        toastr["error"]("Ha ocurrido un problema!");
                    }
                });
            }

        }]);

})();