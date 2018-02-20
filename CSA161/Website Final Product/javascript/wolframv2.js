/*
Rewriting Wolfram.js for an html canvas, because doing it with fonts is badly non-portable



Jacob CLoward 2/13/18
*/

// window.onload = function() {

  /////////////
 // Globals //
/////////////

// Shortcuts for html elements
var simField        = document.getElementById("sim-area");
var context         = simField.getContext("2d")
var simFirstLine    = document.getElementById("sim-first-line");
var flContext       = simFirstLine.getContext("2d")

// Grid width and height, this will probably become more flexible later
var field       = new Array();
var width       = simField.width;
var height      = simField.height;
var flWidth     = simFirstLine.width;
var flHeight    = simFirstLine.height;
var pixelSize   = 10;

// Grid styling
var gridColor       = "#dddddd";
var pixelColor      = "#000000"
var gridThickness   = 2;

// There are 8 rules for the simulation. We'll define rule 30 as an initial state just for fun
// The array elements correspond to the rules [111,110,101,100,011,010,001,000]
var rules = [0,0,0,1,1,1,1,0];


  ////////////////////
 // Draw Functions //
////////////////////

function drawBoard() {
    // Frist we clear both boards
    context.beginPath();
    flContext.beginPath();
    context.clearRect(0, 0, simField.width, simField.height);
    flContext.clearRect(0, 0, simFirstLine.width, simFirstLine.height);
    // Draw the first line board.
    // The first line is garanteed to be one pixel deep so we don't need complex vertical lines
    for (var x = 0; x <= flWidth; x+=pixelSize) {
        flContext.moveTo(x,0);
        flContext.lineTo(x,flHeight);
    }

    // Draw the top and bottom lines of the first line box
    flContext.moveTo(0,0);
    flContext.lineTo(flWidth,0);

    flContext.moveTo(0,flHeight);
    flContext.lineTo(flWidth,flHeight)

    // Stroke the first line box lines
    flContext.strokeStyle = gridColor;
    flContext.lineWidth = gridThickness;
    flContext.stroke();

    // Now we draw the rest of the board
    for (var x = 0; x <= width; x+=pixelSize) {
        context.moveTo(x,0);
        context.lineTo(x,height);
    }

    for (var y = 0; y <= height; y+=pixelSize) {
        context.moveTo(0,y);
        context.lineTo(width,y)   
    }

    // And stroke the grid
    context.strokeStyle = gridColor;
    context.lineWidth = gridThickness;
    context.stroke();
}

function drawPixels() {
    drawBoard();
    h = height/pixelSize;
    w = width/pixelSize;

    for (var i = 1; i < h; i++) {
        for (var j = 0; j < w; j++) {
            if ( field[i][j] == 1) {
                context.fillRect(j*10+1,(i-1)*10+1,8,8);
            }
        }
    }

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

field = createArray(height/pixelSize+1, width/pixelSize)
// Generate a random field for testing
for (var i = 0; i < height/pixelSize+1; i++) {
    for (var j = 0; j < width/pixelSize; j++) {
        field[i][j] = Math.round(Math.random());
    }
}
field[0][0] = [1,1]
console.log(field)
drawBoard();
drawPixels();

// }    // Closing the DOM loader at the top