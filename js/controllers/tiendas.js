(function () {
    'use strict';
    angular
        .module('app')
        .controller('TiendasController', ['appService', '$rootScope', '$sce', function (appService, $rootScope, $sce) {
            var vm = this;
            vm.datosTiendas = {};

            _init();

            function _init(){
                _traerTiendas();
            }

            function _traerTiendas(){
                var promisePost = appService.getTiendas();
                promisePost.then(function (d) {
                    var response = d.data;
                    if(response.isOk){
                        vm.datosTiendas.tiendasES = $sce.trustAsHtml(appService.dividirIdiomas(response.Content.tiendas)[0]);
                        vm.datosTiendas.tiendasEN = $sce.trustAsHtml(appService.dividirIdiomas(response.Content.tiendas)[1]);
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