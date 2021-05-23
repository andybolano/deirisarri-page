(function () {

    angular
        .module('app')
        .service('ubicacionService', ['$http', '$q', 'API_URL', ubicacionService]);
    /* @ngInject */
    function ubicacionService($http, $q, API_URL) {
        var service = {
            getPaises: getPaises,
            getCiudades: getCiudades,
            getDepartament: getDepartament,
        };
        return service;

        function getPaises() {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get(API_URL + '/paises').then(success, error);
            return promise;

            function success(p) {
                defered.resolve(p);
            }

            function error(error) {
                defered.reject(error)
            }
        }

        function getCiudades(pais) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get(API_URL + '/ciudades/' + pais).then(success, error);
            return promise;

            function success(p) {
                defered.resolve(p);
            }

            function error(error) {
                defered.reject(error)
            }
        }


        function getDepartament(ciudad) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get(API_URL + '/departament/' + ciudad).then(success, error);
            return promise;

            function success(p) {
                defered.resolve(p);
            }

            function error(error) {
                defered.reject(error)
            }
        }



    }
})();