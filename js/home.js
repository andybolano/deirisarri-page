angular.module('app')
    .controller('HomeController', ['appService', '$scope', function(appService, $scope) {
        var vm = this;
        vm.banners = [];
        vm.banner = "";
        vm.mobile = false;
        vm.actual = 0;
        vm.MyTimer = 0;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            vm.mobile = true;
        }
        vm.getBanner = function() {
            var promisePost = appService.getBanner();
            promisePost.then(function(d) {
                vm.banners = d.data.Content;
                vm.banner = vm.banners[0];

                var imagenesCargadas = [];

                for (var i = 0; i < vm.banners.length; i++) {
                    imagenesCargadas.push(vm.banners[i].img_pc)
                }

                for (var i = 0; i < imagenesCargadas.length; i++) {
                    $('<img>').attr('src', imagenesCargadas[i]);
                }
                if (!vm.mobile) {
                    $('#section0').css("background-image", "url(" + vm.banner.img_pc + ")");
                } else {
                    $('#section0').css("background-image", "url(" + vm.banner.img_movil + ")");
                }

                vm.MyTimer = setInterval(function() { vm.next(); }, 5000);

            }, function(err) {
                if (err.status == 402) {
                    toastr["error"](err.data.respuesta);
                } else {
                    toastr["error"]("Ha ocurrido un problema!");
                }
            });
        }

        vm.stop = function() {
            window.clearInterval(vm.MyTimer);
        }
        vm.next = function() {


            if (vm.actual + 1 < vm.banners.length) {
                vm.actual += 1;
            } else {
                vm.actual = 0;
            }

            $scope.$apply(function() {
                vm.banner = vm.banners[vm.actual];
            });
            vm.banner = vm.banners[vm.actual];
            if (!vm.mobile) {
                $('#section0')
                    .animate({ opacity: 0 }, 'fast', function() {
                        $(this)
                            .css({ 'background-image': 'url(' + vm.banner.img_pc + ')' })
                            .animate({ opacity: 1 });
                    });
            } else {
                $('#section0')
                    .animate({ opacity: 0 }, 'fast', function() {
                        $(this)
                            .css({ 'background-image': 'url(' + vm.banner.img_movil + ')' })
                            .animate({ opacity: 1 });
                    });
            }


        }

        vm.prev = function(id) {
            vm.actual = 0;
            for (var i = 0; i < vm.banners.length; i++) {
                if (id == vm.banners[i].id) {
                    vm.actual = i - 1;
                    break;
                }
            }
            if (vm.actual == -1) {
                vm.banner = vm.banners[vm.banners.length - 1];
                if (!vm.mobile) {
                    $('#section0')
                        .animate({ opacity: 0 }, 'fast', function() {
                            $(this)
                                .css({ 'background-image': 'url(' + vm.banner.img_pc + ')' })
                                .animate({ opacity: 1 });
                        });
                } else {
                    $('#section0')
                        .animate({ opacity: 0 }, 'fast', function() {
                            $(this)
                                .css({ 'background-image': 'url(' + vm.banner.img_movil + ')' })
                                .animate({ opacity: 1 });
                        });
                }

            } else {
                vm.banner = vm.banners[vm.actual];
                if (!vm.mobile) {
                    $('#section0')
                        .animate({ opacity: 0 }, 'fast', function() {
                            $(this)
                                .css({ 'background-image': 'url(' + vm.banner.img_pc + ')' })
                                .animate({ opacity: 1 });
                        });
                } else {
                    $('#section0')
                        .animate({ opacity: 0 }, 'fast', function() {
                            $(this)
                                .css({ 'background-image': 'url(' + vm.banner.img_movil + ')' })
                                .animate({ opacity: 1 });
                        });
                }
            }
        }

    }]);