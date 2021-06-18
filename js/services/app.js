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
            getNumeroWhatsApp: getNumeroWhatsApp,
            getAbout: getAbout, 
            getTiendas: getTiendas,
            getContacto: getContacto,
            getCategorias: getCategorias,
            getTags: getTags,
            dividirIdiomas: dividirIdiomas,
            getSubCategorias: getSubCategorias,
            getProductosFiltrados: getProductosFiltrados,
            getCodigoPromocional: getCodigoPromocional
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

        function getProductosFiltrados(filtros) {

            var defered = $q.defer();
            var promise = defered.promise;

            // $http.post(API_URL + '/page/productos', filtros).then(success, error);
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

            $http.get(API_URL + '/data-shared/phone').then(success, error);
            return promise;

            function success(p) {
                defered.resolve(p);
            }

            function error(error) {
                defered.reject(error);
            }
        }

        function getAbout(){
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get(API_URL + '/data-shared/about').then(success, error);
            return promise;

            function success(p) {
                defered.resolve(p);
            }

            function error(error) {
                defered.reject(error);
            }
        }

        function getTiendas(){
            var defered = $q.defer();
            var promise = defered.promise;
        
            $http.get(API_URL + '/data-shared/tienda').then(success, error);
            return promise;
        
            function success(p) {
                defered.resolve(p);
            }
        
            function error(error) {
                defered.reject(error);
            }
        }

        function getContacto(){
            var defered = $q.defer();
            var promise = defered.promise;
        
            $http.get(API_URL + '/data-shared/contac').then(success, error);        
            return promise;
        
            function success(p) {
                defered.resolve(p);
            }
        
            function error(error) {
                defered.reject(error);
            }
        }

        function getCategorias(){
            var defered = $q.defer();
            var promise = defered.promise;
        
            //$http.get(API_URL + '/page/colecciones').then(success, error);
            
            var response = {
                data : {
                    "Mensaje": "Categorias consultadas...",
                    "Content": [
                        {
                            "id": 1,
                            "nombre": "Mujer // Women"
                        },
                        {
                            "id": 2,
                            "nombre": "Hombre // Men"
                        }
                    ],
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

        function getTags(){
            var defered = $q.defer();
            var promise = defered.promise;
        
            //$http.get(API_URL + '/page/colecciones').then(success, error);
            
            var response = {
                data : {
                    "Mensaje": "Tags consultados...",
                    "Content": [
                        {
                            "id": 1,
                            "nombre": "Ultimo chance // Last Chance"
                        },
                        {
                            "id": 2,
                            "nombre": "Nuevos // New Arrivals"
                        },
                        {
                            "id": 3,
                            "nombre": "Clásicos D/IR // Classics D/IR"
                        },
                        {
                            "id": 4,
                            "nombre": "Bonos de regalo // Gift vouchers"
                        }
                    ],
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

        function dividirIdiomas(cadena){
            return cadena.split("//");
        }

        function getSubCategorias(categoriaId){

            var defered = $q.defer();
            var promise = defered.promise;
        
            //$http.get(API_URL + '/page/colecciones').then(success, error);
            
            var response1 = {
                data : {
                    "Mensaje": "SubCategorias consultadas...",
                    "Content": [
                        {
                            "id": 1,
                            "nombre": "Pantalones // Jeans",
                        },
                        {
                            "id": 2,
                            "nombre": "Cop Tops // Cop Tops",
                        },
                        {
                            "id": 3,
                            "nombre": "Faldas // Skirts",
                        },
                        {
                            "id": 4,
                            "nombre": "Vestidos // Dresses",
                        },
                        {
                            "id": 5,
                            "nombre": "Sacos // Sacks",
                        },
                        {
                            "id": 6,
                            "nombre": "Accesorios // Accessories",
                        },
                        {
                            "id": 7,
                            "nombre": "Chaquetas // Jackets",
                        },
                        {
                            "id": 8,
                            "nombre": "Enterizos // Jumpsuits",
                        },
                        {
                            "id": 9,
                            "nombre": "Bodysuits // Bodysuits",
                        }
                    ],
                    "isOk": true
                }
            };

            var response2 = {
                data : {
                    "Mensaje": "SubCategorias consultadas...",
                    "Content": [
                        {
                            "id": 10,
                            "nombre": "Pantalones // Jeans",
                        },
                        {
                            "id": 11,
                            "nombre": "Correas // Straps",
                        },
                        {
                            "id": 12,
                            "nombre": "Billeteras // Wallets",
                        },
                        {
                            "id": 13,
                            "nombre": "Suteres  // Sweaters",
                        },
                        {
                            "id": 14,
                            "nombre": "Zapatos // Shoes",
                        }
                    ],
                    "isOk": true
                }
            };

            if(categoriaId == 1) success(response1);
            if(categoriaId == 2) success(response2);
        
            return promise;
        
            function success(p) {
                defered.resolve(p);
            }
        
            function error(error) {
                defered.reject(error);
            }
        }

        function getCodigoPromocional(codigo){

            var defered = $q.defer();
            var promise = defered.promise;
        
            //$http.get(API_URL + '/page/colecciones').then(success, error);
            
            var response1 = {
                data : {
                    "Mensaje": "Descuento consultado...",
                    "Content": {
                        id: 1,
                        codigo: codigo,
                        porcentaje_descuento: 50
                    },
                    "isOk": true
                }
            };

            success(response1);
        
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