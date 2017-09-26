/**
 * Utils.loadJSON function
 *
 * Convenience method for making a json requests.
 */
var loadJSON = function(url, callback) {
    var request = new XMLHttpRequest();
    request.overrideMimeType('application/json');
    request.open('GET', url, true);
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == '200') {
            var data = JSON.parse(request.responseText);

            callback(data);
        }
    };
    request.send(null);
};


/**
 * Get JSONP data for cross-domain AJAX requests
 * @param  {String} url      The URL of the JSON request
 * @param  {Func}   callback The callback function to run on load
 */
var _callbackId = 0;
var loadJSONP = function(url, callback) {
    if (callback) {
        var callbackName = '_loadJSONP_callback' + _callbackId;
        _callbackId++;

        window[callbackName] = function(data) {
            delete window[callbackName];
            callback(data);
        };

        url = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    }

    var element = window.document.createElement('script');
    element.type  = 'application/javascript';
    element.src   = url;
    element.async = true;

    // After the script is loaded and executed, remove it
    element.onload = function () {
        this.remove();
    };

    document.getElementsByTagName('head')[0].appendChild(element);
};


/**
 * Utils.loadTemplate function
 *
 * Convenience method for loading a template file.
 */
var loadTemplate = function(url, callback) {
    var request = new XMLHttpRequest();
    request.overrideMimeType('text/x-jsrender');
    request.open('GET', url, true);
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == '200') {
            callback(request.responseText);
        }
    };
    request.send(null);
};


var stringEndsWith = function(string, searchString) {
    var position = string.length - searchString.length;
    var lastIndex = string.toString().indexOf(searchString, position);

    return lastIndex !== -1 && lastIndex === position;
};

/**
 * Utils.Version class
 *
 * A class for holding version strings.
 */
var Version = function(string) {
    string = String(string);

    var isNumeric = true;
    var parts = string.split('.').map(
        function(value) {
            var number = parseInt(value, 10);

            if (isNaN(number)) {
                isNumeric = false;
                return value;
            }
            else {
                return number;
            }
        });

    this.string = string;
    this.isNumeric = isNumeric;
    this.parts = parts;
};

Version.prototype.toString = function() {
    return this.string;
};

Version.prototype.lt = function(version) {
    return Version.compare(this, version) < 0;
};

Version.prototype.gt = function(version) {
    return Version.compare(this, version) > 0;
};

Version.prototype.eq = function(version) {
    return Version.compare(this, version) == 0;
};

Version.prototype.lte = function(version) {
    return Version.compare(this, version) <= 0;
};

Version.prototype.gte = function(version) {
    return Version.compare(this, version) >= 0;
};

Version.compare = function(a, b) {
    if (a === b)
        return 0;

    if (a === undefined)
        return -1;

    if (b === undefined)
        return 1;

    if (!(a instanceof Version))
        a = new Version(a);

    if (!(b instanceof Version))
        b = new Version(b);

    if (a.string == b.string)
        return 0;

    if (a.isNumeric != b.isNumeric)
        return a.isNumeric > b.isNumeric ? 1 : -1;

    var minLength = Math.min(a.parts.length, b.parts.length);

    for (var i=0; i < minLength; i++) {
        if (a.parts[i] > b.parts[i])
            return 1;

        if (a.parts[i] < b.parts[i])
            return -1;
    }

    return a.parts.length > b.parts.length ? 1 : -1;
};


/**
 * Utils.Context class
 *
 * A wrapper for basic object with convinience methods.
 */
var Context = function(data) {
    this.data = data || {};
};

Context.prototype.copy = function() {
    var data = {};

    Object.keys(this.data).forEach(
        function(key) {
            data[key] = this.data[key];
        }.bind(this));

    return new Context(data);
};

Context.prototype.update = function(data) {
    Object.keys(data).forEach(
        function(key) {
            this.data[key] = data[key];
        }.bind(this));
};


var Utils = {
    loadJSON: loadJSON,
    loadJSONP: loadJSONP,
    loadTemplate: loadTemplate,
    stringEndsWith: stringEndsWith,
    Version: Version,
    Context: Context
};

export default Utils;
