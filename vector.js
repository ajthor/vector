// Vector.js
// =========

// Vector.js is a custom library in JavaScript which provides a 
// Vector reference data-type object for use in JavaScript projects. 
// It provides certain mathematical functions related to vectors 
// which are useful in some mathematical applications.

'use strict';

// Require undrscore.
var _ = require("underscore");

// Vector Object 
// =============
// This is the main object in the Vector.js library. Treated as a 
// reference data-type from here on. As a design decision, the vector 
// contains a __1-dimensional array which is irrespective of x or y 
// direction__, i.e. it is set up as a vector with one row and  
// multiple columns.
var Vector = module.exports = function Vector(size) {
	if(!(this instanceof Vector)) return new Vector(size);
	if(typeof size === 'undefined' || size === null) {
		size = [2];
	}

	var element;

	// Force size into an array format and then into a format 
	// which can be used by the constructor function.
	if(!Array.isArray(size)) size = [size];

	// The Vector value object is where all values in the array are 
	// stored. It is a non-enumerable property defined as a 1D array 
	// with size specified at creation.
	Object.defineProperty(this, 'value', {
		value: [],
		configurable: false,
		enumerable: false,
		writable: true
	});


	// Dimensional properties of the vector.
	Object.defineProperty(this, 'size', {
		value: (size.length > 1) ? size.length : size[0],
		writable: false
	});

	// If the argument is longer than 1 element, it is assumed to 
	// contain the values of the vector. Populate the values of the 
	// vector with the provided values.
	if(size.length > 1) {
		for(element = 0; element < size.length; element++) {
			this.value[element] = size[element];
		}
	}
	else {
		this.reset();
	}
};

_.extend(Vector.prototype, {
	// Custom Getter and Setter Functions
	// ----------------------------------
	// These functions are custom getter and setter methods for the 
	// `value` property defined on the Vector object above. These 
	// allow for a more intuitive (I think) way to access and set the 
	// values of the vector.

	// Example usage:
	// 
	//     A = new Vector(5);
	//     A.set(3)(4);
	//     console.log(A.value); //[ 0, 0, 0, 4, 0 ]
	//     console.log(A.get(3)); // 4

	get: function(i) {
		return this.value[i];
	},

	set: function(i) {
		return (function(_value) {
			this.value[i] = _value;
		}).bind(this);
	},

	valueOf: function() {
		return this.value;
	},

	copy: function(V) {
		var element;
		if(!(V instanceof Vector)) V = new Vector(V);
		for(element = 0; element < V.size; element++) {
			this.value[element] = V.value[element];
		}
	},

	clone: function() {
		var result = new this.constructor(this.size);
		result.copy(this);
		return result;
	},
	// Map Function
	// ------------
	// Cycles over each value in a vector and modifies that value 
	// based on the result of a callback.
	map: function(cb, handler) {
		handler || (handler = this);
		if(!_.isFunction(cb)) throw 'Must pass a function to the \'map\' function.';
		var element, result;
		for(element = 0; element < this.size; element++) {
			result = null;
			result = cb.call(handler, this.value[element], element, this);
			if((typeof result !== 'undefined') && (result !== null))
				this.value[element] = result;
		}
	},
	// ForEach Function
	// ----------------
	// Cycles over each value in a vector and passes the value and 
	// indices to a custom callback function.
	forEach: function(cb, handler) {
		handler || (handler = this);
		if(!_.isFunction(cb)) throw 'Must pass a function to the \'forEach\' function.';
		var element;
		for(element = 0; element < this.size; element++) {
			cb.call(handler, this.value[element], element, this);
		}
	},

	reset: function() {
		this.zero();
		this.value[0] = 1;
	},

	// The zero function is for resetting the vector to be populated 
	// by zeros or a `value` specified by the user. `value` argument 
	// can be a function in case the user wishes to do some math 
	// before setting.
	zero: function(value) {
		value || (value = 0);
		for(var i = 0; i < this.size; i++) {
			if(_.isFunction(value)) this.value[i] = value();
			else this.value[i] = value;
		}
	}
});

_.extend(Vector, {

	join: function(A, B) {
		var result = [];
		result = A.value.concat(B.value);
		result = new Vector(result);
		return result;
	}

}, {

	// Vector Math Functions
	// =====================

	add: function() {},
	sub: function() {},

	cross: function() {},

	product: function() {}
});

// Vector Prototype Math Functions
// ===============================
_.extend(Vector.prototype, {
	add: function() {},
	sub: function() {},

	cross: function() {},

	product: function() {},

	pow: function() {}
});


