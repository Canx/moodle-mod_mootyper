'use scrict'

global.isNode = require('detect-node');
const util = require('util')
const assert = require('assert');
const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");
const fs = require("fs");

chai.use(sinonChai);


k = require("./fixtures/spanish.js").keyslinux;
Layout = require("../layouts/Spanish(V3).js");
Typer = require("../typer.js");

fixtures = {
	"aeiou": "test/fixtures/spanish.html"
};

function testconfig(text) {
    global.countMistypedSpaces = false;
    global.continuousType = false;
    global.started = false;
    global.Typer.ended = false;
    global.currentPos = 0;
    global.fullText = text;
    global.currentChar = fullText.charAt(currentPos);
    document.body.innerHTML = fs.readFileSync(fixtures[text]);
}

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
// call to doTheEnd when finished exercise.

describe('keyPressed function', function() {
    before(function () {
        this.jsdom = require('jsdom-global')();
        $ = require("jquery");
        globals();
    });

    after(function () {
        this.jsdom();
    });

    it('should load the spanish layout', function() {
        assert.equal(THE_LAYOUT, "Spanish(V3)");	
    });

    it('should finish exercise if all keys typed correctly', function() {
        testconfig("aeiou");

	// simulate pressing "aeiou" keys in sequence.
        var events = [].concat(k.a, k.e, k.i, k.o, k.u);

	assert.equal(Typer.ended, false);

	events.forEach(function(e) {
            keyPressed(e);
        });

	// NOTE: Apparently currentPos doesn't increment in the last character!
	// that's why we check against 4 (5-1) characters
	assert.equal(currentPos, 4);

	assert.equal(Typer.ended, true);
  });
});



// global import helper
function globals() {
    global.isCombined = Layout.isCombined;
    global.THE_LAYOUT = Layout.THE_LAYOUT;
    global.keyupCombined = Layout.keyupCombined;
    global.keyupFirst = Layout.keyupFirst;
    global.keyboardElement = Layout.keyboardElement;
    global.thenFinger = Layout.thenFinger;
    global.getKeyID = Layout.getKeyID;
    global.isLetter = Layout.isLetter;
    global.showKeyboard = Layout.showKeyboard;

    global.moveCursor = Typer.moveCursor;
    //global.ended = Typer.Typer.ended;
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

    global.Typer = Typer.Typer;
}
