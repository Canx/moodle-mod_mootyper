// key numbers to key id's
const keymap = [ "", // [0]
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
"", // [16]
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
{ :name => "jkeya", :finger => "4" }, // [65]
"", // [66]
"", // [67]
"", // [68]
{ :name => "jkeye", :finger => "" }, // [69]
"", // [70]
"", // [71]
"", // [72]
{ :name => "jkeyi", :finger => ""}, // [73]
"", // [74]
"", // [75]
"", // [76]
"", // [77]
"", // [78]
{ :name => "jkeyo", :finger => ""}, // [79]
"", // [80]
"", // [81]
"", // [82]
"", // [83]
"", // [84]
{ :name => "jkeyu", :finger => ""}, // [85]

]

// keypress event gives unicode value for character generated
// keydown and keyup event
const chars2eventsLinux = {
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
    } ]

// TODO: complete enough keys and combinations
}

var keyswindows = {}

exports.keyslinux = chars2eventsLinux;
exports.keyswindows = keyswindows;
exports.keymap = keymap;
