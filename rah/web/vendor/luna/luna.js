/**
 * LUNA - Responsive Admin Theme
 *
 */

$(document).ready(function () {

    // Handle minimalize left menu
    $(document).on('click', '.left-nav-toggle a', function(event){
        event.preventDefault();
        $("body").toggleClass("nav-toggle");
    });


    // Hide all open sub nav menu list
    $(document).on('show.bs.collapse', '.nav-second', function () {
        $('.nav-second.in').collapse('hide');
    })

    // Handle panel toggle
    $(document).on('click', '.panel-toggle', function(event){
        event.preventDefault();
        var hpanel = $(event.target).closest('div.panel');
        var icon = $(event.target).closest('i');
        var body = hpanel.find('div.panel-body');
        var footer = hpanel.find('div.panel-footer');
        body.slideToggle(300);
        footer.slideToggle(200);

        // Toggle icon from up to down
        icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        hpanel.toggleClass('').toggleClass('panel-collapse');
        setTimeout(function () {
            hpanel.resize();
            hpanel.find('[id^=map-]').resize();
        }, 50);
    });

    // Handle panel close
    $(document).on('click', '.panel-close', function(event){
        event.preventDefault();
        var hpanel = $(event.target).closest('div.panel');
        hpanel.remove();
    });
});