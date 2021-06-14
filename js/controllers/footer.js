(function () {
    'use strict';
    angular
        .module('app')
        .controller('FooterController', ['appService', '$rootScope', function (appService, $rootScope) {
            var vm = this;
            vm.productos = [];
            vm.datosContacto = {};

            _init();

            function _init(){
                _traerNumeroWhatsApp();
            }

            function _traerNumeroWhatsApp(){
                var promisePost = appService.getNumeroWhatsApp();
                promisePost.then(function (d) {
                    var response = d.data;
                    if(response.isOk){
                        vm.datosContacto.NumeroWhatsApp = response.Content.Numero;
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