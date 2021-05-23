(function() {
    'use strict';
    angular
        .module('app')
        .controller('ContactoController', ['appService', function(appService) {
            var vm = this;
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

        }]);

})();