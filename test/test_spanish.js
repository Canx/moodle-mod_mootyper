'use scrict';

global.isNode = require('detect-node');
const util = require('util')
const assert = require('assert');
const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");
const fs = require("fs");

chai.use(sinonChai);

Spanish = require("./fixtures/spanish.js");
k = Spanish.keyslinux;

Layout = require("../layouts/Spanish(V3).js");
Typer = require("../typer.js");

fixtures = {
    "aeiou" : "test/fixtures/spanish.html"
};

function testConfig(text) {
    global.countMistypedSpaces = false;
    global.continuousType = false;
    global.Typer.started = false;
    global.Typer.ended = false;
    global.currentPos = 0;
    global.Typer.fullText = text;
    global.Typer.currentChar = Typer.fullText.charAt(currentPos);
    document.body.innerHTML = fs.readFileSync(fixtures[text]);
    global.focusSet();
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

class KeyboardTester {
    constructor(keymap, $) {
        this.keymap = keymap;
        this.keysPressed = new Set();
        this.$ = $;
    }
    
    update(e) {
        if (e.type == "keydown") {
            this.keysPressed.add(e.keyCode);
        }
        if (e.type == "keyup") {
            this.keysPressed.delete(e.keyCode);
        }
    }
    
    // check that keys pressed are highlighted in the html document correctly
    testHighlight() {
        var self = this;
        this.keysPressed.forEach(function(keyCode) {
            self.testKeyHighlighted(keyCode);
        });
    }
    
    // returns true if key is next key highlighted
    testKeyHighlighted(keyCode) {
        var key = this.keymap[keyCode];
        var htmlElement = this.$("#" + key.name).get(0);
        var nextClass = "next" + key.finger;
        var msg = "key " + key.name + "("+ keyCode + ") is class:" + htmlElement.className + ", not class:" + nextClass;
        assert.ok(htmlElement.className == nextClass, msg);
    }
}
    


describe('keyPressed function', function() {
    before(function() {
        this.jsdom = require('jsdom-global')();
        $ = require("jquery");
        globals();
    });

    after(function() {
        this.jsdom();
    });

    it('should load the spanish layout', function() {
        assert.equal(Typer.THE_LAYOUT, "Spanish(V3)");
    });

    it('should check exercise \'aeiou\'', function() {
        testConfig("aeiou");
        var keyboard = new KeyboardTester(Spanish.keymap, $);

        // simulate pressing "aeiou" keys in sequence.
        var events = [].concat(k.a, k.e, k.i, k.o, k.u);

        assert.equal(Typer.ended, false);

        events.forEach(function(e) {
            keyboard.update(e);
            keyboard.testHighlight();
         // check that the next key is colored correctly.
            keyPressed(e);
        });

        // NOTE: Apparently currentPos doesn't increment in the last character!
        // that's why we check against 4 (5-1) characters
        assert.equal(Typer.currentPos, 4);

        assert.equal(Typer.ended, true);
    });
});

// global import helper
function globals() {
    global.isCombined = Layout.isCombined;
    global.keyupCombined = Layout.keyupCombined;
    global.keyupFirst = Layout.keyupFirst;
    global.keyboardElement = Layout.keyboardElement;
    global.thenFinger = Layout.thenFinger;
    global.getKeyID = Layout.getKeyID;
    global.isLetter = Layout.isLetter;

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

    // layout functions
    global.keyupCombined = Typer.keyupCombined;
    global.keyupFirst = Typer.keyupFirst;

    global.Typer = Typer.Typer;
    global.Typer.THE_LAYOUT = Layout.THE_LAYOUT;
}
