/*
Rewriting Wolfram.js for an html canvas, because doing it with fonts is badly non-portable



Jacob CLoward 2/13/18
*/

// window.onload = function() {

  /////////////
 // Globals //
/////////////

// Shortcuts for html elements
var simField     = document.getElementById("sim-area");
var context      = simField.getContext("2d")
var simFirstLine = document.getElementById("sim-first-line");
var flContext    = simFirstLine.getContext("2d")

// Grid width and height, this will probably become more flexible later
var field = new Array();
var width   = simField.width;
var height  = simField.height;
var pixelSize = 10;

// There are 8 rules for the simulation. We'll define rule 30 as an initial state just for fun
// The array elements correspond to the rules [111,110,101,100,011,010,001,000]
var rules = [0,0,0,1,1,1,1,0];

  ////////////////////
 // Draw Functions //
////////////////////

function drawBoard() {
    for (var x = 0; x <= width; x+=pixelSize) {
        context.moveTo(x,0);
        context.lineTo(x,height);
    }

    for (var y = 0; y <= height; y+=pixelSize) {
        context.moveTo(0,y);
        context.lineTo(width,y)   
    }

    context.strokeStyle = "#dddddd";
    context.lineWidth = 2;
    context.stroke();
}

function drawPixels() {

}

  ///////////////////////
 // General Functions //
///////////////////////

// Stolen from stack overflow
// Allows us to really quickly generate an array of arbitrary multidimensional size
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    };

    return arr;
};


  //////////
 // Main //
//////////

field = createArray(height/pixelSize, width/pixelSize)
console.log(field)
drawBoard();

// }    // Closing the DOM loader at the top