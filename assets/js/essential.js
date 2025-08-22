/*!
 * Essential JS - Only what's needed
 * Combines: preloader, smooth scrolling, navbar sticky
 */

// ===== PRELOADER FALLBACK (Vanilla JS - executes immediately)
(function() {
    "use strict";
    
    var preloaderHidden = false;
    
    function hidePreloader() {
        if (preloaderHidden) return;
        preloaderHidden = true;
        
        var preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.transition = 'opacity 0.5s ease';
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }
    }
    
    // Timeout de seguridad - garantiza que se oculte en máximo 5 segundos
    setTimeout(hidePreloader, 5000);
    
    // DOMContentLoaded - más rápido que window.load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(hidePreloader, 500);
        });
    } else {
        setTimeout(hidePreloader, 500);
    }
    
    // window.load como respaldo adicional
    window.addEventListener('load', function() {
        setTimeout(hidePreloader, 500);
    });
    
    // Detectar errores de carga de recursos críticos
    window.addEventListener('error', function() {
        setTimeout(hidePreloader, 1000);
    });
})();

$(document).ready(function() {
    "use strict";
    
    //===== Preloader (jQuery fallback - mantener para compatibilidad)
    $(window).on('load', function() {
        $('.preloader').delay(500).fadeOut(500);
    });
    
    //===== Smooth Scrolling (without jQuery easing dependency)
    $('a.page-scroll[href*="#"]:not([href="#"])').on('click', function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            try {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: (target.offset().top - 60)
                    }, 1000); // Removed easing dependency
                    return false;
                }
            } catch(e) {
                console.log('Invalid scroll target:', this.hash);
                return false;
            }
        }
    });
    
    //===== Sticky Navbar
    $(window).on('scroll', function() {
        var scroll = $(window).scrollTop();
        if (scroll < 20) {
            $(".navbar-area").removeClass("sticky");
            $(".navbar-area img").attr("src", "assets/images/hammer.svg");
        } else {
            $(".navbar-area").addClass("sticky");
            $(".navbar-area img").attr("src", "assets/images/hammer-2.svg");
        }
    });
    
    //===== Section Menu Active
    $(window).scroll(function() {
        var scrollbarLocation = $(this).scrollTop();
        
        $('.page-scroll').each(function() {
            try {
                var target = $(this.hash);
                if (target.length) {
                    var sectionOffset = target.offset().top - 73;
                    
                    if (sectionOffset <= scrollbarLocation) {
                        $(this).parent().addClass('active');
                        $(this).parent().siblings().removeClass('active');
                    }
                }
            } catch(e) {
                // Ignore invalid selectors
                console.log('Invalid selector:', this.hash);
            }
        });
    });
});