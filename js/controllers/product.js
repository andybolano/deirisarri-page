(function () {
    'use strict';
    angular
        .module('app')
        .controller('ProductController', ['appService', '$rootScope', function (appService, $rootScope) {
            var vm = this;
            vm.Product = {};
            vm.colorSelected = "0";
            vm.colorFilter = "";
            vm.mobile = false;
            vm.disponible = false;
            vm.tallaSelected = '';
            vm.carrito = [];

            let $carousel = $('.carousel-store').flickity({
                lazyLoad: true,
                percentPosition: true,
                prevNextButtons: false,
                initialIndex: 0
            });

            vm.init = function () {

        

                vm.Product = $rootScope.ProductDetail;

                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    vm.mobile = true;
                }

                if (localStorage.getItem('cart')) {
                    var carrito = [];
                    carrito = JSON.parse(localStorage.getItem('cart'));
                    $("#XMLID_1_").html(carrito.length);
                }

                

    
                setLanguage();

                vm.colorSelected = "0";
                vm.colorFilter = "";
                $("#color").css("background-color", '#FFF');

               
        
                vm.mobile ? setCarousel(vm.Product.imagenes_moviles, 'mobile') : setCarousel(vm.Product.imagenes, 'desktop');

                
                
            };

            vm.color = function () {


                if (vm.colorSelected === 0) {
                    return;
                }



                var dataColor = (JSON.parse(vm.colorSelected));
                $("#color").css("background-color", dataColor.color);
                vm.colorFilter = dataColor.id_color;

                let productsFilter = [];
                      
                    if (vm.mobile) {
                        for (var i = 0; i < vm.Product.imagenes_moviles.length; i++) {
                            const colorProduct = getIdColor(vm.Product.imagenes_moviles[i].color);
                            if (vm.colorFilter === colorProduct) {
                                productsFilter.push(vm.Product.imagenes_moviles[i]);
                            }
                        }
                    } else {
                        for (var i = 0; i < vm.Product.imagenes.length; i++) {
                            const colorProduct = getIdColor(vm.Product.imagenes[i].color);
                        
                            if (vm.colorFilter === colorProduct) {
                                productsFilter.push(vm.Product.imagenes[i]);
                            }
                        }
                    }

                    vm.mobile ? setCarousel(productsFilter, 'mobile') : setCarousel(productsFilter, 'desktop');
                    vm.verificarDisponible();
                 
            }


            vm.close = function(){
                $.fn.fullpage.setMouseWheelScrolling(true);
                $.fn.fullpage.setAllowScrolling(true);
                $rootScope.showProduct = false;
            };

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
                var color = "";

                if ($rootScope.lang == 'es') {
                    currency = 'COP';
                } else if ($rootScope.lang == 'en') {
                    currency = 'USD';
                }





        
                     color = JSON.parse(vm.colorSelected);
                    for (var i = 0; i < vm.Product.imagenes.length; i++) {
                        if ( color.id_color === getIdColor(vm.Product.imagenes[i].color)) {
                            imagen = vm.Product.imagenes[i];
                            break;
                        }
                    }

                    for (var i = 0; i < vm.Product.tallas.length; i++) {
                        if (vm.tallaSelected == vm.Product.tallas[i].id_talla) {
                            talla = vm.Product.tallas[i].talla;
                            id_talla = vm.Product.tallas[i].id_talla;
                            break;
                        }
                    }
                


                var producto = {
                    producto: vm.Product.propiedades,
                    talla: talla,
                    id_talla: id_talla,
                    color: color,
                    imagen: imagen,
                    cantidad: 1,
                    currency: currency,
                    descuento: vm.Product.descuentos

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
            
                $rootScope.Carrito = JSON.parse(localStorage.getItem('cart'));
                if (vm.mobile) {
                    $("#XMLID_1_m").html($rootScope.Carrito.length);
                } else {
                    $("#XMLID_1_").html($rootScope.Carrito.length);
                }

                $('.box-talla').removeClass('active');
                vm.tallaSelected = '';


            };

            vm.selectTalla = function (talla) {

                $('.box-talla').removeClass('active');
                $('#talla_' + talla).addClass('active');
                vm.tallaSelected = talla;
                vm.verificarDisponible();
            };

            vm.verificarDisponible = function () {

                vm.disponible = false;
         

           
                if (vm.tallaSelected == '' || !vm.tallaSelected) {
                    return;

                }

                if (vm.colorSelected == '' || !vm.colorSelected || vm.colorSelected == 0) {
                    return;
                }

                var color = (JSON.parse(vm.colorSelected));

            

                for (var i = 0; i < vm.Product.sotck.length; i++) {
                    if (vm.Product.sotck[i].id_color == color.id_color && vm.Product.sotck[i].id_talla == vm.tallaSelected && parseInt(vm.Product.sotck[i].cantidad_total) > 0) {
                        vm.disponible = true;
                        break;
                    }
                }

                $('.agotado-detail').css("display", "none");
                if (!vm.disponible) {
                    $('.agotado-prenda-' + color.id_color).css("display", "block");
                }
            };

            vm.verTallas = function () {
                open_modal();
                document.getElementById("overlay").style.display = "block";
                document.getElementById("modal_tabla_medidas").style.display = "block";

                var text = "";
                if (vm.mobile) {
                    text = "<img src='" + vm.Product.propiedades.image_medidas_movil + "' /> ";
                } else {
                    text = "<img src='" + vm.Product.propiedades.image_medidas_escritorio + "' /> ";
                }

                document.getElementById("img_tabla_medidas").innerHTML = text;
            };

            vm.debeMostrarTablaMedidas = function () {
                if (vm.Product.propiedades != null) {
                    if (vm.mobile) {
                        return vm.Product.propiedades.image_medidas_movil != null && vm.Product.propiedades.image_medidas_movil != "";
                    } else {
                        return vm.Product.propiedades.image_medidas_escritorio != null && vm.Product.propiedades.image_medidas_escritorio != "";
                    }
                }
                else {
                    return false;
                }

            };

            const initCarousel = () =>{
                
                $carousel = $('.carousel-store').flickity({
                    lazyLoad: true,
                    percentPosition: true,
                    prevNextButtons: false,
                    initialIndex: 0
                });
            };

            const setCarousel = (data, type) => {

                

                if ($carousel.flickity()) {
                    $carousel.flickity('destroy');
                }

                let text = "";
                
                if(data === null){
                    return;
                }
   
               for (let i = 0; i < data.length; i++) {
                       const color = getIdColor(data[i].color);
                       text += '<div class="carousel-cell-store" id="element-' + color + '">';
                       if($rootScope.lang === 'es'){
                           text += ' <div class="agotado agotado-detail agotado-prenda-' + color + '"" id="agotado' + i + '">AGOTADO</div>';
                       }else{
                           text += ' <div class="agotado agotado-detail agotado-prenda-' + color + '"" id="agotado' + i + '">OUT OF STOCK</div>';
                       }
                       text += '<img class="carousel-cell-image-store" data-flickity-lazyload="' + data[i].url + '" alt="tulip" style="height:100%"  />';
                       text += '</div>';
               }
   
               setTimeout(function () {
                type === 'mobile' ?  $('#elementos-productos-movil').html(text) :  $('#elementos-productos-pc').html(text);
                initCarousel();
               }, 100);

               if(vm.Product.propiedades.isBono == '1'){
                vm.tallaSelected = vm.Product.tallas[0].id_talla;
                vm.colorSelected = JSON.stringify(vm.Product.colores[0]);

            }
                 

                  vm.selectTalla(vm.Product.tallas[0].id_talla);
   
            };
            
            const getIdColor = (colorName) =>{
                return vm.Product.colores.find(item => sanitizeColor(item.nombre) === sanitizeColor(colorName)).id_color;
            };

            

            const setLanguage = () =>{
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
            };

            const sanitizeColor = (color) => {
                return removeAccents(color.replace(/ /g, "")).toLowerCase();
            };

            const removeAccents = (str) => {
                return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            };
    }]);
})();