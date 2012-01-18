$.mockjax({
    url:'fake.html',
    dataType: 'html',
    responseText: "<div>Hi, I'm just a useless fragment....</div>",
    statusText: "OK"
});

$.mockjax({
    url:'fake2.html',
    dataType: 'html',
    responseText: "<div>Hi, I'm just a useless fragment....</div>",
    statusText: "OK"
});

module("TrafficCop")
var succeedCount = 0,
    req,
    testCnt = 0,
    mockCalls = 0;
asyncTest("Returning the jqXHR object", function() {
    var xhr;
    req = {
        type: "GET",
        url: "fake.html",
        data: "testData",
        success: function() {
            // nothing to see here....
        }
    };
    xhr = $.trafficCop(req).done(function(){
        start();
        ok(xhr, "jqXhr object returns");
        equals( xhr.readyState, 4, "jqXhr readyState is valid");
        equals( xhr.status, 200, "jqXhr status is 200");
        for(var i in xhr) {
            console.log(i + ": " + xhr[i]);
        }

        equals( xhr.statusText, "OK", "jqXhr statusText is OK");
        equals( xhr.responseText, "<div>Hi, I'm just a useless fragment....</div>", "jqXhr responseText matches expected");
    });
});

asyncTest("multiple calls to same end point", function(){
    testCnt = 0;
    req = {
        type: "GET",
        url: "fake.html",
        data: "testData",
        beforeSend: function() { mockCalls++; },
        success: function() {
            succeedCount++;
            testCnt++;
            if(testCnt === 5) {
                start();
                equals(mockCalls, 1, "mockCalls should equals 1");
                equals(succeedCount, 5, "succeedCount should equal 5");
                succeedCount = 0;
                mockCalls = 0;
            }
        }
    };
    setTimeout(function(){
        $.trafficCop(req);
        $.trafficCop(req);
        $.trafficCop(req);
        $.trafficCop(req);
        $.trafficCop(req);
    }, 0);
});
asyncTest("multiple calls to different end points", function(){
    testCnt = 0;
    req = {
        type: "GET",
        url: "fake.html",
        data: "testData",
        beforeSend: function() { mockCalls++; },
        success: function() {
            succeedCount++;
            testCnt++;
            if(testCnt === 8) {
                start();
                equals(mockCalls, 2, "mockCalls should equal 2");
                equals(succeedCount, 5, "succeedCount should equal 5");
                equals(succeedCountB, 3, "succeedCountB should equal 3");
                succeedCount = 0;
                succeedCountB = 0;
                mockCalls = 0;
            }
        }
    };
    var succeedCountB = 0,
        reqB = {
            type: "GET",
            url: "fake2.html",
            data: "otherData",
            beforeSend: function() { mockCalls++; },
            success: function() {
                succeedCountB++;
                testCnt++;
                if(testCnt === 8) {
                    start();
                    equals(mockCalls, 2, "mockCalls should equal 2");
                    equals(succeedCount, 5, "succeedCount should equal 5");
                    equals(succeedCountB, 3, "succeedCountB should equal 3");
                    succeedCount = 0;
                    succeedCountB = 0;
                    mockCalls = 0;
                }
            }
        };
    setTimeout(function(){
        $.trafficCop(req);
        $.trafficCop(reqB);
        $.trafficCop(req);
        $.trafficCop(req);
        $.trafficCop(reqB);
        $.trafficCop(req);
        $.trafficCop(reqB);
        $.trafficCop(req);
    }, 0);
});
asyncTest("single call to an end point", function(){
    req = {
        type: "GET",
        url: "fake.html",
        data: "testData",
        beforeSend: function() { mockCalls++; },
        success: function() {
            succeedCount++;
            start();
            equals( mockCalls, 1, "mockCalls should equal 1");
            equals( succeedCount, 1, "succeedCount should equal 1");
            succeedCount = 0;
            mockCalls = 0;
        }
    };
    setTimeout(function(){
        $.trafficCop(req);
    }, 0);
});