(function() {
    'use strict';
    angular
        .module('app')
        .controller('ColeccionesController', ['appService', function(appService) {
            var vm = this;
            vm.colecciones = [];
            vm.carrusel = [];
            vm.mobile = false;
            vm.dots = true;

            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                vm.mobile = true;
                vm.dots = false;
            }

            vm.getColecciones = function() {


                var promisePost = appService.getColecciones();
                promisePost.then(function(d) {
                    vm.colecciones = d.data.Content;


                    setTimeout(function() {
                        for (var i = 0; i < vm.colecciones.length; i++) {
                            vm.carrusel[i] = $('#carousel_' + i).flickity({
                                lazyLoad: true,
                                percentPosition: true,
                                prevNextButtons: false,
                                initialIndex: 0,
                                draggable: false,
                                pageDots: vm.dots,
                                cellSelector: '.carousel-cell'
                            });
                            var $imgs = vm.carrusel[i].find('.carousel-cell img');
                            // get transform property
                            var docStyle = document.documentElement.style;
                            var transformProp = typeof docStyle.transform == 'string' ?
                                'transform' : 'WebkitTransform';
                            // get Flickity instance
                            var flkty = vm.carrusel[i].data('flickity');
                        }
                    }, 1000);
                }, function(err) {
                    if (err.status == 402) {
                        toastr["error"](err.data.respuesta);
                    } else {
                        toastr["error"]("Ha ocurrido un problema!");
                    }
                });
            }




            vm.view_imagen = function(item, i, index) {
                if ($("#colleccion" + i).hasClass('is-selected')) {
                    open_modal();
                    document.getElementById("overlay").style.display = "block";
                    document.getElementById("modal_coleccion").style.display = "block";

                    var text = "<div class='carousel-coleccion'>";
                    for (var i = 0; i < item.imagenes.length; i++) {
                        text += '<div class="carousel-cell-coleccion"><img src=' + item.imagenes[i].url + ' class="img-zoom-coleccion animated bounceIn"></div>';
                    }
                    text += '</div>';
                    document.getElementById("img").innerHTML = text;


                    $('.carousel-coleccion').flickity({
                        imagesLoaded: true,
                        percentPosition: false,
                        autoplay: true,
                        prevNextButtons: true,
                        initialIndex: index
                    });

                }

            }

            vm.next_ = function(i) {
                vm.carrusel[i].flickity('next');
            }

            vm.back_ = function(i) {
                vm.carrusel[i].flickity('previous');
            }

        }]);

})();