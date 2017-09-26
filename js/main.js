import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/owl.carousel/dist/assets/owl.carousel.min.css';
import '../css/main.css';

import Signals from 'signals.js';
import Utils from 'utils.js';
import StepChooser from 'components/step.js';

var $ = require('jquery');
window.jQuery = $;
window.$ = $;

require('owl.carousel');
require('jsrender');


/* Main function */
var BUILD_SERVICE_JSON_URL = 'http://software.opensuse.org/download.json?project=home:kamilprusko&package=gnome-pomodoro';
var PACKAGE_LABELS = {
    '_i386.deb':   '32 bit .deb',
    '_amd64.deb':  '64 bit .deb',
    '.i586.rpm':   '32 bit .rpm',
    '.i686.rpm':   '32 bit .rpm',
    '.x86_64.rpm': '64 bit .rpm'
};

var downloadWidget = null;
var downloadWidgetData = null;
var downloadWidgetTemplate = null;

$(".scroll").on('click',
    function(event) {
        event.preventDefault();
            $('html,body').animate({
                    scrollTop: $(this.hash).offset().top
                },
                900);
    });

$('#screenshots').owlCarousel({
    items: 1,
    autoWidth: true,
    autoHeight: true,
    center: true,
    dots: true,
    // lazyLoad: true,
    smartSpeed: 250,
    transitionStyle: "fade",
    responsiveBaseElement: $('#screenshots')
});

var createDownloadWidget = function() {
    let element = document.getElementById('download-widget');

    downloadWidget = new StepChooser(element, downloadWidgetData);
    downloadWidget.step.connect('update',
        function(object, step) {
            var context = step.getContext();
            context.update({
                eq: function(a, b) {
                    return Utils.Version.compare(a, b) == 0;
                },
                lt: function(a, b) {
                    return Utils.Version.compare(a, b) < 0;
                },
                lte: function(a, b) {
                    return Utils.Version.compare(a, b) <= 0;
                },
                gt: function(a, b) {
                    return Utils.Version.compare(a, b) > 0;
                },
                gte: function(a, b) {
                    return Utils.Version.compare(a, b) >= 0;
                }
            });

            /* Custom data passed to the template */

            var gnome = context.data.gnome;
            if (gnome) {
                context.data.gnome = new Utils.Version(gnome);
            }

            var repo = window.packages && window.packages[step.parent.name]
                        ? window.packages[step.parent.name][step.name]
                        : null;
            if (repo) {
                context.update(repo);
            }

            step.element.innerHTML = downloadWidgetTemplate.render(context.data);

            $(step.element).find('section:not(:first) .button-box .button-default').removeClass('button-default');
        });
};

Utils.loadTemplate('download-widget-template.html',
    function(data) {
        downloadWidgetTemplate = $.templates(data);
        // downloadWidgetTemplate = global.jsviews.templates(data);

        if (downloadWidgetData && downloadWidgetTemplate) {
            createDownloadWidget();
        }
    });

Utils.loadJSON('releases.json',
    function(data) {
        downloadWidgetData = data;

        if (downloadWidgetData && downloadWidgetTemplate) {
            createDownloadWidget();
        }
    });

/* Load packages data from Open Build Service, don't require it while building download widget */
Utils.loadJSONP(BUILD_SERVICE_JSON_URL,
    function(data) {
        var packages = {};

        function formatRelease(repoId) {
            return repoId.split('_').slice(1).join('-').toLowerCase();
        }

        function formatPackages(urls) {
            urls = urls || [];

            if (!Array.isArray(urls)) {
                var urlsArray = [];

                for (var key in urls) {  // recieved object is formatted as {filename => url}
                    urlsArray.push(urls[key]);
                }

                urls = urlsArray;
            }

            urls.sort();

            var packages = [];

            for (var i=0; i < urls.length; i++) {
                var url = urls[i];
                for (var suffix in PACKAGE_LABELS) {
                    if (Utils.stringEndsWith(url, suffix)) {
                        packages.push({
                            'label': PACKAGE_LABELS[suffix],
                            'url': url
                        });
                    }
                }
            }

            packages.sort(
                function(a, b) {
                    if (a.label < b.label)
                        return -1;

                    if (a.label > b.label)
                        return 1;

                    return 0;
                });

            return packages;
        }

        for (var repoId in data) {
            var repo = data[repoId];
            var distro = repo.flavor.toLowerCase();
            var release = formatRelease(repoId);

            if (!packages[distro]) {
                packages[distro] = {};
            }

            packages[distro][release] = {
                'packages': formatPackages(repo['package']),
                'repository': repo.repo,
                'ymp': repo.ymp
            };
        }

        window.packages = packages;
    });
