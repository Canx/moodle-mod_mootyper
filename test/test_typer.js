'use scrict'

var assert = require('assert');
var sinon = require("sinon");
var chai = require("chai");
var sinonChai = require("sinon-chai");

chai.use(sinonChai);
Typer = require("../typer.js");

beforeEach(function() {
    global.keyPressed = Typer.keyPressed;
    global.doStart = Typer.doStart;
    global.moveCursor = Typer.moveCursor;
    global.ended = false;
    global.started = true;
    global.currentPos = 0;
    Typer.fullText = "aeiou";
    global.fullText = Typer.fullText;
    global.THE_LAYOUT = "Spanish";
    global.currentChar = fullText.charAt(currentPos);
    global.mistakes = Typer.mistakes;
    global.continuousType = false;
    global.countMistypedSpaces = false;
    sinon.spy(global.moveCursor);
});

// results that need to be checked
// return value: true/false <- what's the meaning???
// call to elemOff.turnOff();
// call to nextE.turnOn();
// combinedCharWait modified.
// call to thisE.turnOff();
// call to thisE.turnOn();
// call to moveCursor();
// mistakes modified
// jquery calls that modify specific html elements...
// currentChar modified
// currentPos modified

describe('keyPressed function', function() {
    it('should increment current position if typed correctly', function() {
        var moveCursorSpy = sinon.spy(global.moveCursor);
        e = {keyCode: 65, which: 65, charCode: 0, type: "keyup"};
        keyPressed(e);

        // TODO: check why spy doesn't work!
        assert(moveCursorSpy.called);
  });
});
