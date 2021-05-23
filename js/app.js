(function () {
    'use strict';
    // Add Angular module mdr.file
    angular.module('app', ['ngSanitize'])
        .constant('HOME', 'app.home')
        .constant('API_URL', 'https://deirisarri.co/api/public/index.php/api')
        //.constant('API_URL', 'http://localhost/deirisarri/api/public/index.php/api')
        .config(function ($compileProvider) {
            $compileProvider.debugInfoEnabled(false);

        }).run(function ($rootScope) {
            $rootScope.Envio = {};
            $rootScope.lang = "ES";
            if (!localStorage.getItem('cart')) {
                $rootScope.Carrito = [];
            } else {
                $rootScope.Carrito = JSON.parse(localStorage.getItem('cart'));
            }
        });



})();

angular.module('app').filter('trusted', ['$sce', function ($sce) {
    return function (url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);



angular.module('app').filter('filtroColor', function () {
    return function (input, color) {
        var salida = [];
        if (color == '') {
            return input;
        } else {
            angular.forEach(input, function (producto) {
                if (producto.color === color) {
                    salida.push(producto)
                }
            })
            return salida;
        }
    }
});


(function () {
    'use strict';
    angular
        .module('app')
        .directive('carrito', function () {

            var link = function (scope, element, attrs, controller) {
                scope.showMessage = function () {
                    controller.verCarrito();
                };
            };

            return {
                link: link,
                templateUrl: "carrito.html",
                scope: {},
                controller: 'CarritoController',
            };

        });
})();

(function () {
    'use strict';
    angular
        .module('app')
        .directive('carritomobil', function () {

            var link = function (scope, element, attrs, controller) {
                scope.showMessage = function () {
                    controller.verCarrito();
                };
            };
            return {
                link: link,
                templateUrl: "carritoMobil.html",
                scope: {},
                controller: 'CarritoController',
            };

        });
})();


(function () {
    'use strict';
    angular
        .module('app')
        .controller('barController', ['$rootScope', function ($rootScope) {


            var vm = this;
            vm.lang = function (lang) {
                $rootScope.lang = lang;

            }
        }]);
})();