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
    this.length = xs.length;
    
    this.compare = cmp || function (a, b) {
        return a > b ? 1 : a < b ? -1 : 0;
    };
};

Sorted.prototype.push = Sorted.prototype.unshift = function (x) {
    if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++) {
            this.push(arguments[i]);
        }
    }
    else {
        var i = this.findIndex(x);
        this.elements.splice(i, 0, x);
    }
    
    this.length = this.elements.length;
    return this.elements.length;
};

Sorted.prototype.splice = function (ix, len) {
    var res = this.elements.splice(ix, len);
    
    for (var i = 2; i < arguments.length; i++) {
        this.push(arguments[i]);
    }
    
    this.length = this.elements.length;
    return res;
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

Sorted.prototype.indexOf = function (x) {
    var i = this.findIndex(x);
    return this.elements[i] === x ? i : -1;
};
