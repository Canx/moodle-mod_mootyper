'use scrict'

const Typer = require("../typer.js")


// external dependencies that need to be initialized!
// ended, started, currentPos, currentChar
// fullText


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



describe('keyPressed', function() {
  before(function() {
     fullText = "aeiou";
     ended = false;
     started = true;
     currentPos = 0;
     currentChar = fullText[currentPos];
  });

  it('should increment current position when no fail done', function() {
    e = {keyCode: 65,
         which: 65,
         charCode: 0,
         type: "keyup"};
    Typer._test.keyPressed(e).should.equal(false);
  });

  it('should return true when...', function() {

  });

});
