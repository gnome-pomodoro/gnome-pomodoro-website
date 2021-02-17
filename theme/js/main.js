function getSearchTerm() {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == 'q') {
            return sParameterName[1];
        }
    }
}

//function applyTopPadding() {
//    // Update various absolute positions to match where the main container
//    // starts. This is necessary for handling multi-line nav headers, since
//    // that pushes the main container down.
//    var offset = $('body > .container').offset();
//    $('html').css('scroll-padding-top', offset.top + 'px');
//    $('.bs-sidebar.affix').css('top', offset.top + 'px');
//}

$(document).ready(function() {

//    applyTopPadding();

    var search_term = getSearchTerm(),
        $search_modal = $('#mkdocs_search_modal');
//        $keyboard_modal = $('#mkdocs_keyboard_modal');

    if (search_term) {
        $search_modal.modal();
    }

    // make sure search input gets autofocus everytime modal opens.
    $search_modal.on('shown.bs.modal', function() {
        $search_modal.find('#mkdocs-search-query').focus();
    });

    // Close search modal when result is selected
    // The links get added later so listen to parent
    $('#mkdocs-search-results').click(function(e) {
        if ($(e.target).is('a')) {
            $search_modal.modal('hide');
        }
    });

//    // Keyboard navigation
//    document.addEventListener("keydown", function(e) {
//        if ($(e.target).is(':input')) return true;
//        var key = e.which || e.keyCode || window.event && window.event.keyCode;
//        var page;
//        switch (key) {
//            case shortcuts.next:
//                page = $('.navbar a[rel="next"]:first').prop('href');
//                break;
//            case shortcuts.previous:
//                page = $('.navbar a[rel="prev"]:first').prop('href');
//                break;
//            case shortcuts.search:
//                e.preventDefault();
//                $search_modal.modal('show');
//                $search_modal.find('#mkdocs-search-query').focus();
//                break;
//            default: break;
//        }
//        if (page) {
//            window.location.href = page;
//        }
//    });

//    $('table').addClass('table table-striped table-hover');

//    // Improve the scrollspy behaviour when users click on a TOC item.
//    $(".bs-sidenav a").on("click", function() {
//        var clicked = this;
//        setTimeout(function() {
//            var active = $('.nav li.active a');
//            active = active[active.length - 1];
//            if (clicked !== active) {
//                $(active).parent().removeClass("active");
//                $(clicked).parent().addClass("active");
//            }
//        }, 50);
//    });

//    function showInnerDropdown(item) {
//        var popup = $(item).next('.dropdown-menu');
//        popup.addClass('show');
//        $(item).addClass('open');
//
//        // First, close any sibling dropdowns.
//        var container = $(item).parent().parent();
//        container.find('> .dropdown-submenu > a').each(function(i, el) {
//            if (el !== item) {
//                hideInnerDropdown(el);
//            }
//        });
//
//        var popupMargin = 10;
//        var maxBottom = $(window).height() - popupMargin;
//        var bounds = item.getBoundingClientRect();
//
//        popup.css('left', bounds.right + 'px');
//        if (bounds.top + popup.height() > maxBottom &&
//            bounds.top > $(window).height() / 2) {
//            popup.css({
//                'top': (bounds.bottom - popup.height()) + 'px',
//                'max-height': (bounds.bottom - popupMargin) + 'px',
//            });
//        } else {
//            popup.css({
//                'top': bounds.top + 'px',
//                'max-height': (maxBottom - bounds.top) + 'px',
//            });
//        }
//    }

//    function hideInnerDropdown(item) {
//        var popup = $(item).next('.dropdown-menu');
//        popup.removeClass('show');
//        $(item).removeClass('open');
//
//        popup.scrollTop(0);
//        popup.find('.dropdown-menu').scrollTop(0).removeClass('show');
//        popup.find('.dropdown-submenu > a').removeClass('open');
//    }

//    $('.dropdown-submenu > a').on('click', function(e) {
//        if ($(this).next('.dropdown-menu').hasClass('show')) {
//            hideInnerDropdown(this);
//        } else {
//            showInnerDropdown(this);
//        }
//
//        e.stopPropagation();
//        e.preventDefault();
//    });

//    $('.dropdown-menu').parent().on('hide.bs.dropdown', function(e) {
//        $(this).find('.dropdown-menu').scrollTop(0);
//        $(this).find('.dropdown-submenu > a').removeClass('open');
//        $(this).find('.dropdown-menu .dropdown-menu').removeClass('show');
//    });
});

//$(window).on('resize', applyTopPadding);

