(function () {
    'use strict';
    angular
        .module('app')
        .controller('TiendaController', ['appService', '$rootScope', function (appService, $rootScope) {
            var vm = this;
            vm.productos = [];
            vm.Producto = {};
            vm.colorSelected = "0";
            vm.colorFilter = "";
            vm.tallaSelected = '';
            vm.carrito = [];
            vm.mobile = false;
            vm.disponible = false;
            vm.subcategorias = [];
            vm.tags = [];
            vm.filtrosProductos = {};
            vm.subCategoriaSeleccionadaAux = null;

            var $carousel;


            $carousel = $('.carousel-store').flickity({
                lazyLoad: true,
                percentPosition: true,
                prevNextButtons: false,
                initialIndex: 0
            });

            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                vm.mobile = true;
            }

            if (!localStorage.getItem('cart')) {

            } else {
                var carrito = [];
                carrito = JSON.parse(localStorage.getItem('cart'));
                $("#XMLID_1_").html(carrito.length);
            }

            vm.view_producto = function (item) {
                //$('#menu-footer').hide();

                if (!$carousel.flickity()) {

                } else {
                    $carousel.flickity('destroy');
                }

                $("#color").css("background-color", '#FFF');
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


                vm.colorSelected = "0";
                vm.colorFilter = "";
                localStorage.setItem('producto', JSON.stringify(item));

                $.fn.fullpage.moveSlideLeft();
                vm.Producto = JSON.parse(localStorage.getItem('producto'));

                if (vm.mobile) {
                    setCarousel(vm.Producto.imagenes_moviles, 'mobile');
                } else {
                    setCarousel(vm.Producto.imagenes, 'desktop');
                }


                setTimeout(() => {
                    $carousel = $('.carousel-store').flickity({
                        lazyLoad: true,
                        percentPosition: true,
                        prevNextButtons: false,
                        initialIndex: 0
                    });


                    vm.selectTalla(vm.Producto.tallas[0].id_talla);

                }, 500);
            };

            const setCarousel = (data, type) => {

             let text = "";
             
             if(data === null){
                 return;
             }

            for (let i = 0; i < data.length; i++) {
                    const color = getIdColor(data[i].color);
                    text += '<div class="carousel-cell-store" id="element-' + color + '">';
                    if($rootScope.lang === 'es'){
                        text += ' <div class="agotado agotado-prenda-' + color + '"" id="agotado' + i + '">AGOTADO</div>';
                    }else{
                        text += ' <div class="agotado agotado-prenda-' + color + '"" id="agotado' + i + '">OUT OF STOCK</div>';
                    }
                    text += '<img class="carousel-cell-image-store" data-flickity-lazyload="' + data[i].url + '" alt="tulip" style="height:100%"  />';
                    text += '</div>';
            }


              type === 'mobile' ?  $('#elementos-productos-movil').html(text) :  $('#elementos-productos-pc').html(text);

            }
 
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

            vm.color = function () {

                /*if (!vm.tallaSelected || vm.tallaSelected == "") {
                    $("#colorSel").val("0");
                    toastr['warning']('Por favor seleccionar talla!');
                    return;
                }*/
                if (vm.colorSelected === 0) {
                    return;
                }

                    $carousel.flickity('destroy');

                    if (vm.mobile) {
                        setCarousel(vm.Producto.imagenes_moviles, 'mobile');
                    } else {
                        setCarousel(vm.Producto.imagenes, 'desktop');
                    }

                    var dataColor = (JSON.parse(vm.colorSelected));
                    $("#color").css("background-color", dataColor.color);

                    vm.colorFilter = dataColor.id_color;
                      
                    if (vm.mobile) {
                        for (var i = 0; i < vm.Producto.imagenes_moviles.length; i++) {
                            const colorProduct = getIdColor(vm.Producto.imagenes_moviles[i].color);
                            if (vm.colorFilter !== colorProduct) {
                                $('#element-' + colorProduct).remove();
                            }
                        }
                    } else {
                        for (var i = 0; i < vm.Producto.imagenes.length; i++) {
                            const colorProduct = getIdColor(vm.Producto.imagenes[i].color);
                        
                            if (vm.colorFilter !== colorProduct) {
                                $('#element-' + colorProduct).remove();
                            }
                        }
                    }
                    setTimeout(function () {
                        $carousel = $('.carousel-store').flickity({
                            lazyLoad: true,
                            percentPosition: true,
                            prevNextButtons: false,
                            initialIndex: 0
                        });
                    }, 100);

                    vm.verificarDisponible();
                 


            }


            vm.verificarDisponible = function () {
                vm.disponible = false;
                if (vm.tallaSelected == '' || !vm.tallaSelected) {
                    return;

                }

                if (vm.colorSelected == '' || !vm.colorSelected || vm.colorSelected == 0) {
                    return;
                }

                var color = (JSON.parse(vm.colorSelected));



                for (var i = 0; i < vm.Producto.sotck.length; i++) {
                    if (vm.Producto.sotck[i].id_color == color.id_color && vm.Producto.sotck[i].id_talla == vm.tallaSelected && parseInt(vm.Producto.sotck[i].cantidad_total) > 0) {
                        vm.disponible = true;
                        break;
                    }
                }

                $('.agotado').css("display", "none");
                if (!vm.disponible) {
                    $('.agotado-prenda-' + color.id_color).css("display", "block");
                }
            }


            vm.selectTalla = function (talla) {

                $('.box-talla').removeClass('active');
                $('#talla_' + talla).addClass('active');
                vm.tallaSelected = talla;
                vm.verificarDisponible();
            }

            vm.back = function () {
                vm.tallaSelected = '';
                $carousel.flickity('destroy');
                $("#color").css("background-color", '#FFF')
                $.fn.fullpage.moveSlideRight();
              //  $('#menu-footer').show();
            }


            vm.impar = function (n) {
                var tipo = (n % 2) ? true : false;
                return tipo;
            }

            vm.par = function (n) {

                var tipo = (n % 2) ? false : true;
                return tipo;
            }


            const getIdColor = (colorName) =>{
                return vm.Producto.colores.find(item => sanitizeColor(item.nombre) === sanitizeColor(colorName)).id_color;
            }

            vm.addCart = function () {

                if (vm.colorSelected == 0) {
                    toastr['warning']('Seleccionar un color');
                    return;
                }

                if (!vm.tallaSelected || vm.tallaSelected == "") {
                    toastr['warning']('Seleccionar talla');
                    return;
                }

                if (vm.disponible == false) {
                    toastr['warning']('Producto agotado!');
                    return;
                }
                var imagen = "";
                var talla = "";
                var id_talla = 0;
                var currency = "";


                if ($rootScope.lang == 'es') {
                    currency = 'COP';
                } else if ($rootScope.lang == 'en') {
                    currency = 'USD';
                }






                var color = JSON.parse(vm.colorSelected);
                for (var i = 0; i < vm.Producto.imagenes.length; i++) {
                    if ( color.id_color === getIdColor(vm.Producto.imagenes[i].color)) {
                        imagen = vm.Producto.imagenes[i];
                        break;
                    }
                }

                for (var i = 0; i < vm.Producto.tallas.length; i++) {
                    if (vm.tallaSelected == vm.Producto.tallas[i].id_talla) {
                        talla = vm.Producto.tallas[i].talla;
                        id_talla = vm.Producto.tallas[i].id_talla;
                        break;
                    }
                }
                var producto = {
                    producto: vm.Producto.propiedades,
                    talla: talla,
                    id_talla: id_talla,
                    color: color,
                    imagen: imagen,
                    cantidad: 1,
                    currency: currency,
                    descuento: vm.Producto.descuentos

                };

                if (!localStorage.getItem('cart')) {

                    $rootScope.Carrito = producto;
                    localStorage.setItem('cart', JSON.stringify([producto]));
                    swal({
                        position: 'center',
                        type: 'success',
                        title: 'Producto agregado al carrito de compras',
                        showConfirmButton: false,
                        timer: 1500
                    })



                } else {
                    $rootScope.Carrito.push(producto);
                    localStorage.setItem('cart', JSON.stringify($rootScope.Carrito));
                    swal({
                        position: 'center',
                        type: 'success',
                        title: 'Producto agregado al carrito de compras',
                        showConfirmButton: false,
                        timer: 1500
                    })


                }
                // $.fn.fullpage.moveSlideRight();
                $rootScope.Carrito = JSON.parse(localStorage.getItem('cart'));
                if (vm.mobile) {
                    $("#XMLID_1_m").html($rootScope.Carrito.length);
                } else {
                    $("#XMLID_1_").html($rootScope.Carrito.length);
                }

                /*    setTimeout(function() {
                        location.reload(true);
                    }, 1500)*/
                $('.box-talla').removeClass('active');
                vm.tallaSelected = '';


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

            vm.verTallas = function () {
                open_modal();
                document.getElementById("overlay").style.display = "block";
                document.getElementById("modal_tabla_medidas").style.display = "block";

                var text = "";
                if (vm.mobile) {
                    text = "<img src='" + vm.Producto.propiedades.image_medidas_movil + "' /> ";
                } else {
                    text = "<img src='" + vm.Producto.propiedades.image_medidas_escritorio + "' /> ";
                }

                document.getElementById("img_tabla_medidas").innerHTML = text;
            };

            vm.debeMostrarTablaMedidas = function () {
                if (vm.Producto.propiedades != null) {
                    if (vm.mobile) {
                        return vm.Producto.propiedades.image_medidas_movil != null && vm.Producto.propiedades.image_medidas_movil != "";
                    } else {
                        return vm.Producto.propiedades.image_medidas_escritorio != null && vm.Producto.propiedades.image_medidas_escritorio != "";
                    }
                }
                else {
                    return false;
                }

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


            const sanitizeColor = (color) => {
                return removeAccents(color.replace(/ /g, "")).toLowerCase();
            };

            const removeAccents = (str) => {
                return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            };

        }]);
})();