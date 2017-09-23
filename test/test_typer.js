'use scrict'

var assert = require('assert');
var sinon = require("sinon");
var chai = require("chai");
var sinonChai = require("sinon-chai");

chai.use(sinonChai);

Layout = require("../layouts/Spanish(V21).js");
global.isCombined = Layout.isCombined;
global.THE_LAYOUT = Layout.THE_LAYOUT;
global.keyupCombined = Layout.keyupCombined;
global.keyupFirst = Layout.keyupFirst;
global.keyboardElement = Layout.keyboardElement;
global.thenFinger = Layout.thenFinger;
global.getKeyID = Layout.getKeyID;
global.isLetter = Layout.isLetter;
global.showKeyboard = Layout.showKeyboard;

Typer = require("../typer.js");
global.keyPressed = Typer.keyPressed;
global.doStart = Typer.doStart;
global.moveCursor = Typer.moveCursor;
global.mistakes = Typer.mistakes;


beforeEach(function() {
    // typer.js initialization
    global.ended = false;
    global.started = true;
    global.currentPos = 0;
    global.fullText = "aeiou";
    global.currentChar = fullText.charAt(currentPos);
    global.continuousType = false;
    global.countMistypedSpaces = false;
    sinon.spy(global.moveCursor);
});

// keyPressed side effects that could be tested:
//
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
    before(function () {
        this.jsdom = require('jsdom-global')()
	// TODO: add generated html for keyboard before testing modified elements in DOM
        document.body.innerHTML = '<html><body></body></html>';
        $ = require("jquery");
    });

    after(function () {
        this.jsdom()
    });

    it('should increment current position if typed correctly', function() {
        var moveCursorSpy = sinon.spy(global, 'moveCursor');

	var akey = [{keyCode: 65, which: 65, charCode: 0, type: "keydown"},
	            {keyCode: 97, which: 97, charCode: 0, type: "keypress"},
	            {keyCode: 65, which: 65, charCode: 0, type: "keyup"}];

	akey.forEach(function(e) {
            keyPressed(e);
        });

	assert.equal(currentPos, 1);
        assert.equal(moveCursorSpy.callCount, 1);
  });
});
