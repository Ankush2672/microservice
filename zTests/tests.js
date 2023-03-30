const {add,sub,sumSquare} = require('./some_testMethods');
const  chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

describe('some_testMethods', function() {
    it('should add two numbers', function() {
        expect(add(1,2)).to.equal(3);
    });

    it('should add two -ve numbers', function() {
        expect(add(-1,-2)).to.equal(-3);
    });

    it('should add 0 if not provided', function() {
        expect(add(0)).to.equal(0);
    });

    it('should add the number if one provided', function() {
        expect(add(4)).to.equal(4);
    });

    it('should subtract two numbers', function() {
        expect(sub(3,2)).to.equal(1);
    });

    it('should return the square of the sum', function() {
        const spy = sinon.spy(add);
        expect(sumSquare(2,2)).to.equal(16);
        // expect(spy.calledWith(2,2)).to.be.true;
    });
});
