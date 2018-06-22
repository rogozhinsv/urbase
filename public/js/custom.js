! function(a) {
    "use strict";
    a(window).on("load", function() {
            a(".loader").delay(1e3).fadeOut(1e3)
        }),
        a(document).ready(function() {
            function h() {
                a("#main-nav .navbar-nav .dropdown-menu > .dropdown-submenu > .dropdown-menu").each(function(b) {
                    a(this).parent().offset().left + a(this).parent().width() + a(this).width() > a("body").width() ?
                        a(this).addClass("left") : a(this).removeClass("left")
                })
            }

            function v(b) {
                "success" === b.result ? setTimeout(function() {
                    a("form.mailchimp label").removeClass()
                }, 5e3) : "error" === b.result && setTimeout(function() {
                    a("form.mailchimp label").removeClass()
                }, 5e3)
            }
            var b = a("header.sticky"),
                c = b.outerHeight();
            b.next().css({ "margin-top": c });
            var d = a(".dropdown"),
                e = a(".dropdown-submenu"),
                f = a(".dropdown > a"),
                g = a(".dropdown-submenu > a");
            a(window).width() > 992 ? (a(d).on("mouseenter mouseleave tap", function() {
                    a(this).toggleClass("open")
                }), a(e).on("mouseenter mouseleave tap", function() {
                    a(this).toggleClass("open")
                })) : (a(f).on("click", function(b) {
                    a(this).parent().siblings().removeClass("open").find(".dropdown-submenu").removeClass("open"),
                        a(this).parent().toggleClass("open").find(".dropdown-submenu").removeClass("open")
                }), a(g).on("click", function(b) {
                    a(this).parent().siblings().removeClass("open"),
                        a(this).parent().toggleClass("open")
                })),
                h(),
                a.fn.jPushMenu = function(b) {
                    var c = a.extend({}, a.fn.jPushMenu.defaultOptions, b);
                    a("body").addClass(c.bodyClass), a(this).addClass("jPushMenuBtn"), a(this).on("click", function() {
                        var b = "",
                            d = "";
                        return a(this).is("." + c.showLeftClass) ?
                            (b = ".cbp-spmenu-left", d = "toright") : a(this).is("." + c.showRightClass) ?
                            (b = ".cbp-spmenu-right", d = "toleft") : a(this).is("." + c.showTopClass) ?
                            b = ".cbp-spmenu-top" : a(this).is("." + c.showBottomClass) && (b = ".cbp-spmenu-bottom"),
                            a(this).toggleClass(c.activeClass), a(b).toggleClass(c.menuOpenClass),
                            a(this).is("." + c.pushBodyClass) && a("body").toggleClass("cbp-spmenu-push-" + d),
                            a(".jPushMenuBtn").not(a(this)).toggleClass("disabled"), !1
                    });
                    var d = {
                        close: function(b) {
                            a(".jPushMenuBtn,body,.cbp-spmenu").removeClass("disabled active cbp-spmenu-open cbp-spmenu-push-toleft cbp-spmenu-push-toright")
                        }
                    };
                    c.closeOnClickOutside && (a(document).on("click", function() {
                            d.close()
                        }), a(document).on("click touchstart", function() {
                            d.close()
                        }), a(".cbp-spmenu,.toggle-menu").on("click", function(a) {
                            a.stopPropagation()
                        }), a(".cbp-spmenu,.toggle-menu").on("click touchstart", function(a) {
                            a.stopPropagation()
                        })),
                        c.closeOnClickLink && a(".cbp-spmenu a").on("click", function() {
                            d.close()
                        })
                }, a.fn.jPushMenu.defaultOptions = {
                    bodyClass: "cbp-spmenu-push",
                    activeClass: "menu-active",
                    showLeftClass: "menu-left",
                    showRightClass: "menu-right",
                    showTopClass: "menu-top",
                    showBottomClass: "menu-bottom",
                    menuOpenClass: "cbp-spmenu-open",
                    pushBodyClass: "push-body",
                    closeOnClickOutside: !0,
                    closeOnClickInside: !0,
                    closeOnClickLink: !1
                };
            var i = a(".toggle-menu");
            a(i).jPushMenu({
                closeOnClickLink: !1
            });
            var j = a("#main-nav .navbar-nav.onepage-nav");
            a(j).onePageNav({
                currentClass: "active",
                scrollThreshold: .5,
                scrollSpeed: 1e3,
                changeHash: !0,
                easing: "easeInOutExpo"
            });
            var k = a(".btn-effect");
            a(k).on("click", function(b) {
                a(".ripple").remove();
                var c = a(this).offset().left,
                    d = a(this).offset().top,
                    e = a(this).width(),
                    f = a(this).height();
                a(this).prepend("<span class='ripple'></span>"), e >= f ? f = e : e = f;
                var g = b.pageX - c - e / 2,
                    h = b.pageY - d - f / 2;
                a(".ripple").css({
                    width: e,
                    height: f,
                    top: h + "px",
                    left: g + "px"
                }).addClass("rippleEffect")
            });
            var l = a(".hover-zoom"),
                m = a(".popup-video");
            a(l).magnificPopup({
                type: "image",
                mainClass: "mfp-fade",
                fixedContentPos: !1,
                retina: {
                    ratio: 1,
                    replaceSrc: function(a, b) {
                        return a.src.replace(/\.\w+$/, function(a) {
                            return "@2x" + a
                        })
                    }
                },
                zoom: {
                    enabled: !1,
                    duration: 600,
                    easing: "ease-in-out",
                    opener: function(a) { return a.is("img") ? a : a.find("img") }
                }
            }), a(m).magnificPopup({
                type: "iframe",
                mainClass: "mfp-fade",
                iframe: {
                    markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe></div>',
                    patterns: {
                        youtube: { index: "youtube.com/", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1" },
                        vimeo: { index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1" },
                        gmaps: { index: "//maps.google.", src: "%id%&output=embed" }
                    },
                    srcAction: "iframe_src"
                }
            });
            var n = a("section.countup"),
                o = a(".counter");
            n.on("inview", function(b, c, d, e) {
                c && (a(this).find(o).each(function() {
                    a(this);
                    o.countTo({ speed: 3e3, refreshInterval: 50 })
                }), a(this).unbind("inview"))
            });
            var p = a(".testimonials .owl-carousel"),
                q = a(".post-thumbnail-slider");
            a(p).owlCarousel({
                items: 1,
                loop: !0,
                nav: !1,
                dots: !0,
                autoplay: !1,
                autoplaySpeed: 1200,
                responsive: {
                    0: {
                        margin: 20,
                        stagePadding: 10
                    },
                    479: { margin: 50, stagePadding: 50 }
                }
            }), a(q).owlCarousel({
                items: 1,
                loop: !0,
                autoplay: !1,
                nav: !0,
                dots: !1,
                navSpeed: 800,
                navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>']
            });
            var t = a(".back-top");
            a(window).scroll(function() {
                a(this).scrollTop() > 400 ? t.addClass("back-top-visible") : t.removeClass("back-top-visible")
            }), t.on("click", function(b) {
                b.preventDefault(), a("body,html").animate({
                    scrollTop: 0
                }, 600)
            });
            var u = a(".mailchimp");
            a(u).ajaxChimp({
                callback: v,
                url: "your-mailchimp-url-here"
            }), a("#contact-form").on("submit", function(b) {
                b.preventDefault();
                var c = a("input[name=name]").val(),
                    d = a("input[name=email]").val(),
                    e = a("input[name=phone]").val(),
                    f = a("input[name=subject]").val(),
                    g = a("textarea[name=message]").val(),
                    h = !0;
                if ("" === c && (a("input[name=name]").css("border-color", "red"), h = !1), "" === d && (a("input[name=email]").css("border-color", "red"), h = !1), "" === g && (a("textarea[name=message]").css("border-color", "red"), h = !1), "" === f && (a("input[name=subject]").css("border-color", "red"), h = !1), h) {
                    var i, j;
                    i = {
                        user_name: c,
                        user_email: d,
                        user_phone: e,
                        user_subject: f,
                        user_message: g
                    }, a.post("php/email.php", i, function(b) { "error" === b.type ? (a("#contact-result").addClass("error"), j = b.text, setTimeout(function() { a("#contact-result").removeClass() }, 5e3)) : (a("#contact-result").removeClass().addClass("valid"), j = b.text, setTimeout(function() { a("#contact-result").removeClass() }, 5e3), a("input").val(""), a("textarea").val("")), a("#contact-result").html(j) }, "json")
                }
            }), a("input, textarea").on("change keyup", function(b) { a("input, textarea").css("border-color", "") }), window.initialize = function() {
                var a, b = new google.maps.LatLngBounds,
                    c = {
                        mapTypeId: "roadmap",
                        scrollwheel: !1,
                        draggable: !0,
                        styles: [{ featureType: "water", elementType: "geometry", stylers: [{ color: "#e9e9e9" }, { lightness: 17 }] }, { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f5f5f5" }, { lightness: 20 }] }, { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ color: "#ffffff" }, { lightness: 17 }] }, { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: .2 }] }, { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#ffffff" }, { lightness: 18 }] }, { featureType: "road.local", elementType: "geometry", stylers: [{ color: "#ffffff" }, { lightness: 16 }] }, { featureType: "poi", elementType: "geometry", stylers: [{ color: "#f5f5f5" }, { lightness: 21 }] }, { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#dedede" }, { lightness: 21 }] }, { elementType: "labels.text.stroke", stylers: [{ visibility: "on" }, { color: "#ffffff" }, { lightness: 16 }] }, { elementType: "labels.text.fill", stylers: [{ saturation: 36 }, { color: "#333333" }, { lightness: 40 }] }, { elementType: "labels.icon", stylers: [{ visibility: "off" }] }, { featureType: "transit", elementType: "geometry", stylers: [{ color: "#f2f2f2" }, { lightness: 19 }] }, { featureType: "administrative", elementType: "geometry.fill", stylers: [{ color: "#fefefe" }, { lightness: 20 }] }, { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }] }]
                    };
                a = new google.maps.Map(document.getElementById("map"), c), a.setTilt(45);
                var h, i, d = [
                        ["Hostlink", 40.710439, -74.005072]
                    ],
                    e = [
                        ['<div class="info_content"><h5>Hostlink</h5><p>Your address here</p></div>']
                    ],
                    f = "images/icons/pin.png",
                    g = new google.maps.InfoWindow;
                for (i = 0; i < d.length; i++) {
                    var j = new google.maps.LatLng(d[i][1], d[i][2]);
                    b.extend(j), h = new google.maps.Marker({
                        position: j,
                        map: a,
                        title: d[i][0],
                        icon: f
                    }), google.maps.event.addListener(h, "click", function(b, c) {
                        return function() {
                            g.setContent(e[c][0]), g.open(a, b)
                        }
                    }(h, i)), a.fitBounds(b)
                }
                var k = google.maps.event.addListener(a, "bounds_changed", function(a) {
                    this.setZoom(15), google.maps.event.removeListener(k)
                })
            };
            var w = a(".topic .open"),
                x = a(".question"),
                y = a(".live-search-box");
            a(w).on("click", function() {
                var b = a(this).parents(".topic");
                b.find(".answer").slideToggle(200), b.hasClass("expanded") ? b.removeClass("expanded") : b.addClass("expanded")
            }), a(x).each(function() { a(this).attr("data-search-term", a(this).text().toLowerCase()) }), a(y).on("keyup", function() {
                var b = a(this).val().toLowerCase();
                a(x).each(function() { a(this).filter("[data-search-term *= " + b + "]").length > 0 || b.length < 1 ? a(this).parent().parent().show() : a(this).parent().parent().hide() })
            });
            var z = a(".countdown");
            a(z).countdown({ date: "30 december 2018 00:00:00", format: "on" });
            var A = a(".blog-masonry .blog-grid");
            a(A).isotope({ itemSelector: ".element", transitionDuration: "0.8s" });
            var B = a(".skills"),
                C = a(".skillbar"),
                D = a(".skillbar-bar");
            a(B).on("inview", function(b, c, d, e) { c && (jQuery(C).each(function() { jQuery(this).find(D).animate({ width: jQuery(this).attr("data-percent") }, 2500) }), a(this).unbind("inview")) });
        })
}(jQuery);