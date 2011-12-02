// Very quick & dirty stub that will be used to simulate requests passed via $.ajax();
var mockCalls = 0,
    mockjax = function(reqOptions) {
        mockCalls++;
        setTimeout(function(){
            reqOptions.success();
        }, 2500);
    };

$.ajax = mockjax;