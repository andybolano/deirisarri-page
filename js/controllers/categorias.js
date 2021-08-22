(function () {
    'use strict';
    angular
        .module('app')
        .controller('CategoriasController', ['appService', '$rootScope', '$sce', function (appService, $rootScope, $sce) {
            var vm = this;
            vm.datosCategorias = { categorias: []};

            vm.seleccionarCategoria = function(categoria){
                $rootScope.categoriaSeleccionada = categoria;
            }

            _init();

            function _init(){
                _traerCategorias();
            }

            function _traerCategorias(){
                var promisePost = appService.getCategorias();
                promisePost.then(function (d) {
                    var response = d.data;
                    if(response.isOk){
                        vm.datosCategorias.categorias = response.Content;
                        vm.datosCategorias.categorias = vm.datosCategorias.categorias.sort(function(a,b){ return b.id - a.id; });
                        for (var i = 0; i < vm.datosCategorias.categorias.length; i++) {
                            var nombres = appService.dividirIdiomas(vm.datosCategorias.categorias[i].name);
                            vm.datosCategorias.categorias[i].nombreES = nombres[0];
                            vm.datosCategorias.categorias[i].nombreEN = nombres[1];
                        }

                        $rootScope.categoriaSeleccionada = vm.datosCategorias.categorias[0];
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