/*!
 * Essential JS - Only what's needed
 * Combines: preloader, smooth scrolling, navbar sticky
 */

$(document).ready(function() {
    "use strict";
    
    //===== Preloader
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