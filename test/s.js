var assert = require('assert');
var sorted = require('../');

exports.isSorted = function () {
    assert.ok(sorted.isSorted([5,6,7]));
    assert.ok(sorted.isSorted([0,2,4,6]));
    assert.ok(sorted.isSorted([0,3,3,3]));
    assert.ok(sorted.isSorted([]));
    assert.ok(sorted.isSorted([1]));
    assert.ok(sorted.isSorted([1,1]));
    assert.ok(sorted.isSorted([1,8,8]));
    assert.ok(sorted.isSorted([NaN]));
    
    assert.ok(sorted.isSorted([3,2,1], function (a, b) {
        if (a < b) return 1
        else if (a > b) return -1
        else return 0
    }));
    
    assert.ok(sorted.isSorted(['a','b','c']));
    
    assert.ok(!sorted.isSorted([8,7]));
    assert.ok(!sorted.isSorted([3,1,2]));
    assert.ok(!sorted.isSorted([0,1,2,NaN]));
    assert.ok(!sorted.isSorted([NaN,0,1,2]));
};

exports.random = function () {
    for (var i = 0; i < 100; i++) {
        var xs = sorted();
        for (var j = 0; j < 10; j++) {
            xs.push(Math.floor(Math.random() * (j + 1)));
            xs.unshift(Math.floor(Math.random() * (j + 1)));
        }
        assert.ok(sorted.isSorted(xs));
        assert.ok(sorted.isSorted(xs.toArray()));
    }
};

exports.concat = function () {
    assert.deepEqual(
        sorted([4,5,6]).concat(
            [2,3,4,5], 6, sorted([5,7,8,9]), sorted([21,22])
        ).toArray(),
        [ 2, 3, 4, 4, 5, 5, 5, 6, 6, 7, 8, 9, 21, 22 ]
    );
};

exports.insertArray = function () {
    var s0 = sorted([ 2, 5, 5, 9, 10, 13, 13, 15 ]);
    var s1 = sorted([]);
    var s2 = sorted([ 3 ]);
    var s3 = sorted([ 7, 8, 8, 9, 10, 11, 13, 13, 14 ]);
    
    for (var i = 0; i < 30; i++) {
        var xs = [];
        var end = Math.floor(Math.random() * 20);
        for (var j = 0; j < end; j++) {
            xs.push(Math.floor(Math.random() * (j + 1)));
        }
        
        s0.insert(xs);
        assert.ok(sorted.isSorted(s0.toArray()), s0.toArray());
        
        s1.insert(xs);
        assert.ok(sorted.isSorted(s1.toArray()), s1.toArray());
        
        s2.insert(xs);
        assert.ok(sorted.isSorted(s2.toArray()), s2.toArray());
        
        s3.insert(xs);
        assert.ok(sorted.isSorted(s3.toArray()), s3.toArray());
    }
};
