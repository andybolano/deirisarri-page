 $(document).ready(function () {

     $('#fullpage').fullpage({
         sectionsColor: ['#FFFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
         anchors: ['home', 'dir', 'tienda', 'blog', 'colecciones', 'contacto', 'terminos', 'aviso', 'politica'],
         menu: '#menu',
         slidesNavigation: false,
         slidesNavPosition: 'bottom',
         normalScrollElements: '.scrollable-element',
         lazyLoading: true,
         verticalCentered: true,
         scrollBar: false,

         afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
             ga('send', 'pageview', {
                 'page': anchorLink,
                 'title': slideAnchor
             });
         },
         onSlideLeave: function (anchorLink, index, slideIndex, direction, nextSlideIndex) {

             if (index == 3 && slideIndex == 0) {
                 $('#back').show();
             }

             if (index == 3 && slideIndex == 1) {
                 $('#back').hide();
             }

         },
         onLeave: function (index, nextIndex, direction) {
             if (nextIndex == 2 && direction == "up") {
                 $.fn.fullpage.moveTo('tienda', 0);
             }
             if (nextIndex == 4) {
                 $.fn.fullpage.moveTo('tienda', 0);
             }
             if (nextIndex == 3) {


                 $('div.fp-controlArrow.fp-prev').hide();
                 $('div.fp-controlArrow.fp-next').hide();
             } else {
                 $('div.fp-controlArrow.fp-prev').show();
                 $('div.fp-controlArrow.fp-next').show();
             }


         },
     });


     (function () {
            $('#english').removeClass('active-lang');
            $('#spanish').addClass('active-lang');
            $('.ES').show();
            $('.EN').hide();


         $("[data-translate] ").jqTranslate('js/traductor/lang', {
            defaultLang: 'en',
            forceLang: "es",
            asyncLangLoad: false
         });
        
        
     })();



     $('#load').hide();




     toastr.options = {
         "closeButton": true,
         "debug": false,
         "newestOnTop": false,
         "progressBar": true,
         "positionClass": "toast-bottom-right",
         "preventDuplicates": false,
         "onclick": null,
         "showDuration": "300",
         "hideDuration": "1000",
         "timeOut": "5000",
         "extendedTimeOut": "1000",
         "showEasing": "swing",
         "hideEasing": "linear",
         "showMethod": "fadeIn",
         "hideMethod": "fadeOut"
     }


     $("#english").click(function () {
         (function () {
             $("[data-translate]").jqTranslate('js/traductor/lang', {
                 defaultLang: 'es',
                 forceLang: "en",
                 asyncLangLoad: false
             });
         })();
         $('#spanish').removeClass('active-lang');
         $('#english').addClass('active-lang');
         $('.EN').show();
         $('.ES').hide();
     });

     $("#spanish").click(function () {
         (function () {
             $("[data-translate]").jqTranslate('js/traductor/lang', {
                 defaultLang: 'en',
                 forceLang: "es",
                 asyncLangLoad: false
             });
         })();
         $('#english').removeClass('active-lang');
         $('#spanish').addClass('active-lang');
         $('.ES').show();
         $('.EN').hide();
     });




 });