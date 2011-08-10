var sorted = module.exports = function (xs, cmp) {
    if (typeof xs === 'function') {
        cmp = arguments[0];
        xs = arguments[1];
    }
    
    if (!xs) xs = [];
    var isSorted = false;
    
    for (var i = 1; i < xs.length; i++) {
        if (xs[i-1] > xs[i]) isSorted = false;
    }
    
    return sorted.fromSorted(
        isSorted ? xs.slice() : xs.slice().sort()
    );
};

sorted.fromSorted = function (xs, cmp) {
    return new Sorted(xs, cmp);
};

var Sorted = exports.Sorted = function (xs, cmp) {
    this.elements = xs;
    
    this.compare = cmp || function (a, b) {
        return a > b ? 1 : a < b ? -1 : 0;
    };
};

Sorted.prototype.push = Sorted.prototype.unshift = function (x) {
    var i = this.findIndex(x);
    this.elements.splice(i, 0, x);
    return this;
};

Sorted.prototype.findIndex = function (x) {
    var elems = this.elements;
    
    for (var i = 0, j = elems.length; ;) {
        var k = Math.floor((i + j) / 2);
        if (k === elems.length) break;
        if (i === j) break;
        
        var cmp = this.compare(x, elems[k]);
        if (cmp === 0) break;
        else if (cmp < 0) j = k;
        else if (cmp > 0) i = k + 1;
        else throw new RangeError(
            'Unstable comparison result for compare('
            + x + ', ' + elems[k] + ') : ' + cmp + ')'
        );
    }
    
    return k;
};
