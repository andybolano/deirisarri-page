(function () {
    'use strict';
    angular
        .module('app')
        .controller('AboutController', ['appService', '$rootScope', '$sce', function (appService, $rootScope, $sce) {
            var vm = this;
            vm.datosAbout = {};

            _init();

            function _init(){
                _traerAbout();
            }

            function _traerAbout(){
                var promisePost = appService.getAbout();
                promisePost.then(function (d) {
                    var response = d.data;
                    if(response.isOk){
                        vm.datosAbout.AboutES = $sce.trustAsHtml(response.Content.AboutES);
                        vm.datosAbout.AboutEN = $sce.trustAsHtml(response.Content.AboutEN);
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