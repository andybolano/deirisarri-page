(function() {
    'use strict';
    angular
        .module('app')
        .service('appService', ['$http', '$q', 'API_URL', appService]);
    /* @ngInject */
    function appService($http, $q, API_URL) {
        var service = {
            getEnvio: getEnvio,
            sendContact: sendContact,
            getProductos: getProductos,
            getBlogs: getBlogs,
            getColecciones: getColecciones,
            pay: pay,
            getBanner: getBanner,
            sendMessage: sendMessage,
            getNumeroWhatsApp: getNumeroWhatsApp
        };
        return service;


        function pay(data){
            var defered = $q.defer();
            var promise = defered.promise;
            $http.post(API_URL + '/pay',data).then(success, error);
            return promise;
            function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error);
            }
        }

        function sendMessage(contacto) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.post(API_URL + '/send/message', contacto).then(success, error);
            return promise;

            function success(p) {
                defered.resolve(p);
            }

            function error(error) {
                defered.reject(error);
            }
        }

        function getEnvio() {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get(API_URL + '/user/envio').then(success, error);
            return promise;

            function success(p) {
                defered.resolve(p);
            }

            function error(error) {
                defered.reject(error);
            }
        }

        function getBanner() {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get(API_URL + '/page/banner').then(success, error);
            return promise;

            function success(p) {
                defered.resolve(p);
            }

            function error(error) {
                defered.reject(error);
            }
        }

        function sendContact(object) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.post(API_URL + '/contacto', object).then(success, error);
            return promise;

            function success(p) {
                defered.resolve(p);
            }

            function error(error) {
                defered.reject(error);
            }
        }

        function pay(object) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.post(API_URL + '/pay', object).then(success, error);
            return promise;

            function success(p) {
                defered.resolve(p);
            }

            function error(error) {
                defered.reject(error);
            }
        }

        function getProductos() {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get(API_URL + '/page/productos').then(success, error);
            return promise;

            function success(p) {
                defered.resolve(p);
            }

            function error(error) {
                defered.reject(error);
            }
        }

        function getBlogs() {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get(API_URL + '/page/blog').then(success, error);
            return promise;

            function success(p) {
                defered.resolve(p);
            }

            function error(error) {
                defered.reject(error);
            }
        }

        function getColecciones() {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get(API_URL + '/page/colecciones').then(success, error);
            return promise;

            function success(p) {
                defered.resolve(p);
            }

            function error(error) {
                defered.reject(error);
            }
        }

        function getNumeroWhatsApp(){
            var defered = $q.defer();
            var promise = defered.promise;

            //$http.get(API_URL + '/page/colecciones').then(success, error);
            
            var response = {
                data : {
                    "Mensaje": "Número WhatsApp consultado...",
                    "Content": {
                        "Numero": "573504628322"
                    },
                    "isOk": true
                }
            };
            success(response);

            return promise;

            function success(p) {
                defered.resolve(p);
            }

            function error(error) {
                defered.reject(error);
            }
        }

    }
})();