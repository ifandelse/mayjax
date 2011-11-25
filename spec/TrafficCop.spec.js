QUnit.specify("TrafficCop", function(){
    var succeedCount = 0,
        req,
        testCnt = 0;
    test("multiple calls to same end point", function(){
        testCnt = 0;
        req = {
            type: "POST",
            url: "test.html",
            data: "testData",
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
        stop();
        setTimeout(function(){
            $.trafficCop(req);
            $.trafficCop(req);
            $.trafficCop(req);
            $.trafficCop(req);
            $.trafficCop(req);
        }, 0);
    });
    test("multiple calls to different end points", function(){
        testCnt = 0;
        req = {
            type: "POST",
            url: "test.html",
            data: "testData",
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
                type: "POST",
                url: "testB.html",
                data: "otherData",
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
        stop();
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
    test("single call to an end point", function(){
        req = {
            type: "POST",
            url: "test.html",
            data: "testData",
            success: function() {
                succeedCount++;
                console.log("Succeed Count: " + succeedCount);
                start();
                equals( mockCalls, 1, "mockCalls should equal 1");
                equals( succeedCount, 1, "succeedCount should equal 1");
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