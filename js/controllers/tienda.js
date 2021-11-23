(function () {
    'use strict';
    angular
        .module('app')
        .controller('TiendaController', ['appService', '$rootScope', function (appService, $rootScope) {
            var vm = this;
            vm.productos = [];
            vm.subcategorias = [];
            vm.tags = [];
            vm.filtrosProductos = {};
            vm.subCategoriaSeleccionadaAux = null;
            vm.mobile = false;


            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                vm.mobile = true;
            }


            vm.view_producto = function (item) {
            
                    $rootScope.ProductDetail = item;
                    $rootScope.showProduct = true;
              
                    $.fn.fullpage.setMouseWheelScrolling(false);
                    $.fn.fullpage.setAllowScrolling(false);
                   
            };

            vm.getProductos = function () {
                var filtros = vm.getFiltrosProductos();
                var promisePost = appService.getProductosFiltrados(filtros);
                promisePost.then(function (d) {


                    vm.productos = d.data.Content;

                    for (var i = 0; i < vm.productos.length; i++) {
                        var nombres = vm.productos[i].propiedades.nombre.split("//");
                        vm.productos[i].propiedades.nombreES = nombres[0];
                        vm.productos[i].propiedades.nombreEN = nombres[1];

                        var descripcion = vm.productos[i].propiedades.descripcion.split("//");
                        vm.productos[i].propiedades.descripcionES = descripcion[0];
                        vm.productos[i].propiedades.descripcionEN = descripcion[1];
                    }
                }, function (err) {
                    if (err.status == 402) {
                        toastr["error"](err.data.respuesta);
                    } else {
                        toastr["error"]("Ha ocurrido un problema!");
                    }
                });
            }

            vm.impar = function (n) {
                var tipo = (n % 2) ? true : false;
                return tipo;
            }

            vm.par = function (n) {

                var tipo = (n % 2) ? false : true;
                return tipo;
            }

            vm.init = function () {
                vm.getTags();
                vm.watchCategoriaSeleccionada();
            };

            vm.watchCategoriaSeleccionada = function () {
                $rootScope.$watch("categoriaSeleccionada", function (newValue, oldValue) {
                    if (newValue != null) {
                        vm.filtrosProductos.category = newValue.id;
                        vm.filtrosProductos.subcategory = [];
                        vm.getSubCategorias();
                        vm.getProductos();
                    }
                });
            };

            vm.getSubCategorias = function () {
                if ($rootScope.categoriaSeleccionada == null) return;
                var promisePost = appService.getSubCategorias($rootScope.categoriaSeleccionada.id);
                promisePost.then(function (d) {
                    var response = d.data;
                    if (response.isOk) {
                        vm.subcategorias = response.Content;
                        for (var i = 0; i < vm.subcategorias.length; i++) {
                            var nombres = appService.dividirIdiomas(vm.subcategorias[i].name);
                            vm.subcategorias[i].nombreES = nombres[0];
                            vm.subcategorias[i].nombreEN = nombres[1];
                        }
                    }
                }, function (err) {
                    if (err.status == 402) {
                        toastr["error"](err.data.respuesta);
                    } else {
                        toastr["error"]("Ha ocurrido un problema!");
                    }
                });
            };

            vm.getTags = function () {
                var promisePost = appService.getTags();
                promisePost.then(function (d) {
                    var response = d.data;
                    if (response.isOk) {
                        vm.tags = response.Content;
                        for (var i = 0; i < vm.tags.length; i++) {
                            var nombres = appService.dividirIdiomas(vm.tags[i].name);
                            vm.tags[i].nombreES = nombres[0];
                            vm.tags[i].nombreEN = nombres[1];
                        }
                    }
                }, function (err) {
                    if (err.status == 402) {
                        toastr["error"](err.data.respuesta);
                    } else {
                        toastr["error"]("Ha ocurrido un problema!");
                    }
                });
            };

            vm.getFiltrosProductos = function () {
                var tagsIdsSeleccionados = vm.tags.filter(function (o) { return o.seleccionado; }).map(function (o) { return o.id; });
                var subCategoriaIdsSeleccionados = vm.subcategorias.filter(function (o) { return o.seleccionado; }).map(function (o) { return o.id; });
                
                vm.filtrosProductos.tag = tagsIdsSeleccionados;
                vm.filtrosProductos.subcategory = subCategoriaIdsSeleccionados;

                return vm.filtrosProductos;
            };

            vm.estaAgotado = function(id, stocksProducto){
                if(stocksProducto.length > 0){
                    let cantidadTotal = stocksProducto.reduce(function(actual, stock){ 
                        return actual + (stock.cantidad_total != null ? Number(stock.cantidad_total) : 0) 
                    }, 0);
                    if(cantidadTotal > 0) return false;
                }

                return true;
            };


        }]);
})();