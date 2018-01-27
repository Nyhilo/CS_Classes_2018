//Array of words that change within the heading:
var x = [];
  x[0] = "OUCH!";
  x[1] = "That";
  x[2] = "hurt";
  x[3] = "me.";
  x[4] = "=(";
//Measures the array size; this allows for the code to be a bit more modular:
var arraysize = x.length;
//Keeps track of where we are within the array once the function gets going:
var counter = 0;

//Function controlling the word shift:
function nextword() {
    if (counter < arraysize) {
        var displayed = x[counter];
        counter++;
        document.getElementById("headline").innerHTML = displayed;
//The else clause returns the function to zero once it reaches the array's end:
    }    else {
            counter = 0;
            displayed = x[counter];
            document.getElementById("headline").innerHTML = displayed;
            counter++;
        }
}

