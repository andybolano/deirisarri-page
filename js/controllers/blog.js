angular.module('app').controller('BlogController', ['appService', '$scope', function(appService, $scope) {
    var vm = this;
    vm.blogs = [];
    vm.anios = [];


    vm.getBlog = function() {
        var fecha = "";
        var promisePost = appService.getBlogs();
        promisePost.then(function(d) {
            vm.blogs = d.data.Content;


            for (var i = 0; i < vm.blogs.length; i++) {
                fecha = vm.blogs[i].fecha.split("-");
                vm.blogs[i].anio = fecha[0];
                if (!vm.anios.includes(fecha[0])) {
                    vm.anios.push(fecha[0]);
                }

                var descripcion = vm.blogs[i].descripcion.split("//");
                vm.blogs[i].descripcionES = descripcion[0];
                vm.blogs[i].descripcionEN = descripcion[1];
            }
            fecha = "";
        }, function(err) {
            if (err.status == 402) {
                toastr["error"](err.data.respuesta);
            } else {
                toastr["error"]("Ha ocurrido un problema!");
            }
        });
    }

    vm.view_imagen = function(imagen) {
        open_modal();
        document.getElementById("overlay").style.display = "block";
        document.getElementById("modal_imagen").style.display = "block";
        document.getElementById("modal_imagen").innerHTML = '<span class="close" onclick="close_modal()" class="animated bounceIn"></span><img src=' + imagen + ' class="animated bounceIn full-screen" >';
    }

    vm.goAnio = function(anio) {
        var myElement = document.getElementById(anio);
        var topPos = myElement.offsetTop;
        var element = document.getElementById('blog-scroll');

        scrollTo(element, topPos - 160, 1000);
        calcul_blog(anio);
    }



}]);


function scrollTo(element, to, duration) {
    var start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;

    var animateScroll = function() {
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}


Math.easeInOutQuad = function(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};

function calcul_blog(id) {
    $(".guia-blog").removeClass('active');
    $("#" + id + "_guia").addClass('active');
}