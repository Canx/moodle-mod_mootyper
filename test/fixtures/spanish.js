// key numbers to key id's
const keymap = [ 
{ name: "jkeyrighttick", finger: "4"}, // [0] Not sure if this is right, it could be other key...
"", // [1]
"", // [2]
"", // [3]
"", // [4]
"", // [5]
"", // [6]
"", // [7]
"", // [8]
"", // [9]
"", // [10]
"", // [11]
"", // [12]
"", // [13]
"", // [14]
"", // [15]
{ name: "jkeyshiftd", finger: "4" }, // [16]
"", // [17]
"", // [18]
"", // [19]
"", // [20]
"", // [21]
"", // [22]
"", // [23]
"", // [24]
"", // [25]
"", // [26]
"", // [27]
"", // [28]
"", // [29]
"", // [30]
"", // [31]
"", // [32]
"", // [33]
"", // [34]
"", // [35]
"", // [36]
"", // [37]
"", // [38]
"", // [39]
"", // [40]
"", // [41]
"", // [42]
"", // [43]
"", // [44]
"", // [45]
"", // [46]
"", // [47]
"", // [48]
"", // [49]
"", // [50]
"", // [51]
"", // [52]
"", // [53]
"", // [54]
"", // [55]
"", // [56]
"", // [57]
"", // [58]
"", // [59]
"", // [60]
"", // [61]
"", // [62]
"", // [63]
"", // [64]
{ name: "jkeya", finger: "4" }, // [65]
"", // [66]
"", // [67]
"", // [68]
{ name: "jkeye", finger: "2" }, // [69]
"", // [70]
"", // [71]
"", // [72]
{ name: "jkeyi", finger: "2"}, // [73]
"", // [74]
"", // [75]
"", // [76]
"", // [77]
"", // [78]
{ name: "jkeyo", finger: "3"}, // [79]
"", // [80]
"", // [81]
"", // [82]
"", // [83]
"", // [84]
{ name: "jkeyu", finger: "1"}, // [85]
"", // [86]
"", // [87]
"", // [88]
"", // [89]
"", // [90]
"", // [91]
"", // [92]
"", // [93]
"", // [94]
"", // [95]
"", // [95]
"", // [96]
"", // [97]
"", // [98]
"", // [99]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [100]
"", // [200]
"", // [200]
"", // [200]
"", // [200]
"", // [200]
"", // [200]
"", // [200]
"", // [200]
"", // [200]
"", // [200]
"", // [200]
"", // [200]
"", // [200]
"", // [200]
"", // [200]
"", // [200]
"", // [200]
"", // [200]
"", // [200]
"", // [200]
"", // [200]
"", // [200]
"", // [200]
"", // [200]
"", // [200]
"", // [200]
"", // [200]
"", // [200]
"", // [200]
{ name: "jkeyrighttick", finger: "4"}, // [229]
]

// keypress event gives unicode value for character generated
// keydown and keyup event
const keyEventsLinux = {
    a : [ {
        keyCode : 65,
        which : 65,
        charCode : 0,
        type : "keydown"
    }, {
        keyCode : 97,
        which : 97,
        charCode : 97,
        type : "keypress"
    }, {
        keyCode : 65,
        which : 65,
        charCode : 0,
        type : "keyup"
    } ],

    e : [ {
        keyCode : 69,
        which : 69,
        charCode : 0,
        type : "keydown"
    }, {
        keyCode : 101,
        which : 101,
        charCode : 101,
        type : "keypress"
    }, {
        keyCode : 69,
        which : 69,
        charCode : 0,
        type : "keyup"
    } ],

    i : [ {
        keyCode : 73,
        which : 73,
        charCode : 0,
        type : "keydown"
    }, {
        keyCode : 105,
        which : 105,
        charCode : 105,
        type : "keypress"
    }, {
        keyCode : 73,
        which : 73,
        charCode : 0,
        type : "keyup"
    } ],

    o : [ {
        keyCode : 79,
        which : 79,
        charCode : 0,
        type : "keydown"
    }, {
        keyCode : 111,
        which : 111,
        charCode : 111,
        type : "keypress"
    }, {
        keyCode : 79,
        which : 79,
        charCode : 0,
        type : "keyup"
    } ],

    u : [ {
        keyCode : 85,
        which : 85,
        charCode : 0,
        type : "keydown"
    }, {
        keyCode : 117,
        which : 117,
        charCode : 117,
        type : "keypress"
    }, {
        keyCode : 85,
        which : 85,
        charCode : 0,
        type : "keyup"
    } ],

    A : [ {
        keyCode : 16,
        which : 16,
        charCode : 0,
        type : "keydown"
    }, {
        keyCode : 65,
        which : 65,
        charCode : 0,
        type : "keydown"
    }, {
        keyCode : 65,
        which : 65,
        charCode : 65,
        type : "keypress"
    }, {
        keyCode : 65,
        which : 65,
        charCode : 0,
        type : "keyup"
    }, {
        keyCode : 16,
        which : 16,
        charCode : 0,
        type : "keyup"
    } ],
    
    E : [ {
        keyCode : 16,
        which : 16,
        charCode : 0,
        type : "keydown"
    }, {
        keyCode : 69,
        which : 69,
        charCode : 0,
        type : "keydown"
    }, {
        keyCode : 69,
        which : 69,
        charCode : 69,
        type : "keypress"
    }, {
        keyCode : 69,
        which : 69,
        charCode : 0,
        type : "keyup"
    }, {
        keyCode : 16,
        which : 16,
        charCode : 0,
        type : "keyup"
    } ],
    
    I : [ {
        keyCode : 16,
        which : 16,
        charCode : 0,
        type : "keydown"
    }, {
        keyCode : 73,
        which : 73,
        charCode : 0,
        type : "keydown"
    }, {
        keyCode : 73,
        which : 73,
        charCode : 73,
        type : "keypress"
    }, {
        keyCode : 73,
        which : 73,
        charCode : 0,
        type : "keyup"
    }, {
        keyCode : 16,
        which : 16,
        charCode : 0,
        type : "keyup"
    } ],
    
    O : [ {
        keyCode : 16,
        which : 16,
        charCode : 0,
        type : "keydown"
    }, {
        keyCode : 79,
        which : 79,
        charCode : 0,
        type : "keydown"
    }, {
        keyCode : 79,
        which : 79,
        charCode : 79,
        type : "keypress"
    }, {
        keyCode : 79,
        which : 79,
        charCode : 0,
        type : "keyup"
    }, {
        keyCode : 16,
        which : 16,
        charCode : 0,
        type : "keyup"
    } ],
    
    U : [ {
        keyCode : 16,
        which : 16,
        charCode : 0,
        type : "keydown"
    }, {
        keyCode : 85,
        which : 85,
        charCode : 0,
        type : "keydown"
    }, {
        keyCode : 85,
        which : 85,
        charCode : 85,
        type : "keypress"
    }, {
        keyCode : 85,
        which : 85,
        charCode : 0,
        type : "keyup"
    }, {
        keyCode : 16,
        which : 16,
        charCode : 0,
        type : "keyup"
    } ],

    á : [ {
        keyCode : 222,
        which : 222,
        charCode : 0,
        type : "keyup"
    }, {
        keyCode : 229,
        which : 229,
        charCode : 0,
        type : "keydown"
    }, {
        data : "á",
        type : "textInput"
    }, {
        keyCode : 65,
        which : 65,
        charCode : 0,
        type : "keyup"
    } ],
    
    é: [ {
        keyCode : 222,
        which : 222,
        charCode : 0,
        type : "keyup"
    }, {
        keyCode : 229,
        which : 229,
        charCode : 0,
        type : "keydown"
    }, {
        data : "é",
        type : "textInput"
    }, {
        keyCode : 69,
        which : 69,
        charCode : 0,
        type : "keyup"
    } ],
    
    í: [ {
        keyCode : 222,
        which : 222,
        charCode : 0,
        type : "keyup"
    }, {
        keyCode : 229,
        which : 229,
        charCode : 0,
        type : "keydown"
    }, {
        data : "í",
        type : "textInput"
    }, {
        keyCode : 73,
        which : 73,
        charCode : 0,
        type : "keyup"
    } ],
    
    ó: [ {
        keyCode : 222,
        which : 222,
        charCode : 0,
        type : "keyup"
    }, {
        keyCode : 229,
        which : 229,
        charCode : 0,
        type : "keydown"
    }, {
        data : "ó",
        type : "textInput"
    }, {
        keyCode : 79,
        which : 79,
        charCode : 0,
        type : "keyup"
    } ],
    
    ú: [ {
        keyCode : 222,
        which : 222,
        charCode : 0,
        type : "keyup"
    }, {
        keyCode : 229,
        which : 229,
        charCode : 0,
        type : "keydown"
    }, {
        data : "ú",
        type : "textInput"
    }, {
        keyCode : 85,
        which : 85,
        charCode : 0,
        type : "keyup"
    } ]
    
// TODO: complete enough keys and combinations
}

var keyEventsWindows = {
		a : [ {
	        keyCode : 65,
	        which : 65,
	        charCode : 0,
	        type : "keydown"
	    }, {
	        keyCode : 0,
	        which : 97,
	        charCode : 97,
	        type : "keypress"
	    }, {
	        keyCode : 65,
	        which : 65,
	        charCode : 0,
	        type : "keyup"
	    } ],

	    e : [ {
	        keyCode : 69,
	        which : 69,
	        charCode : 0,
	        type : "keydown"
	    }, {
	        keyCode : 0,
	        which : 101,
	        charCode : 101,
	        type : "keypress"
	    }, {
	        keyCode : 69,
	        which : 69,
	        charCode : 0,
	        type : "keyup"
	    } ],

	    i : [ {
	        keyCode : 73,
	        which : 73,
	        charCode : 0,
	        type : "keydown"
	    }, {
	        keyCode : 0,
	        which : 105,
	        charCode : 105,
	        type : "keypress"
	    }, {
	        keyCode : 73,
	        which : 73,
	        charCode : 0,
	        type : "keyup"
	    } ],

	    o : [ {
	        keyCode : 79,
	        which : 79,
	        charCode : 0,
	        type : "keydown"
	    }, {
	        keyCode : 0,
	        which : 111,
	        charCode : 111,
	        type : "keypress"
	    }, {
	        keyCode : 79,
	        which : 79,
	        charCode : 0,
	        type : "keyup"
	    } ],

	    u : [ {
	        keyCode : 85,
	        which : 85,
	        charCode : 0,
	        type : "keydown"
	    }, {
	        keyCode : 0,
	        which : 117,
	        charCode : 117,
	        type : "keypress"
	    }, {
	        keyCode : 85,
	        which : 85,
	        charCode : 0,
	        type : "keyup"
	    } ],
	    
		á: [ {
			keyCode : 0,
			which : 0,
			charCode : 0,
			type : "keydown"
		}, {
			keyCode : 0,
			which : 0,
			charCode : 0,
			type : "keyup"
		}, {
			keyCode : 65,
			which : 65,
			charCode : 0,
			type : "keydown"
		}, {
			keyCode : 0,
			which : 225,
			charCode : 225,
			type : "keypress"
		}, {
			keyCode : 65,
			which : 65,
			charCode : 0,
			type : "keyup"
		} ],
		
		é: [ {
			keyCode : 0,
			which : 0,
			charCode : 0,
			type : "keydown"
		}, {
			keyCode : 0,
			which : 0,
			charCode : 0,
			type : "keyup"
		}, {
			keyCode : 69,
			which : 69,
			charCode : 0,
			type : "keydown"
		}, {
			keyCode : 0,
			which : 233,
			charCode : 233,
			type : "keypress"
		}, {
			keyCode : 69,
			which : 69,
			charCode : 0,
			type : "keyup"
		} ],
		
		í: [ {
			keyCode : 0,
			which : 0,
			charCode : 0,
			type : "keydown"
		}, {
			keyCode : 0,
			which : 0,
			charCode : 0,
			type : "keyup"
		}, {
			keyCode : 73,
			which : 73,
			charCode : 0,
			type : "keydown"
		}, {
			keyCode : 0,
			which : 237,
			charCode : 237,
			type : "keypress"
		}, {
			keyCode : 73,
			which : 73,
			charCode : 0,
			type : "keyup"
		} ],
		
		ó: [ {
			keyCode : 0,
			which : 0,
			charCode : 0,
			type : "keydown"
		}, {
			keyCode : 0,
			which : 0,
			charCode : 0,
			type : "keyup"
		}, {
			keyCode : 79,
			which : 79,
			charCode : 0,
			type : "keydown"
		}, {
			keyCode : 0,
			which : 243,
			charCode : 243,
			type : "keypress"
		}, {
			keyCode : 79,
			which : 79,
			charCode : 0,
			type : "keyup"
		} ],
		
		ú: [ {
			keyCode : 0,
			which : 0,
			charCode : 0,
			type : "keydown"
		}, {
			keyCode : 0,
			which : 0,
			charCode : 0,
			type : "keyup"
		}, {
			keyCode : 85,
			which : 85,
			charCode : 0,
			type : "keydown"
		}, {
			keyCode : 0,
			which : 250,
			charCode : 250,
			type : "keypress"
		}, {
			keyCode : 85,
			which : 85,
			charCode : 0,
			type : "keyup"
		} ],
		
}

exports.keyslinux = keyEventsLinux;
exports.keyswindows = keyEventsWindows;
exports.keymap = keymap;
