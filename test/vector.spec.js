describe("vector.js", function() {

	var Vector;

	it("should load", function() {
		expect(function() {
			Vector = require("../vector.js");
		}).not.toThrow();
	});

	it("should export an object", function() {
		expect(Vector).toBeDefined();
	});
	
	describe("vector object", function() {
		
		it("should be instantiable", function() {
			expect(function() {
				var instance = new Vector([1,0,0]);
			}).not.toThrow();
		});
		
		it("should be instantiable without the new keyword", function() {
			expect(function() {
				var instance = Vector([0,1,0]);
			}).not.toThrow();
		});
		
		it("should not throw if no values passed", function() {
			expect(function() {
				var instance = Vector();
			}).not.toThrow();
		});
		
		it("should be of size 2 if no values passed", function() {
			var instance = Vector();
			expect(instance.size).toEqual(2);
		});
		
		it("should be of size x if one value is passed", function() {
			var x = 5;
			var instance = Vector(x);
			expect(instance.size).toEqual(x);
		});
		
		it("should be of size x if one value is passed in array form", function() {
			var x = 5;
			var instance = Vector([x]);
			expect(instance.size).toEqual(x);
		});
		
		it("should have values x, y, z if x, y, z are passed in array form", function() {
			var instance = Vector([3, 2, 4]);
			expect(instance.value).toEqual([3, 2, 4]);
		});

		describe("getter and setter functions", function() {

			it("should be defined", function() {
				var instance = Vector();
				expect(instance.get).toBeDefined();
				expect(instance.set).toBeDefined();
			});

			it("should work", function() {
				var instance = Vector();

				expect(function() {
					instance.set(0)(4);
				}).not.toThrow();

				expect(instance.get(0)).toBe(4);

			});

		});

		describe("zero function", function() {

			it("should reset the vector to all zeros", function() {
				var instance = Vector([3, 2, 4]);
				
				instance.zero();
				expect(instance.value).toEqual([0, 0, 0]);
			});

		});

		describe("reset function", function() {

			it("should reset the vector to an identity vector", function() {
				var instance = Vector([3, 2, 4]);
				
				instance.reset();
				expect(instance.value).toEqual([1, 0, 0]);
			});

		});

	});

});