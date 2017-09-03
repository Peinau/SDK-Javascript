'use strict';

//
// Example of a typescript compiled module test
//

// require module exposed in index.js
var calc = require('../index').Calculator;

var chai = require('chai');
var expect = chai.expect;
var log4js = require('log4js'), util = require('util');

var log = log4js.getLogger('textExample');

describe('Calculator', function () {

	// instance subject to testing
	var subject;

    beforeEach(function () {
        subject = new calc();
    });

	describe('#add', function () {
        it('should add two numbers together', function () {
            var result = subject.add(2, 3);
            if (result !== 5) {
                throw new Error('Expected 2 + 3 = 5 but was ' + result);
            }
        });
    });
});