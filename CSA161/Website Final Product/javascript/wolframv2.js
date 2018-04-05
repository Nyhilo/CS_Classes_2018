/*
Rewriting Wolfram.js for an html canvas, because doing it with fonts is badly non-portable



Jacob CLoward 2/13/18
*/

// window.onload = function() {

  /////////////
 // Globals //
/////////////

// Shortcuts for html elements
let simField        = document.getElementById("sim-area");
let context         = simField.getContext("2d")
let simInput        = document.getElementById("sim-first-line");
let inContext       = simInput.getContext("2d")

// Grid width and height, this will probably become more flexible later
let field       = new Array();
let inField     = new Array();
let width       = simField.width;
let height      = simField.height;
let inWidth     = simInput.width;
let inHeight    = simInput.height;
let pixelSize   = 10;

// Grid styling
const gridColor       = "#dddddd";
const pixelColor      = "#000000"
const gridThickness   = 2;

// There are 8 rules for the simulation. We'll define rule 30 as an initial state just for fun
// The array elements correspond to the rules [111,110,101,100,011,010,001,000]
let rules = [0,0,0,1,1,1,1,0];


  ////////////////////
 // Draw Functions //
////////////////////

function clearBoard() {
    // Frist we clear the board
    context.beginPath();
    context.clearRect(0, 0, simField.width, simField.height);

    // Now we draw the rest of the board
    for (let x = 0; x <= width; x+=pixelSize) {
        context.moveTo(x,0);
        context.lineTo(x,height);
    }

    for (let y = 0; y <= height; y+=pixelSize) {
        context.moveTo(0,y);
        context.lineTo(width,y)   
    }

    // And stroke the grid
    context.strokeStyle = gridColor;
    context.lineWidth = gridThickness;
    context.stroke();
}

function clearInput() {
    // Frist we clear the input board
    inContext.beginPath(); 
    inContext.clearRect(0, 0, simInput.width, simInput.height);
    
    // Draw the first line board.
    // The first line is garanteed to be one pixel deep so we don't need complex vertical lines
    for (let x = 0; x <= inWidth; x+=pixelSize) {
        inContext.moveTo(x,0);
        inContext.lineTo(x,inHeight);
    }

    // Draw the top and bottom lines of the first line box
    inContext.moveTo(0,0);
    inContext.lineTo(inWidth,0);

    inContext.moveTo(0,inHeight);
    inContext.lineTo(inWidth,inHeight)

    // Stroke the first line box lines
    inContext.strokeStyle = gridColor;
    inContext.lineWidth = gridThickness;
    inContext.stroke();
}

function drawPixel(ctx, i, j) {
    ctx.fillRect(j*10+1,(i)*10+1,8,8);
}

function drawPixels() {
    // Clear board
    clearBoard();
    // Smol variables
    let h = height/pixelSize;
    let w = width/pixelSize;

    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            if ( field[i][j] == 1) {
                drawPixel(context, i, j);
            }
        }
    }

}

function drawInput() {
    clearInput();
    let w = width/pixelSize;

    for (var j = 0; j < w; j++) {
        if ( inField[j] == 1 ) {
            console.log(j);
            drawPixel(inContext, 0, j);
        }
    }
}

  ///////////////////////
 // General Functions //
///////////////////////

// Allows us to really quickly generate an array of arbitrary multidimensional size
// Takes an array of dimension sizes as an input
// For example, an input of [2,3,5] with create a 3d array of size 2x3x5
function createArray(dimensions) {
    // Pulls out the first dimentional length
    let [length, ...rest] = dimensions;
    // Creates our return array
    let arr = new Array(length || 0);

    // If there are more dimentions in the input array, create a sub-array for each index in the current array
    // and run the same formula for each of those. This is what lets us generate an array of arbitrary dimensions
    if (rest.length) {
        for (let i = 0; i < length; i++) {
            arr[i] = createArray(rest);
        }
    }

    return arr;
}


  //////////
 // Main //
//////////

// Create a 2d array that fits in the canvas
field = createArray([height/pixelSize, width/pixelSize]);
// Create a 1d array for the input feild. It will be initialized randomly
inField = createArray([width/pixelSize]);
for (var i = 0; i < inField.length; i++) {
    inField[i] = Math.round(Math.random())
}


// Generate a random field for testing
for (let i = 0; i < field.length; i++) {
    // field[0].length effectively gets the "width" of our 2d array
    for (let j = 0; j < field[0].length; j++) {
        field[i][j] = Math.round(Math.random());
    }
}
field[0] = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
field[1] = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
field[field.length-1] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

console.log(field)
clearBoard();
clearInput();
drawPixels();
drawInput();

// }    // Closing the DOM loader at the top