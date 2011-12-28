(function($, undefined) {

var inProgress = {};

$.trafficCop = function(url, options) {
    var reqOptions = url, key;
    if(arguments.length === 2) {
        reqOptions = $.extend(true, options, { url: url });
    }
    key = JSON.stringify(reqOptions);
    if(inProgress[key]) {
        inProgress[key].successCallbacks.push(reqOptions.success);
        inProgress[key].errorCallbacks.push(reqOptions.error);
        return;
    }

    var traffic = {
            successCallbacks: [reqOptions.success],
            errorCallbacks: [reqOptions.error],
            success: function() {
                var args = arguments;
                $.each($(inProgress[key].successCallbacks), function(idx,item){ item.apply(null, args); });
            },
            error: function() {
                var args = arguments;
                $.each($(inProgress[key].errorCallbacks), function(idx,item){ item.apply(null, args); });
            }
        };
    inProgress[key] = $.extend(true, {}, reqOptions, traffic);
    return $.ajax(inProgress[key]).always(function () { delete inProgress[key]; });
};

})(jQuery);