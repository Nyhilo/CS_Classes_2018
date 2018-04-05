/*
Rewriting Wolfram.js for an html canvas, because doing it with fonts is badly non-portable



Jacob CLoward 4/5/18
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
let cellSize   = 15;

// Grid styling
// const gridColor       = "#dddddd";
// const gridColor       = "white"
const gridColor       = "#F7F5EF"
const cellColor      = "#000000"
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
    for (let x = 0; x <= width; x+=cellSize) {
        context.moveTo(x,0);
        context.lineTo(x,height);
    }

    for (let y = 0; y <= height; y+=cellSize) {
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
    // The first line is garanteed to be one cell deep so we don't need complex vertical lines
    for (let x = 0; x <= inWidth; x+=cellSize) {
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

function drawCell(ctx, i, j) { ctx.fillRect( j*cellSize+1, (i)*cellSize+1, cellSize-2, cellSize-2 ); }

function drawBoard() {
    // Clear board
    clearBoard();
    // Smol variables
    let h = height/cellSize;
    let w = width/cellSize;

    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            if ( field[i][j] == 1) {
                drawCell(context, i, j);
            }
        }
    }
}

function drawInput() {
    clearInput();
    let w = width/cellSize;

    for (var j = 0; j < w; j++) {
        if ( inField[j] == 1 ) {
            drawCell(inContext, 0, j);
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


  //////////////////////////
 // Interation Functions //
//////////////////////////



simInput.addEventListener('click', (e) => {
    // We need to get the position of the canvas in order to click it properly
    let simInputEdge = simInput.getBoundingClientRect();

    const clickPosition = e.clientX;
    const relativePosition = clickPosition - simInputEdge.left;

    // The cell we clicked on is the relative position (by pixel) size of a cell
    position = Math.ceil(relativePosition / cellSize) - 1; // Though arrays start at 0, hence -1

    // Reverse the value of the clicked cell and redraw the board
    // if x=0, 1-(x) = 1  |  if x=1, 1-(x) = 0. Neat. 
    inField[position] = 1 - inField[position] 
    drawInput();

});



  //////////
 // Main //
//////////

// Create a 2d array that fits in the canvas
field = createArray([height/cellSize, width/cellSize]);
// Create a 1d array for the input feild. It will be initialized randomly
inField = createArray([width/cellSize]);
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

drawBoard();
drawInput();

// }    // Closing the DOM loader at the top