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
            getProductosFiltrados: getProductosFiltrados
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

            //$http.get(API_URL + '/page/colecciones').then(success, error);
            
            var response = {
                data : {
                    "Mensaje": "Número WhatsApp consultado...",
                    "Content": {
                        "numero": "573504628322"
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

        function getAbout(){
            var defered = $q.defer();
            var promise = defered.promise;

            //$http.get(API_URL + '/page/colecciones').then(success, error);
            
            var response = {
                data : {
                    "Mensaje": "About consultado...",
                    "Content": {
                        "about": "<p><b>DE IRISARRI</b>, es una marca de ropa <i>pret a porter</i> que se enfoca en el desarrollo de bodysuits y básicos en terciopelo: <b> ADN</b> de la marca. <br><br> <b>D / IR</b> lleva años en el mercado estudiando el cuerpo femenino para lograr la horma y la comodidad perfecta, tiene una gran variedad de diseños que juegan con la versatilidad y una amplia opción de colores.<br><br>Todos nuestros productos son elaborados en Colombia éticamente de manera muy artesanal. También contamos con una alianza social con la fundación <b>NIÑAS SIN MIEDO</b> que trabaja en derechos sexuales y reproductivos de las mujeres.<br> <br> Si aún no tienes un <i> velvet piece en tu clóset </i> ¡ anímate ! estás en el lugar indicado.</p><br/><br/> // <p><b> DE IRISARRI </b>,is a clothing brand <i>pret a porter</i> that focuses on developing bodysuits and basics in velvet : The brands <b>DNA.</b> <br> <br> <b> D/IR </b> has been in the market for years studying the female body in order to find the best fit and comfort, there is wide variety of designs that play with the versatility and a large range of colors.<br> <br> All of our designs are ethically made in Colombia. We also have joined ofreces with non profit <b>NSM</b>, an organization focused on creating sexual education and awareness for girls and teenagers.<br> <br>Our velvet pieces are a must have, if you don´t own one yet ¡ the time is now !</p><br/><br/>"
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

        function getTiendas(){
            var defered = $q.defer();
            var promise = defered.promise;
        
            //$http.get(API_URL + '/page/colecciones').then(success, error);
            
            var response = {
                data : {
                    "Mensaje": "Tiendas consultado...",
                    "Content": {
                        "tiendas": "<p>Casa Santamaría (Bogotá)<br>Calle 79B # 7 - 38.<br><br>Bazaar Boho (Neiva)<br>Calle 8 # 29 - 32, Local 1<br><br>Please Don’t Tell Shop (Miami)<br>www.pleasedonttellshop.com</p> // <p>Casa Santamaría (Bogotá)<br>Calle 79B # 7 - 38.<br><br>Bazaar Boho (Neiva)<br>Calle 8 # 29 - 32, Local 1<br><br>Please Don’t Tell Shop (Miami)<br>www.pleasedonttellshop.com</p>"
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

        function getContacto(){
            var defered = $q.defer();
            var promise = defered.promise;
        
            //$http.get(API_URL + '/page/colecciones').then(success, error);
            
            var response = {
                data : {
                    "Mensaje": "Contacto consultado...",
                    "Content": {
                        "contacto": "<br><br><br><br><br><h2 style='margin-left: 10%;font-size: 35px; font-weight: bold;'>Estaremos felices de responder tus preguntas</h2><br><img src='img/contact-decoration.svg' style='margin-left: 12%;' class='contact-decoration'><br><p style='margin-left: 10%; text-align: left; font-size: 22px;'>lauradeirisarri@gmail.com</p><br><p style='margin-left: 10%; text-align: left; font-size: 22px;'>Cl. 94 ## 11a-58 Local</p><br><br><h2 style='margin-left: 10%; font-size: 28px; font-weight: bold;'>Tambien nos puedes escribir al chat</h2> // <br><br><br><br><br><h2 style='margin-left: 10%;font-size: 35px; font-weight: bold;'>We will be happy to answer your questions.</h2><br><img src='img/contact-decoration.svg' style='margin-left: 12%;' class='contact-decoration'><br><p style='margin-left: 10%; text-align: left; font-size: 22px;'>lauradeirisarri@gmail.com</p><br><p style='margin-left: 10%; text-align: left; font-size: 22px;'>Cl. 94 ## 11a-58 Local</p><br><br><h2 style='margin-left: 10%; font-size: 28px; font-weight: bold;'>You can also write us to the chat</h2>"
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

    }
})();