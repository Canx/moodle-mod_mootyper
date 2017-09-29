var THE_LAYOUT, continuousType, countMistypedSpaces, keyupCombined, keyupFirst;

Typer = {
	startTime : null,
	endTime : null,
	mistakes : null,
	started: false,
	ended : false,
	intervalID: -1,
	interval2ID: -1,
	appUrl: null,
	showKeyboard: null
}

function moveCursor(nextPos) {
	if (nextPos > 0 && nextPos <= fullText.length) {
		$('#crka' + (nextPos - 1)).addClass('txtGreen');
		$('#crka' + (nextPos - 1)).removeClass('txtBlue');
		$('#crka' + (nextPos - 1)).removeClass('txtRed');
	}
	if (nextPos < fullText.length) {
		$('#crka' + nextPos).addClass('txtBlue');
	}
}

// End of typing.
function doTheEnd() {
	$('#crka' + (fullText.length - 1)).addClass('txtGreen');
	$('#crka' + (fullText.length - 1)).removeClass('txtBlue');
	$('#crka' + (fullText.length - 1)).removeClass('txtRed');
	Typer.ended = true;
	clearInterval(Typer.intervalID);
	clearInterval(Typer.interval2ID);
	Typer.endTime = new Date();
	differenceT = timeDifference(Typer.startTime, Typer.endTime);
	var hours = differenceT.getHours();
	var mins = differenceT.getMinutes();
	var secs = differenceT.getSeconds();
	var samoSekunde = dobiSekunde(hours, mins, secs);
	$('input[name="rpFullHits"]').val((fullText.length + Typer.mistakes));
	$('input[name="rpTimeInput"]').val(samoSekunde);
	$('input[name="rpMistakesInput"]').val(Typer.mistakes);
	var speed = izracunajHitrost(samoSekunde);
	$('input[name="rpAccInput"]').val(
			izracunajTocnost(fullText, Typer.mistakes).toFixed(2));
	$('input[name="rpSpeedInput"]').val(speed);
	$('#tb1').attr('disabled', 'disabled');
	$('#btnContinue').css('visibility', 'visible');
	var wpm = (speed / 5) - Typer.mistakes;
	$('#jsWpm').html(wpm.toFixed(2));
	var juri = Typer.appUrl + "/mod/mootyper/atchk.php?status=3&attemptid="
			+ $('input[name="rpAttId"]').val();
	$.get(juri, function(data) {
	});
}

function getPressedChar(e) {
	var keynum;
	var keychar;
	var numcheck;
	if (window.event) {
		keynum = e.keyCode;
	} else if (e.which) {
		keynum = e.which;
	}
	if (keynum === 13) {
		keychar = '\n';
		// This hack is needed for Spanish keyboard, which uses 161 for some
		// character.
	} else if ((!keynum || keynum === 160 || keynum === 161)
			&& (keynum !== 161 && THE_LAYOUT !== 'Spanish')) {
		keychar = '[not_yet_defined]';
	} else {
		keychar = String.fromCharCode(keynum);
	}
	return keychar;
}

function focusSet(e) {
	if (!Typer.started) {
		$('#tb1').val('');
		if (Typer.showKeyboard) {
			var thisEl = new keyboardElement(fullText[0]);
			thisEl.turnOn();
		}
		return true;
	} else {
		$('#tb1').val(fullText.substring(0, currentPos));
		return true;
	}
}

function doCheck() {
	var rpMootyperId = $('input[name="rpSityperId"]').val();
	var rpUser = $('input[name="rpUser"]').val();
	var rpAttId = $('input[name="rpAttId"]').val();
	var juri = Typer.appUrl + "/mod/mootyper/atchk.php?status=2&attemptid=" + rpAttId
			+ "&mistakes=" + Typer.mistakes + "&hits="
			+ (currentPos + Typer.mistakes);
	$.get(juri, function(data) {
	});
}

function doStart() {
	Typer.startTime = new Date();
	Typer.mistakes = 0;
	currentPos = 0;
	Typer.started = true;
	currentChar = fullText[currentPos];
	Typer.intervalID = setInterval(updTimeSpeed, 1000);
	var rpMootyperId = $('input[name="rpSityperId"]').val();
	var rpUser = $('input[name="rpUser"]').val();
	var juri = Typer.appUrl + "/mod/mootyper/atchk.php?status=1&mootyperid="
			+ rpMootyperId + "&userid=" + rpUser + "&time="
			+ (Typer.startTime.getTime() / 1000);
	$.get(juri, function(data) {
		$('input[name="rpAttId"]').val(data);
	});
	Typer.interval2ID = setInterval(doCheck, 4000);
}

function keyPressed(e) {
	if (Typer.ended) {
		return false;
	}
	if (!Typer.started) {
		doStart();
	}
	var keychar = getPressedChar(e);
	if (keychar === currentChar
			|| ((currentChar === '\n' || currentChar === '\r\n'
					|| currentChar === '\n\r' || currentChar === '\r') && (keychar === ' '))) {
		if (currentPos === fullText.length - 1) { // END.
			$('#tb1').val($('#tb1').val() + currentChar);
			var elemOff = new keyboardElement(currentChar);
			elemOff.turnOff();
			doTheEnd();
			return true;
		}

		if (currentPos < fullText.length - 1) {
			var nextChar = fullText[currentPos + 1];
			if (Typer.showKeyboard) {
				var thisE = new keyboardElement(currentChar);
				thisE.turnOff();
				if (isCombined(nextChar)
						&& (thisE.shift || thisE.alt || thisE.pow
								|| thisE.uppercase_umlaut || thisE.accent)) {
					combinedCharWait = true;
				}
				var nextE = new keyboardElement(nextChar);
				nextE.turnOn();
			}
			if (isCombined(nextChar)) {
				$("#form1").off("keypress", "#tb1", keyPressed);
				$("#form1").on("keyup", "#tb1", keyupFirst);
			}
		}
		moveCursor(currentPos + 1);
		currentChar = fullText[currentPos + 1];
		currentPos++;
		return true;
	} else if (keychar === ' ' && !countMistypedSpaces) { // Ignore mistyped
		// extra spaces
		// unless set to
		// count them.
		return false;
	} else {
		Typer.mistakes++; // Typed the wrong letter so increment mistake
							// count.
		if ((!continuousType && !countMistypedSpaces)
				|| (!continuousType && countMistypedSpaces)) { // If
			// not
			// set
			// for
			// continuous
			// typing,
			// wait
			// for
			// correct
			// letter.
			return false;
		} else if (currentPos < fullText.length - 1) { // If continuous typing,
			// show wrong letter and
			// move on.
			var nextChar = fullText[currentPos + 1];
			if (Typer.showKeyboard) {
				var thisE = new keyboardElement(currentChar);
				thisE.turnOff();
				if (isCombined(nextChar)
						&& (thisE.shift || thisE.alt || thisE.pow
								|| thisE.uppercase_umlaut || thisE.accent)) {
					combinedCharWait = true;
				}
				var nextE = new keyboardElement(nextChar);
				nextE.turnOn();
			}
			if (isCombined(nextChar)) {
				$("#form1").off("keypress", "#tb1", keyPressed);
				$("#form1").on("keyup", "#tb1", keyupFirst);
			}
		}
		moveCursor(currentPos + 1);
		currentChar = fullText[currentPos + 1];
		currentPos++;
		return true;
	}
}

// Calculate time to seconds.
function dobiSekunde(hrs, mins, seccs) {
	if (hrs > 0) {
		mins = (hrs * 60) + mins;
	}
	if (mins === 0) {
		return seccs;
	} else {
		return (mins * 60) + seccs;
	}
}

// Date difference.
function timeDifference(t1, t2) {
	var yrs = t1.getFullYear();
	var mnth = t1.getMonth();
	var dys = t1.getDate();
	var h1 = t1.getHours();
	var m1 = t1.getMinutes();
	var s1 = t1.getSeconds();
	var h2 = t2.getHours();
	var m2 = t2.getMinutes();
	var s2 = t2.getSeconds();
	var ure = h2 - h1;
	var minute = m2 - m1;
	var secunde = s2 - s1;
	return new Date(yrs, mnth, dys, ure, minute, secunde, 0);
}

function inittexttoenter(ttext, tinprogress, tmistakes, thits, tstarttime,
		tattemptid, turl, tshowkeyboard, tcontinuoustype, tcountmistypedspaces) {
	$("#form1").on("keypress", "#tb1", keyPressed);
	showKeyboard = tshowkeyboard;
	continuousType = tcontinuoustype;
	countMistypedSpaces = tcountmistypedspaces;
	fullText = ttext;
	Typer.appUrl = turl;
	var tempStr = "";
	if (tinprogress) {
		$('input[name="rpAttId"]').val(tattemptid);
		Typer.startTime = new Date(tstarttime * 1000);
		Typer.mistakes = tmistakes;
		currentPos = (thits - tmistakes);
		currentChar = fullText[currentPos]; // Current character (trenutni =
		// current).
		if (Typer.showKeyboard) {
			var nextE = new keyboardElement(currentChar);
			nextE.turnOn();
			if (isCombined(currentChar)) {
				$("#form1").off("keypress", "#tb1", keyPressed);
				$("#form1").on("keyup", "#tb1", keyupCombined);
			}
		}
		Typer.started = true;
		Typer.intervalID = setInterval('updTimeSpeed()', 1000);
		Typer.interval2ID = setInterval('doCheck()', 3000);
		for (var i = 0; i < currentPos; i++) {
			var tChar = ttext[i];
			if (tChar === '\n') {
				tempStr += "<span id='crka" + i
						+ "' class='txtGreen'>&darr;</span><br>";
			} else {
				tempStr += "<span id='crka" + i + "' class='txtGreen'>" + tChar
						+ "</span>";
			}
		}
		tempStr += "<span id='crka" + currentPos + "' class='txtBlue'>"
				+ currentChar + "</span>";
		for (var j = currentPos + 1; j < ttext.length; j++) {
			var tChar = ttext[j];
			if (tChar === '\n') {
				tempStr += "<span id='crka" + j
						+ "' class='txtRed'>&darr;</span><br>";
			} else {
				tempStr += "<span id='crka" + j + "' class='txtRed'>" + tChar
						+ "</span>";
			}
		}
	} else {
		for (var i = 0; i < ttext.length; i++) {
			var tChar = ttext[i];
			if (i === 0) {
				tempStr += "<span id='crka" + i + "' class='txtBlue'>" + tChar
						+ "</span>";
				if (isCombined(tChar)) {
					$("#form1").off("keypress", "#tb1", keyPressed);
					$("#form1").on("keyup", "#tb1", keyupCombined);
				}
			} else if (tChar === '\n') {
				tempStr += "<span id='crka" + i
						+ "' class='txtRed'>&darr;</span><br>";
			} else {
				tempStr += "<span id='crka" + i + "' class='txtRed'>" + tChar
						+ "</span>";
			}
		}
	}
	$('#texttoenter').html(tempStr);
}

function isDigit(aChar) {
	myCharCode = aChar.charCodeAt(0);
	if ((myCharCode > 47) && (myCharCode < 58)) {
		return true;
	}
	return false;
}

function izracunajHitrost(sc) {
	return (((currentPos + Typer.mistakes) * 60) / sc);
}

function izracunajTocnost() {
	if (currentPos + Typer.mistakes === 0) {
		return 0;
	}
	return ((currentPos * 100) / (currentPos + Typer.mistakes));
}

function updTimeSpeed() {
	newCas = new Date();
	tDifference = timeDifference(Typer.startTime, newCas);
	var secs = dobiSekunde(tDifference.getHours(), tDifference.getMinutes(),
			tDifference.getSeconds());
	$('#jsTime').html(secs);

	$('#jsMistakes').html(Typer.mistakes);
	$('#jsProgress').html(currentPos + "/" + fullText.length);
	$('#jsSpeed').html(izracunajHitrost(secs).toFixed(2));
	$('#jsAcc').html(izracunajTocnost(fullText, Typer.mistakes).toFixed(2));
}

// For test purposes
if (typeof isNode !== 'undefined' && isNode !== null) {
	// functions
	exports.moveCursor = moveCursor;
	exports.doTheEnd = doTheEnd;
	exports.getPressedChar = getPressedChar;
	exports.focusSet = focusSet;
	exports.doCheck = doCheck;
	exports.doStart = doStart;
	exports.keyPressed = keyPressed;
	exports.dobiSekunde = dobiSekunde;
	exports.timeDifference = timeDifference;
	exports.inittexttoenter = inittexttoenter;
	exports.isDigit = isDigit;
	exports.izracunajHitrost = izracunajHitrost;
	exports.izracunajTocnost = izracunajTocnost;
	exports.updTimeSpeed = updTimeSpeed;

	// global variables
	exports.currentPos = global.currentPos;
	exports.currentChar = global.currentChar;
	exports.fullText = global.fullText;
	exports.THE_LAYOUT = global.THE_LAYOUT;
	exports.continuousType = global.continuousType;
	exports.countMistypedSpaces = global.countMistypedSpaces;
	exports.keyupCombined = global.keyupCombined;
	exports.keyupFirst = global.keyupFirst;

	exports.Typer = Typer;
}
