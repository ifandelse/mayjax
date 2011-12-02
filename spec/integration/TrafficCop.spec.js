QUnit.specify("TrafficCop", function(){
    test("Returning the jqXHR object", function() {
        var xhr,
            req = {
                type: "GET",
                url: "fake.html",
                data: "testData",
                success: function() {
                    // nothing to see here....
                }
            };
        stop();
        xhr = $.trafficCop(req).done(function(){
            start();
            ok(xhr, "jqXhr object returns");
            equals( xhr.readyState, 4, "jqXhr readyState is valid");
            equals( xhr.status, 200, "jqXhr status is 200");
            equals( xhr.statusText, "OK", "jqXhr statusText is OK");
            equals( xhr.responseText, "<div>Hi, I'm just a useless fragment....</div>", "jqXhr responseText matches expected");
        });
    });
});