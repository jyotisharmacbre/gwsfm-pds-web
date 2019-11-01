$(document).ready(function () {
    sideNav();
});

//function using sidebar nav open and close
function sideNav() {
    $('#sidebarCollapse').on('click', function () {
        $('.logo').css({ 'display': 'block' });
        $('#sidebar').addClass('active');
        $(this).addClass('active');
    });
    $('.logo').on('click', function () {
        $(this).css({ 'display': 'none' });
        $('#sidebar').removeClass('active');
        $('#sidebarCollapse').removeClass('active');
    });
}