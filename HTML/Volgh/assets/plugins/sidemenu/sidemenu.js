"use strict";

let currentWidth;

(function () {
    currentWidth = [window.innerWidth];
    var slideMenu = $('.side-menu');

    // Toggle Sidebar
    $(document).on('click', '[data-bs-toggle="sidebar"]', function (event) {
        event.preventDefault();
        if ($('.app').hasClass('sidenav-toggled')) {
            $('.app').removeClass('sidenav-toggled');
            if ((document.body.classList.contains("double-menu") || document.body.classList.contains("double-menu-tabs")) && !document.body.classList.contains('horizontal')) {
                if (document.querySelector('.slide-menu') && window.innerWidth >= 992) {
                    let slidemenu = document.querySelectorAll('.slide-menu');
                    slidemenu.forEach(e => {
                        if (e.classList.contains('double-menu-active')) {
                            e.classList.remove('double-menu-active')
                        }
                    })
                    let sidemenuActive = document.querySelector('.side-menu__item.active');
                    if (sidemenuActive?.nextElementSibling) {
                        let submenu = sidemenuActive.nextElementSibling;
                        submenu.classList.add('double-menu-active');
                        document.body.classList.remove('sidenav-toggled');
                    }
                    else {
                        document.body.classList.add('sidenav-toggled');
                    }
                }
            }
        }
        else {
            $('.app').addClass('sidenav-toggled');
            if (innerWidth >= 992) {
                if ((document.body.classList.contains("double-menu") || document.body.classList.contains("double-menu-tabs")) && !document.body.classList.contains('horizontal')) {
                    if (document.querySelector('.slide-menu')) {
                        let slidemenu = document.querySelectorAll('.slide-menu');
                        slidemenu.forEach(e => {
                            if (e.classList.contains('double-menu-active')) {
                                e.classList.remove('double-menu-active')
                            }
                        })
                    }
                }
            }
        }
    });

    responsive();


    var toggleSidebar = function () {
        var w = $(window);
        if (w.outerWidth() <= 1024) {
            $("body").addClass("sidebar-gone");
            $(document).off("click", "body").on("click", "body", function (e) {
                if ($(e.target).hasClass('sidebar-show') || $(e.target).hasClass('search-show')) {
                    $("body").removeClass("sidebar-show");
                    $("body").addClass("sidebar-gone");
                    $("body").removeClass("search-show");
                }
            });
        } else {
            $("body").removeClass("sidebar-gone");
        }
    }
    toggleSidebar();
    $(window).resize(toggleSidebar);

    //sticky-header
    $(window).on("scroll", function (e) {
        if ($(window).scrollTop() >= 70) {
            $('.app-header').addClass('fixed-header');
            $('.app-header').addClass('visible-title');
        } else {
            $('.app-header').removeClass('fixed-header');
            $('.app-header').removeClass('visible-title');
        }
    });

    $(window).on("scroll", function (e) {
        if ($(window).scrollTop() >= 70) {
            $('.horizontal-main').addClass('fixed-header');
            $('.horizontal-main').addClass('visible-title');
        } else {
            $('.horizontal-main').removeClass('fixed-header');
            $('.horizontal-main').removeClass('visible-title');
        }
    });

    // Check width on window resize
    $(window).resize(function () {
        responsive();
    });

    // Function to handle responsiveness
    function responsive() {
        const mediaQuery = window.innerWidth;
        currentWidth.push(mediaQuery);
        if (currentWidth.length > 2) {
            currentWidth.shift();
        }
        if (currentWidth.length > 1) {
            if ((currentWidth[currentWidth.length - 1] < 992) && (currentWidth[currentWidth.length - 2] >= 992)) {
                // Less than 992
                closeSideMenuIfNeeded();
            }

            if ((currentWidth[currentWidth.length - 1] >= 992) && (currentWidth[currentWidth.length - 2] < 992)) {
                // Greater than or equal to 992
                if (document.body.classList.contains("double-menu") || document.body.classList.contains("double-menu-tabs")) {
                    document.body.classList.remove("sidenav-toggled");
                }
            }
        }
    }

    // Function to close side menu if open when width is less than 992
    function closeSideMenuIfNeeded() {
        if ($('.app').hasClass('sidenav-toggled')) {
            $('.app').removeClass('sidenav-toggled');
        }
    }

    // Hover menu initialization
    hovermenu();

    // Active submenu initialization
    ActiveSubmenu();
})();

// Function for hover menu
function hovermenu() {
    $(".app-sidebar").hover(function () {
        if ($('.app').hasClass('sidenav-toggled')) {
            $('.app').addClass('sidenav-toggled-open');
        }
    }, function () {
        if ($('.app').hasClass('sidenav-toggled')) {
            $('.app').removeClass('sidenav-toggled-open');
        }
    });
}

// Function for active submenu
function ActiveSubmenu() {
    var position = window.location.pathname.split('/');
    position = position[position.length - 1];
    $(".app-sidebar li a").each(function () {
        var $this = $(this);
        var pageUrl = $this.attr("href");

        if (pageUrl === position) {
            setTimeout(() => {
                if ($this.closest('.sub-slide-menu2')) {
                    $this.closest('.sub-slide-menu2').addClass('open');
                    if (!document.querySelector('body').classList.contains('horizontal') || window.innerWidth < 992) {
                        $this.closest('.sub-slide-menu2').slideDown();
                    }
                    $this.closest('.sub-slide-menu2').prev().addClass('active');
                    $this.closest('.sub-slide-menu2').parent().addClass('is-expanded');
                }
                if ($this.closest('.sub-slide-menu')) {
                    $this.closest('.sub-slide-menu').addClass('open');
                    if (!document.querySelector('body').classList.contains('horizontal') || window.innerWidth < 992) {
                        $this.closest('.sub-slide-menu').slideDown();
                    }
                    $this.closest('.sub-slide-menu').parent().addClass('is-expanded');
                    $this.closest('.sub-slide-menu').prev().addClass('active');
                }
                if ($this.closest('.slide-menu')) {
                    $this.closest('.slide-menu').addClass('open');
                    if (!document.querySelector('body').classList.contains('horizontal') || window.innerWidth < 992) {
                        $this.closest('.slide-menu').slideDown();
                    }
                    $this.closest('.slide-menu').parent().addClass('is-expanded');
                    $this.closest('.slide-menu').prev().addClass('active');
                }
                $this.addClass('active');
                $this.parent().addClass('active');

                if (document.body.classList.contains('double-menu-tabs') || document.body.classList.contains('double-menu')) {
                    if ($this.closest('.slide-menu').length) {
                        $this.closest('.slide-menu').addClass('double-menu-active');
                    }
                    else {
                        let slideMenu = document.querySelectorAll('.slide-menu'),
                            slideNavStatus = false;
                        slideMenu.forEach(e => {
                            if (e.classList.contains('double-menu-active')) {
                                slideNavStatus = true;
                            }
                        })
                        if (!slideNavStatus) {
                            document.body.classList.add('sidenav-toggled');
                        }
                    }
                }
            }, 200);
        }
    });
}

// Function to handle horizontal menu
function HorizontalHovermenu() {
    let value = document.querySelector('body').classList.contains('horizontal-hover');
    if (value && window.innerWidth >= 992) {
        $("[data-bs-toggle='slide']").off('click');
        $("[data-bs-toggle='sub-slide']").off('click');
        $("[data-bs-toggle='sub-slide2']").off('click');
        slideClick();
    } else {
        menuClick();
    }
}

// Function to handle menu click events
function menuClick() {
    $("[data-bs-toggle='slide']").off('click');
    $("[data-bs-toggle='sub-slide']").off('click');
    $("[data-bs-toggle='sub-slide2']").off('click');

    $("[data-bs-toggle='slide']").on('click', function (e) {
        var $this = $(this);
        var checkElement = $this.next();
        var animationSpeed = 300,
            slideMenuSelector = '.slide-menu';
        if (checkElement.is(slideMenuSelector) && checkElement.is(':visible')) {
            checkElement.slideUp(animationSpeed, function () {
                checkElement.removeClass('open');
            });
            checkElement.parent("li").removeClass("is-expanded");
        } else if ((checkElement.is(slideMenuSelector)) && (!checkElement.is(':visible'))) {
            var parent = $this.parents('ul').first();
            var ul = parent.find('ul[class^="slide-menu"]:visible').slideUp(animationSpeed);
            ul.removeClass('open');
            var parent_li = $this.parent("li");
            checkElement.slideDown(animationSpeed, function () {
                checkElement.addClass('open');
                parent.find('li.is-expanded').removeClass('is-expanded');
                parent_li.addClass('is-expanded');
            });
        }
        if (checkElement.is(slideMenuSelector)) {
            e.preventDefault();
        }

        if (window.innerWidth >= 992) {
            if (!checkElement.hasClass('double-menu-active') && !document.body.classList.contains('horizontal') && (document.body.classList.contains('double-menu') || document.body.classList.contains('double-menu-tabs'))) {

                if (document.querySelector('.slide-menu')) {
                    let slidemenu = document.querySelectorAll('.slide-menu');
                    slidemenu.forEach(e => {
                        if (e.classList.contains('double-menu-active')) {
                            e.classList.remove('double-menu-active')
                        }
                    })
                }
                let sidemenuActive = document.querySelector('.side-menu__item.active');
                if (sidemenuActive?.nextElementSibling) {
                    let submenu = sidemenuActive.nextElementSibling;
                    submenu.classList.add('double-menu-active');
                }
            }
        } else {
            if (!checkElement.hasClass('double-menu-active') && !document.body.classList.contains('horizontal') && (document.body.classList.contains('double-menu') || document.body.classList.contains('double-menu-tabs'))) {

                if (document.querySelector('.slide-menu')) {
                    let slidemenu = document.querySelectorAll('.slide-menu');
                    slidemenu.forEach(e => {
                        if (e.classList.contains('double-menu-active')) {
                            e.classList.remove('double-menu-active')
                        }
                    })
                }
            }
        }
    });
    $("[data-bs-toggle='sub-slide']").on('click', function (e) {
        var $this = $(this);
        var checkElement = $this.next();
        var animationSpeed = 300,
            slideMenuSelector = '.sub-slide-menu';
        if (checkElement.is(slideMenuSelector) && checkElement.is(':visible')) {
            checkElement.slideUp(animationSpeed, function () {
                checkElement.removeClass('open');
            });
            checkElement.parent("li").removeClass("is-expanded");
        } else if ((checkElement.is(slideMenuSelector)) && (!checkElement.is(':visible'))) {
            var parent = $this.parents('ul').first();
            var ul = parent.find('ul[class^="sub-slide-menu"]:visible').slideUp(animationSpeed);
            ul.removeClass('open');
            var parent_li = $this.parent("li");

            checkElement.slideDown(animationSpeed, function () {
                checkElement.addClass('open');
                parent.find('li.is-expanded').removeClass('is-expanded');
                parent_li.addClass('is-expanded');
            });
        }
        if (checkElement.is(slideMenuSelector)) {
            e.preventDefault();
        }

        if (window.innerWidth >= 992) {
            if (!checkElement.hasClass('double-menu-active') && !document.body.classList.contains('horizontal') && (document.body.classList.contains('double-menu') || document.body.classList.contains('double-menu-tabs'))) {
                if (document.querySelector('.slide-menu')) {
                    let slidemenu = document.querySelectorAll('.slide-menu');
                    slidemenu.forEach(e => {
                        if (e.classList.contains('double-menu-active')) {
                            e.classList.remove('double-menu-active')
                        }
                    })
                }
                let sidemenuActive = document.querySelector('.side-menu__item.active');
                if (sidemenuActive?.nextElementSibling) {
                    let submenu = sidemenuActive.nextElementSibling;
                    submenu.classList.add('double-menu-active');
                }
            }
        } else {
            if (!checkElement.hasClass('double-menu-active') && !document.body.classList.contains('horizontal') && (document.body.classList.contains('double-menu') || document.body.classList.contains('double-menu-tabs'))) {

                if (document.querySelector('.slide-menu')) {
                    let slidemenu = document.querySelectorAll('.slide-menu');
                    slidemenu.forEach(e => {
                        if (e.classList.contains('double-menu-active')) {
                            e.classList.remove('double-menu-active')
                        }
                    })
                }
            }
        }
    });

    // Horizontal menu slide
    $("[data-bs-toggle='sub-slide2']").on('click', function (e) {
        var $this = $(this);
        var checkElement = $this.next();
        var animationSpeed = 300,
            slideMenuSelector = '.sub-slide-menu2';
        if (checkElement.is(slideMenuSelector) && checkElement.is(':visible')) {
            checkElement.slideUp(animationSpeed, function () {
                checkElement.removeClass('open');
            });
            checkElement.parent("li").removeClass("is-expanded");
        } else if ((checkElement.is(slideMenuSelector)) && (!checkElement.is(':visible'))) {
            var parent = $this.parents('ul').first();
            var ul = parent.find('ul[class^="sub-slide-menu2"]:visible').slideUp(animationSpeed);
            ul.removeClass('open');
            var parent_li = $this.parent("li");

            checkElement.slideDown(animationSpeed, function () {
                checkElement.addClass('open');
                parent.find('li.is-expanded').removeClass('is-expanded');
                parent_li.addClass('is-expanded');
            });
        }
        if (checkElement.is(slideMenuSelector)) {
            e.preventDefault();
        }

        if (window.innerWidth >= 992) {
            if (!checkElement.hasClass('double-menu-active') && !document.body.classList.contains('horizontal') && (document.body.classList.contains('double-menu') || document.body.classList.contains('double-menu-tabs'))) {
                if (document.querySelector('.slide-menu')) {
                    let slidemenu = document.querySelectorAll('.slide-menu');
                    slidemenu.forEach(e => {
                        if (e.classList.contains('double-menu-active')) {
                            e.classList.remove('double-menu-active')
                        }
                    })
                }
                let sidemenuActive = document.querySelector('.side-menu__item.active');
                if (sidemenuActive?.nextElementSibling) {
                    let submenu = sidemenuActive.nextElementSibling;
                    submenu.classList.add('double-menu-active');
                }
            }
        } else {
            if (!checkElement.hasClass('double-menu-active') && !document.body.classList.contains('horizontal') && (document.body.classList.contains('double-menu') || document.body.classList.contains('double-menu-tabs'))) {

                if (document.querySelector('.slide-menu')) {
                    let slidemenu = document.querySelectorAll('.slide-menu');
                    slidemenu.forEach(e => {
                        if (e.classList.contains('double-menu-active')) {
                            e.classList.remove('double-menu-active')
                        }
                    })
                }
            }
        }
    });

    // Horizontal menu dropdown open
    function toggleHorizontal() {
        if (document.querySelector('.app').classList.contains('sidenav-toggled')) {
            document.querySelector('.app').classList.remove('sidenav-toggled')
        }
    }

    // Horizontal menu slider menu
    function sideMenuSliderMenu() {
        if (document.querySelector('.side-menu')) {
            let slideMenu = document.querySelectorAll('.slide-menu'),
                slideNavStatus = false;
            slideMenu.forEach(e => {
                if (e.classList.contains('double-menu-active')) {
                    slideNavStatus = true;
                }
            })
            if (!slideNavStatus) {
                document.body.classList.add('sidenav-toggled');
            }
        }
    }

    // Horizontal-menu
    $(document).ready(function () {
        let mode, width, breakpoint = 1024;
        if (window.innerWidth >= breakpoint) {
            mode = 'desktop';
        } else {
            mode = 'mobile';
        }
        width = window.innerWidth;

        if (mode === 'desktop') {
            if ($('.app').hasClass('sidenav-toggled')) {
                $('.app').removeClass('sidenav-toggled');
            }
        } else {
            if ($('.app').hasClass('sidenav-toggled')) {
                $('.app').removeClass('sidenav-toggled');
            }
        }

        $('.horizontal-menu .desktop-menu').on('click', function (e) {
            e.stopPropagation();
            if (window.innerWidth <= 1024) {
                let $this = $(this);
                let checkElement = $this.next();
                if (checkElement.is('.horizontal-menu-list') && checkElement.is(':visible')) {
                    checkElement.slideUp('normal');
                    $this.removeClass('is-open');
                    checkElement.removeClass('open');
                    checkElement.removeClass('slide-up');
                    checkElement.removeClass('collapse-up');
                    checkElement.parent('li').removeClass('is-expanded');
                    setTimeout(() => {
                        if ($('.app').hasClass('sidenav-toggled') && width <= breakpoint) {
                            $('.app').addClass('sidenav-toggled-open')
                        }
                    }, 200);
                } else if (!checkElement.is('.sub-slide-menu') && !checkElement.is('.sub-slide-menu2') && !checkElement.is('.sub-slide-menu3') && !checkElement.is('.sub-slide-menu4') && !checkElement.is('.sub-slide-menu5')) {
                    let parent = $this.parents('ul').first();
                    let ul = parent.find('ul:visible').slideUp('normal');
                    ul.removeClass('open');
                    ul.removeClass('slide-up');
                    ul.removeClass('collapse-up');
                    ul.parent('li').removeClass('is-expanded');
                    checkElement.slideDown('normal');
                    checkElement.addClass('open');
                    checkElement.addClass('slide-up');
                    checkElement.removeClass('collapse-up');
                    checkElement.parent('li').addClass('is-expanded');
                    checkElement.parent('li').siblings('li').removeClass('is-expanded');
                    parent.find('ul').not(checkElement).slideUp('normal');
                    parent.find('ul').not(checkElement).removeClass('open');
                    parent.find('ul').not(checkElement).removeClass('slide-up');
                    parent.find('ul').not(checkElement).removeClass('collapse-up');
                    parent.find('ul').not(checkElement).parent('li').removeClass('is-expanded');
                    setTimeout(() => {
                        if ($('.app').hasClass('sidenav-toggled') && width <= breakpoint) {
                            $('.app').addClass('sidenav-toggled-open')
                        }
                    }, 200);
                }
                if (checkElement.is('.horizontal-menu-list')) {
                    e.preventDefault();
                }
            }
        });
        $(document).click(function (e) {
            let $this = $(e.target);
            let b = $('.horizontal-menu .desktop-menu').is($this);
            let c = $('.horizontal-menu .desktop-menu').has($this).length;
            let d = $this.is('.horizontal-menu .desktop-menu');
            if (!b && !c && !d) {
                let a = $('.horizontal-menu .desktop-menu').next();
                a.slideUp('normal');
                a.removeClass('open');
                a.removeClass('slide-up');
                a.removeClass('collapse-up');
                a.parent('li').removeClass('is-expanded');
                setTimeout(() => {
                    if ($('.app').hasClass('sidenav-toggled') && width <= breakpoint) {
                        $('.app').addClass('sidenav-toggled-open')
                    }
                }, 200);
            }
        });

        $('.horizontal-menu .desktop-sub-menu').on('click', function (e) {
            e.stopPropagation();
            if (window.innerWidth <= 1024) {
                let $this = $(this);
                let checkElement = $this.next();
                if (checkElement.is('.sub-slide-menu') && checkElement.is(':visible')) {
                    checkElement.slideUp('normal');
                    $this.removeClass('is-open');
                    checkElement.removeClass('open');
                    checkElement.removeClass('slide-up');
                    checkElement.removeClass('collapse-up');
                    checkElement.parent('li').removeClass('is-expanded');
                    setTimeout(() => {
                        if ($('.app').hasClass('sidenav-toggled') && width <= breakpoint) {
                            $('.app').addClass('sidenav-toggled-open')
                        }
                    }, 200);
                } else if (!checkElement.is('.sub-slide-menu') && !checkElement.is('.sub-slide-menu2') && !checkElement.is('.sub-slide-menu3') && !checkElement.is('.sub-slide-menu4') && !checkElement.is('.sub-slide-menu5')) {
                    let parent = $this.parents('ul').first();
                    let ul = parent.find('ul:visible').slideUp('normal');
                    ul.removeClass('open');
                    ul.removeClass('slide-up');
                    ul.removeClass('collapse-up');
                    ul.parent('li').removeClass('is-expanded');
                    checkElement.slideDown('normal');
                    checkElement.addClass('open');
                    checkElement.addClass('slide-up');
                    checkElement.removeClass('collapse-up');
                    checkElement.parent('li').addClass('is-expanded');
                    checkElement.parent('li').siblings('li').removeClass('is-expanded');
                    parent.find('ul').not(checkElement).slideUp('normal');
                    parent.find('ul').not(checkElement).removeClass('open');
                    parent.find('ul').not(checkElement).removeClass('slide-up');
                    parent.find('ul').not(checkElement).removeClass('collapse-up');
                    parent.find('ul').not(checkElement).parent('li').removeClass('is-expanded');
                    setTimeout(() => {
                        if ($('.app').hasClass('sidenav-toggled') && width <= breakpoint) {
                            $('.app').addClass('sidenav-toggled-open')
                        }
                    }, 200);
                }
                if (checkElement.is('.sub-slide-menu')) {
                    e.preventDefault();
                }
            }
        });
        $(document).click(function (e) {
            let $this = $(e.target);
            let b = $('.horizontal-menu .desktop-sub-menu').is($this);
            let c = $('.horizontal-menu .desktop-sub-menu').has($this).length;
            let d = $this.is('.horizontal-menu .desktop-sub-menu');
            if (!b && !c && !d) {
                let a = $('.horizontal-menu .desktop-sub-menu').next();
                a.slideUp('normal');
                a.removeClass('open');
                a.removeClass('slide-up');
                a.removeClass('collapse-up');
                a.parent('li').removeClass('is-expanded');
                setTimeout(() => {
                    if ($('.app').hasClass('sidenav-toggled') && width <= breakpoint) {
                        $('.app').addClass('sidenav-toggled-open')
                    }
                }, 200);
            }
        });

        $('.horizontal-menu .desktop-sub-sub-menu').on('click', function (e) {
            e.stopPropagation();
            if (window.innerWidth <= 1024) {
                let $this = $(this);
                let checkElement = $this.next();
                if (checkElement.is('.sub-slide-menu2') && checkElement.is(':visible')) {
                    checkElement.slideUp('normal');
                    $this.removeClass('is-open');
                    checkElement.removeClass('open');
                    checkElement.removeClass('slide-up');
                    checkElement.removeClass('collapse-up');
                    checkElement.parent('li').removeClass('is-expanded');
                    setTimeout(() => {
                        if ($('.app').hasClass('sidenav-toggled') && width <= breakpoint) {
                            $('.app').addClass('sidenav-toggled-open')
                        }
                    }, 200);
                } else if (!checkElement.is('.sub-slide-menu') && !checkElement.is('.sub-slide-menu2') && !checkElement.is('.sub-slide-menu3') && !checkElement.is('.sub-slide-menu4') && !checkElement.is('.sub-slide-menu5')) {
                    let parent = $this.parents('ul').first();
                    let ul = parent.find('ul:visible').slideUp('normal');
                    ul.removeClass('open');
                    ul.removeClass('slide-up');
                    ul.removeClass('collapse-up');
                    ul.parent('li').removeClass('is-expanded');
                    checkElement.slideDown('normal');
                    checkElement.addClass('open');
                    checkElement.addClass('slide-up');
                    checkElement.removeClass('collapse-up');
                    checkElement.parent('li').addClass('is-expanded');
                    checkElement.parent('li').siblings('li').removeClass('is-expanded');
                    parent.find('ul').not(checkElement).slideUp('normal');
                    parent.find('ul').not(checkElement).removeClass('open');
                    parent.find('ul').not(checkElement).removeClass('slide-up');
                    parent.find('ul').not(checkElement).removeClass('collapse-up');
                    parent.find('ul').not(checkElement).parent('li').removeClass('is-expanded');
                    setTimeout(() => {
                        if ($('.app').hasClass('sidenav-toggled') && width <= breakpoint) {
                            $('.app').addClass('sidenav-toggled-open')
                        }
                    }, 200);
                }
                if (checkElement.is('.sub-slide-menu2')) {
                    e.preventDefault();
                }
            }
        });
        $(document).click(function (e) {
            let $this = $(e.target);
            let b = $('.horizontal-menu .desktop-sub-sub-menu').is($this);
            let c = $('.horizontal-menu .desktop-sub-sub-menu').has($this).length;
            let d = $this.is('.horizontal-menu .desktop-sub-sub-menu');
            if (!b && !c && !d) {
                let a = $('.horizontal-menu .desktop-sub-sub-menu').next();
                a.slideUp('normal');
                a.removeClass('open');
                a.removeClass('slide-up');
                a.removeClass('collapse-up');
                a.parent('li').removeClass('is-expanded');
                setTimeout(() => {
                    if ($('.app').hasClass('sidenav-toggled') && width <= breakpoint) {
                        $('.app').addClass('sidenav-toggled-open')
                    }
                }, 200);
            }
        });

        $('.horizontal-menu .desktop-sub-sub-sub-menu').on('click', function (e) {
            e.stopPropagation();
            if (window.innerWidth <= 1024) {
                let $this = $(this);
                let checkElement = $this.next();
                if (checkElement.is('.sub-slide-menu3') && checkElement.is(':visible')) {
                    checkElement.slideUp('normal');
                    $this.removeClass('is-open');
                    checkElement.removeClass('open');
                    checkElement.removeClass('slide-up');
                    checkElement.removeClass('collapse-up');
                    checkElement.parent('li').removeClass('is-expanded');
                    setTimeout(() => {
                        if ($('.app').hasClass('sidenav-toggled') && width <= breakpoint) {
                            $('.app').addClass('sidenav-toggled-open')
                        }
                    }, 200);
                } else if (!checkElement.is('.sub-slide-menu') && !checkElement.is('.sub-slide-menu2') && !checkElement.is('.sub-slide-menu3') && !checkElement.is('.sub-slide-menu4') && !checkElement.is('.sub-slide-menu5')) {
                    let parent = $this.parents('ul').first();
                    let ul = parent.find('ul:visible').slideUp('normal');
                    ul.removeClass('open');
                    ul.removeClass('slide-up');
                    ul.removeClass('collapse-up');
                    ul.parent('li').removeClass('is-expanded');
                    checkElement.slideDown('normal');
                    checkElement.addClass('open');
                    checkElement.addClass('slide-up');
                    checkElement.removeClass('collapse-up');
                    checkElement.parent('li').addClass('is-expanded');
                    checkElement.parent('li').siblings('li').removeClass('is-expanded');
                    parent.find('ul').not(checkElement).slideUp('normal');
                    parent.find('ul').not(checkElement).removeClass('open');
                    parent.find('ul').not(checkElement).removeClass('slide-up');
                    parent.find('ul').not(checkElement).removeClass('collapse-up');
                    parent.find('ul').not(checkElement).parent('li').removeClass('is-expanded');
                    setTimeout(() => {
                        if ($('.app').hasClass('sidenav-toggled') && width <= breakpoint) {
                            $('.app').addClass('sidenav-toggled-open')
                        }
                    }, 200);
                }
                if (checkElement.is('.sub-slide-menu3')) {
                    e.preventDefault();
                }
            }
        });
        $(document).click(function (e) {
            let $this = $(e.target);
            let b = $('.horizontal-menu .desktop-sub-sub-sub-menu').is($this);
            let c = $('.horizontal-menu .desktop-sub-sub-sub-menu').has($this).length;
            let d = $this.is('.horizontal-menu .desktop-sub-sub-sub-menu');
            if (!b && !c && !d) {
                let a = $('.horizontal-menu .desktop-sub-sub-sub-menu').next();
                a.slideUp('normal');
                a.removeClass('open');
                a.removeClass('slide-up');
                a.removeClass('collapse-up');
                a.parent('li').removeClass('is-expanded');
                setTimeout(() => {
                    if ($('.app').hasClass('sidenav-toggled') && width <= breakpoint) {
                        $('.app').addClass('sidenav-toggled-open')
                    }
                }, 200);
            }
        });

        $('.horizontal-menu .desktop-sub-sub-sub-sub-menu').on('click', function (e) {
            e.stopPropagation();
            if (window.innerWidth <= 1024) {
                let $this = $(this);
                let checkElement = $this.next();
                if (checkElement.is('.sub-slide-menu4') && checkElement.is(':visible')) {
                    checkElement.slideUp('normal');
                    $this.removeClass('is-open');
                    checkElement.removeClass('open');
                    checkElement.removeClass('slide-up');
                    checkElement.removeClass('collapse-up');
                    checkElement.parent('li').removeClass('is-expanded');
                    setTimeout(() => {
                        if ($('.app').hasClass('sidenav-toggled') && width <= breakpoint) {
                            $('.app').addClass('sidenav-toggled-open')
                        }
                    }, 200);
                } else if (!checkElement.is('.sub-slide-menu') && !checkElement.is('.sub-slide-menu2') && !checkElement.is('.sub-slide-menu3') && !checkElement.is('.sub-slide-menu4') && !checkElement.is('.sub-slide-menu5')) {
                    let parent = $this.parents('ul').first();
                    let ul = parent.find('ul:visible').slideUp('normal');
                    ul.removeClass('open');
                    ul.removeClass('slide-up');
                    ul.removeClass('collapse-up');
                    ul.parent('li').removeClass('is-expanded');
                    checkElement.slideDown('normal');
                    checkElement.addClass('open');
                    checkElement.addClass('slide-up');
                    checkElement.removeClass('collapse-up');
                    checkElement.parent('li').addClass('is-expanded');
                    checkElement.parent('li').siblings('li').removeClass('is-expanded');
                    parent.find('ul').not(checkElement).slideUp('normal');
                    parent.find('ul').not(checkElement).removeClass('open');
                    parent.find('ul').not(checkElement).removeClass('slide-up');
                    parent.find('ul').not(checkElement).removeClass('collapse-up');
                    parent.find('ul').not(checkElement).parent('li').removeClass('is-expanded');
                    setTimeout(() => {
                        if ($('.app').hasClass('sidenav-toggled') && width <= breakpoint) {
                            $('.app').addClass('sidenav-toggled-open')
                        }
                    }, 200);
                }
                if (checkElement.is('.sub-slide-menu4')) {
                    e.preventDefault();
                }
            }
        });
        $(document).click(function (e) {
            let $this = $(e.target);
            let b = $('.horizontal-menu .desktop-sub-sub-sub-sub-menu').is($this);
            let c = $('.horizontal-menu .desktop-sub-sub-sub-sub-menu').has($this).length;
            let d = $this.is('.horizontal-menu .desktop-sub-sub-sub-sub-menu');
            if (!b && !c && !d) {
                let a = $('.horizontal-menu .desktop-sub-sub-sub-sub-menu').next();
                a.slideUp('normal');
                a.removeClass('open');
                a.removeClass('slide-up');
                a.removeClass('collapse-up');
                a.parent('li').removeClass('is-expanded');
                setTimeout(() => {
                    if ($('.app').hasClass('sidenav-toggled') && width <= breakpoint) {
                        $('.app').addClass('sidenav-toggled-open')
                    }
                }, 200);
            }
        });

        $('.horizontal-menu .desktop-sub-sub-sub-sub-sub-menu').on('click', function (e) {
            e.stopPropagation();
            if (window.innerWidth <= 1024) {
                let $this = $(this);
                let checkElement = $this.next();
                if (checkElement.is('.sub-slide-menu5') && checkElement.is(':visible')) {
                    checkElement.slideUp('normal');
                    $this.removeClass('is-open');
                    checkElement.removeClass('open');
                    checkElement.removeClass('slide-up');
                    checkElement.removeClass('collapse-up');
                    checkElement.parent('li').removeClass('is-expanded');
                    setTimeout(() => {
                        if ($('.app').hasClass('sidenav-toggled') && width <= breakpoint) {
                            $('.app').addClass('sidenav-toggled-open')
                        }
                    }, 200);
                } else if (!checkElement.is('.sub-slide-menu') && !checkElement.is('.sub-slide-menu2') && !checkElement.is('.sub-slide-menu3') && !checkElement.is('.sub-slide-menu4') && !checkElement.is('.sub-slide-menu5')) {
                    let parent = $this.parents('ul').first();
                    let ul = parent.find('ul:visible').slideUp('normal');
                    ul.removeClass('open');
                    ul.removeClass('slide-up');
                    ul.removeClass('collapse-up');
                    ul.parent('li').removeClass('is-expanded');
                    checkElement.slideDown('normal');
                    checkElement.addClass('open');
                    checkElement.addClass('slide-up');
                    checkElement.removeClass('collapse-up');
                    checkElement.parent('li').addClass('is-expanded');
                    checkElement.parent('li').siblings('li').removeClass('is-expanded');
                    parent.find('ul').not(checkElement).slideUp('normal');
                    parent.find('ul').not(checkElement).removeClass('open');
                    parent.find('ul').not(checkElement).removeClass('slide-up');
                    parent.find('ul').not(checkElement).removeClass('collapse-up');
                    parent.find('ul').not(checkElement).parent('li').removeClass('is-expanded');
                    setTimeout(() => {
                        if ($('.app').hasClass('sidenav-toggled') && width <= breakpoint) {
                            $('.app').addClass('sidenav-toggled-open')
                        }
                    }, 200);
                }
                if (checkElement.is('.sub-slide-menu5')) {
                    e.preventDefault();
                }
            }
        });
        $(document).click(function (e) {
            let $this = $(e.target);
            let b = $('.horizontal-menu .desktop-sub-sub-sub-sub-sub-menu').is($this);
            let c = $('.horizontal-menu .desktop-sub-sub-sub-sub-sub-menu').has($this).length;
            let d = $this.is('.horizontal-menu .desktop-sub-sub-sub-sub-sub-menu');
            if (!b && !c && !d) {
                let a = $('.horizontal-menu .desktop-sub-sub-sub-sub-sub-menu').next();
                a.slideUp('normal');
                a.removeClass('open');
                a.removeClass('slide-up');
                a.removeClass('collapse-up');
                a.parent('li').removeClass('is-expanded');
                setTimeout(() => {
                    if ($('.app').hasClass('sidenav-toggled') && width <= breakpoint) {
                        $('.app').addClass('sidenav-toggled-open')
                    }
                }, 200);
            }
        });
        $('body').on('click', function (e) {
            if (window.innerWidth <= 1024) {
                if (!$('.horizontal-menu .desktop-menu').is(e.target) && $('.horizontal-menu .desktop-menu').has(e.target).length === 0) {
                    let a = $('.horizontal-menu .desktop-menu').next();
                    a.slideUp('normal');
                    a.removeClass('open');
                    a.removeClass('slide-up');
                    a.removeClass('collapse-up');
                    a.parent('li').removeClass('is-expanded');
                    setTimeout(() => {
                        if ($('.app').hasClass('sidenav-toggled') && width <= breakpoint) {
                            $('.app').addClass('sidenav-toggled-open')
                        }
                    }, 200);
                }
            }
        });

        if (document.querySelector('.side-menu')) {
            let slidemenu = document.querySelectorAll('.slide-menu');
            slidemenu.forEach(e => {
                if (e.classList.contains('double-menu-active')) {
                    e.classList.remove('double-menu-active')
                }
            })
        }
        let sidemenuActive = document.querySelector('.side-menu__item.active');
        if (sidemenuActive?.nextElementSibling) {
            let submenu = sidemenuActive.nextElementSibling;
            submenu.classList.add('double-menu-active');
        }

        // double sidebar
        let menuicon = document.querySelectorAll('.double-sidebar__menu-icon');
        menuicon.forEach(icon => {
            icon.addEventListener('click', function () {
                document.querySelector('.app').classList.toggle('sidenav-toggled');
                if (document.querySelector('.app').classList.contains('sidenav-toggled')) {
                    let doublemenu = document.querySelectorAll('.slide-menu');
                    doublemenu.forEach(e => {
                        if (e.classList.contains('double-menu-active')) {
                            e.classList.remove('double-menu-active')
                        }
                    })
                }
            })
        })
    });
}
