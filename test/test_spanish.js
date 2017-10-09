'use scrict';

global.isNode = require('detect-node');
const util = require('util')
const assert = require('assert');
const fs = require("fs");

Spanish = require("./fixtures/spanish.js");
Layout = require("../layouts/Spanish(V3).js");
Typer = require("../typer.js");

fixtures = {
    "aeiou" : "test/fixtures/spanish_aeiou.html",
    "áéíóú" : "test/fixtures/spanish_áéíóú.html"
};

// class used to test DOM keyboard status
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
    
    config(text) {
    	global.Typer.countMistypedSpaces = false;
        global.Typer.continuousType = false;
        global.Typer.started = false;
        global.Typer.ended = false;
        global.Typer.currentPos = 0;
        global.Typer.fullText = text;
        global.Typer.currentChar = Typer.fullText.charAt(Typer.currentPos);
        document.body.innerHTML = fs.readFileSync(fixtures[text]);
        global.focusSet();
        
    }
    
    test(keys, text) {
    	var self = this;
    	
    	this.config(text);
        assert.equal(Typer.ended, false);
    	
    	keys.forEach(function(key) {
        	var savedPos = Typer.currentPos;
        	
        	key.forEach(function(event) {
        		self.update(event);
        		self.testHighlight();
        		keyPressed(event);
        	});
        	
        	assert.ok(Typer.currentPos == (savedPos + 1), "Position did not increment at: " + Typer.currentPos);
        });
        
    	assert.equal(Typer.ended, true);
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
    	assert.ok(typeof(key.name) !== 'undefined', 'no keymap entry found for code ' + keyCode);
    	var htmlElement = this.$("#" + key.name).get(0);
    	assert.ok(typeof(htmlElement) !== 'undefined', "no html element found for " + key.name);
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
    
    it('should check exercise \'aeiou\' in Linux', function() {
        var keyboard = new KeyboardTester(Spanish.keymap, $);
    	var k = Spanish.keyslinux;
        var keys = [k.a, k.e, k.i, k.o, k.u];
        var text = "aeiou";
        
        keyboard.test(keys, text);

    });
    
    it('should check exercise \'áéíóú\' in Windows', function() {
    	var keyboard = new KeyboardTester(Spanish.keymap, $);
    	var k = Spanish.keyswindows;
    	var keys = [k.á, k.é, k.í, k.ó, k.ú];
    	var text = "áéíóú";
    	
    	keyboard.test(keys, text);
    });
    
    // FIX: not passing.
    it('should check exercise \'áéíóú\' in Linux', function() {
    	var keyboard = new KeyboardTester(Spanish.keymap, $);
    	var k = Spanish.keyslinux;
    	var keys = [k.á, k.é, k.í, k.ó, k.ú];
    	var text = "áéíóú";
    	
    	keyboard.test(keys, text);
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
