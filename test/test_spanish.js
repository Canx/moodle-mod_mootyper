'use scrict';

global.isNode = require('detect-node');
const util = require('util')
const assert = require('assert');
const fs = require("fs");

let jQuery = require('jquery');


Spanish = require("./fixtures/spanish.js");
Layout = require("../layouts/Spanish(V3).js");
Typer = require("../typer.js");

fixtures = {
    "aeiou" : "test/fixtures/spanish_aeiou.html",
    "AEIOU" : "test/fixtures/spanish_aeiou.html",
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
    
    addJquerylistHandler() {
	    this.$.fn.listHandlers = function(events, outputFunction) {
	        return this.each(function(i){
	            var elem = this,
	                dEvents = $(this).data('events');
	            if (!dEvents) {return;}
	            $.each(dEvents, function(name, handler){
	                if((new RegExp('^(' + (events === '*' ? '.+' : events.replace(',','|').replace(/^on/i,'')) + ')$' ,'i')).test(name)) {
	                   $.each(handler, function(i,handler){
	                       outputFunction(elem, 'n' + i + ': [' + name + '] : ' + handler );
	                   });
	               }
	            });
	        });
	    };
    }
    config(text) {
    	//global.$ = this.$;
    	global.Typer.countMistypedSpaces = false;
        global.Typer.continuousType = false;
        global.Typer.started = false;
        global.Typer.ended = false;
        global.Typer.currentPos = 0;
        global.Typer.fullText = text;
        global.Typer.currentChar = Typer.fullText.charAt(Typer.currentPos);
        document.body.innerHTML = fs.readFileSync(fixtures[text]);
        //configthis.addJquerylistHandler();
        global.inittexttoenter(text, 0, 0, 0, 0, 0, "", true, false, false);
        //$("#form1").on("keypress", "#tb1", keyPressed);
        global.focusSet();

        
    }
    
    test(keys, text) {
    	var self = this;
    	
    	this.config(text);
        assert.equal(Typer.ended, false);
    	
    	keys.forEach(function(key) {
        	var savedPos = Typer.currentPos;
        	assert.notEqual(key, undefined, "undefined key at position " + Typer.currentPos );
        	key.forEach(function(event, index, events) {
        		self.update(event);
        		
        		// we only check when new keys are pressed
        		if (event.type == "keydown") {
        	        self.testHighlight();
        	    }
        		self.trigger(event);
        		
        	});
        	
        	assert.ok(Typer.currentPos == (savedPos + 1), "Position did not increment at: " + Typer.currentPos);
        });
        
    	assert.equal(Typer.ended, true);
    }
    
    trigger(event) {
	let e = $.Event(event.type);
        e.which = event.which;
	e.keyCode = event.keyCode;
	
	let tag = document.getElementById("tb1");
    	$(tag).trigger(e);
    }
    // check that keys pressed are highlighted in the html document correctly
    testHighlight() {
        var self = this;
        this.keysPressed.forEach(function(keyCode, index, keys) {
            self.testKeyHighlighted(keyCode, keys);
        });
    }
    
    // returns true if key is next key highlighted
    testKeyHighlighted(keyCode, keys) {
    	var key = this.keymap[keyCode];
    	assert.ok(typeof(key.name) !== 'undefined', 'no keymap entry found for code ' + keyCode);
    	var htmlElement = this.$("#" + key.name).get(0);
    	assert.ok(typeof(htmlElement) !== 'undefined', "no html element found for " + key.name);
        var nextClass = "next" + key.finger;
        var msg = "key " + key.name + "("+ keyCode + ") is class:" + htmlElement.className + ", not class:" + nextClass;
        var msg = msg + ", at position " + Typer.currentPos;
        var msg = msg + ", keys pressed: " + JSON.stringify(keys);
        assert.ok(htmlElement.className == nextClass, msg);
    }
}

describe('keyPressed function', function() {
    before(function() {
    	this.jsdom = require('jsdom-global')();
    	let $ =jQuery(window);
    	global.$ = $;
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

    it('should check exercice \'AEIOU\' in Linux', function() {
        var keyboard = new KeyboardTester(Spanish.keymap, $);
    	var k = Spanish.keyslinux;
        var keys = [k.A, k.E, k.I, k.O, k.U];
	    
        var text = "AEIOU";
        
        keyboard.test(keys, text);
    });


    it('should check exercise \'áéíóú\' in Windows', function() {
    	var keyboard = new KeyboardTester(Spanish.keymap, $);
    	var k = Spanish.keyswindows;
    	var keys = [k.á, k.é, k.í, k.ó, k.ú];
    	var text = "áéíóú";
    	
    	keyboard.test(keys, text);
    });
    
    // TODO
    //it('should check exercise \|@#~€¬[]↓{} in Windows', function() {
    //}
    
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
