//get the window width
var win_width = $(window).width();
$(document).ready(function() {
    sideNav();
    side_menu();


});

$(window).resize(function() {
    win_width = $(window).width();
    sideNav();
});

//function using sidebar nav open and close
function sideNav() {
    if (win_width <= 767) {
        console.log(win_width);
        $('#sidebarCollapse').on('click', function() {
            $('#sidebar').addClass('active');
        });
        $('.cross-sidebar').on('click', function() {
            $('#sidebar').removeClass('active');
        });
    } else {

    }

}

// add & remove class in sidebar menu
function side_menu() {
    $('ul#homeMenu > li').click(function() {
        $('li').removeClass("active");
        $(this).addClass("active");
    });
    $('ul#homeSubmenu > li').click(function() {
        $('li').removeClass("subactive");
        $(this).addClass("subactive");
    });
    $('#homeMenu > li > a').click(function() {
        //$(this).parent().find('ul#homeSubmenu').addClass('show');//.animate({ "display": "block" }, 1000);
        // $('#homeSubmenu').removeClass('show');//.animate({ "display": "none" }, 1000);;
    });
    $('#homeMenu > li > a').click(function() {
        $(this).parents('li').siblings().find('a[aria-expanded="true"]').trigger('click');
        //$(this).parents('li').prev().find('a[aria-expanded="true"]').trigger('click');

    });

};