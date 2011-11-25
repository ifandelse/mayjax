QUnit.specify("TrafficCop", function(){
    var succeedCount = 0,
        req,
        testCnt = 0;
    test("multiple calls - mocked call count should increment only once", function(){
        req = {
            type: "POST",
            url: "test.html",
            data: "testData",
            success: function() {
                succeedCount++;
                testCnt++;
                if(testCnt === 5) {
                    start();
                    equals(mockCalls, 1, "mockCalls equals 1");
                    equals(succeedCount, 5, "succeedCount equals 5");
                    succeedCount = 0;
                    mockCalls = 0;
                }
            }
        };
        stop();
        setTimeout(function(){
            $.trafficCop(req);
            $.trafficCop(req);
            $.trafficCop(req);
            $.trafficCop(req);
            $.trafficCop(req);
        }, 0);
    });
    test("single call- mocked call and succeeded call count should increment only once", function(){
        req = {
            type: "POST",
            url: "test.html",
            data: "testData",
            success: function() {
                succeedCount++;
                console.log("Succeed Count: " + succeedCount);
                start();
                equals( mockCalls, 1, "mockCalls equals 1");
                equals( succeedCount, 1, "succeedCount equals 1");
                succeedCount = 0;
                mockCalls = 0;
            }
        };
        stop();
        setTimeout(function(){
            $.trafficCop(req);
        }, 0);
    });
});