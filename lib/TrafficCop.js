(function($, undefined) {

var inProgress = {};

$.trafficCop = function(reqOptions) {
    var key = JSON.stringify(reqOptions);
    if(!inProgress[key]) {
        var remove = function() {
                delete inProgress[key];
            },
            traffic = {
                successCallbacks: [reqOptions.success],
                errorCallbacks: [reqOptions.error],
                success: function(response) {
                    $.each($(inProgress[key].successCallbacks), function(idx,item){ item(response); });
                    remove();
                },
                error: function(exception) {
                    $.each($(inProgress[key].errorCallbacks), function(idx,item){ item(exception); });
                    remove();
                }
            };
        inProgress[key] = $.extend({}, reqOptions, traffic);
        $.ajax(inProgress[key]);
    }
    else {
        inProgress[key].successCallbacks.push(reqOptions.success);
        inProgress[key].errorCallbacks.push(reqOptions.error);
    }
};


})(jQuery);