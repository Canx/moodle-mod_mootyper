'use scrict'

global.isNode = require('detect-node');
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
global.moveCursor = Typer.moveCursor;
global.doTheEnd = Typer.doTheEnd;
global.getPressedChar = Typer.getPressedChar;
global.focusSet = Typer.focusSet;
global.doCheck = Typer.doCheck;
global.doStart = Typer.doStart;
global.keyPressed = Typer.keyPressed;
global.dobiSekunde = Typer.dobiSekunde;
global.timeDifference = Typer.timeDifference;
global.inittexttoenter = Typer.inittexttoenter;
global.isDigit = Typer.isDigit;
global.izracunajHitrost = Typer.izracunajHitrost;
global.izracunajTocnost = Typer.izracunajTocnost;
global.updTimeSpeed = Typer.updTimeSpeed;

global.startTime = Typer.startTime;
global.endTime = Typer.endTime;
global.mistakes = Typer.mistakes;
global.currentPos = Typer.currentPos;
global.started = Typer.started;
global.ended = Typer.ended;
global.currentChar = Typer.currentChar;
global.fullText = Typer.fullText;
global.intervalID = Typer.intervalID;
global.interval2ID = Typer.interval2ID;
global.appUrl = Typer.appUrl;
global.showKeyboard = Typer.showKeyboard;
global.THE_LAYOUT = Typer.THE_LAYOUT;
global.continuousType = Typer.continuousType;
global.countMistypedSpaces = Typer.countMistypedSpaces;
global.keyupCombined = Typer.keyupCombined;
global.keyupFirst = Typer.keyupFirst;

beforeEach(function() {
    this.jsdom = require('jsdom-global')();
    $ = require("jquery");
    // TODO: add generated html for keyboard before testing modified elements in DOM
    document.body.innerHTML = '<html><body></body></html>';

    // initialize global variables
    global.fullText = "aeiou";
    global.ended = false;
    global.started = false;
    global.currentPos = 0;
    global.currentChar = fullText.charAt(currentPos);
    global.continuousType = false;
    global.countMistypedSpaces = false;
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
    });

    after(function () {
        this.jsdom();
    });

    it('should increment current position if typed correctly', function() {

	var akey = [{keyCode: 65, which: 65, charCode: 0, type: "keydown"},
	            {keyCode: 97, which: 97, charCode: 0, type: "keypress"},
	            {keyCode: 65, which: 65, charCode: 0, type: "keyup"}];

	akey.forEach(function(e) {
            keyPressed(e);
        });

	assert.equal(currentPos, 1);
  });
  
  // FIX!
  //it('should call moveCursor if typed correctly', function() {
        //var moveCursorSpy = sinon.spy(global, 'moveCursor');
        //assert.equal(moveCursorSpy.callCount, 1);
  //});
});
