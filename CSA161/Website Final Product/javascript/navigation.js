  ///////////////////////
 // Side Menu Buttons //
///////////////////////

function openInfo() {
    let infopanel = document.getElementById("info");
    let navpanel = document.getElementById("nav");
    let infobutton = document.getElementById("infobtn");
    let hamburgbutton = document.getElementById("hamburgbtn");
    let maindiv = document.getElementById("main");
    let infoWidth = infopanel.getBoundingClientRect().width 

    if (infopanel.style.left == "0px") {
        infopanel.style.left = "-335px";
        infobutton.style.left = "0px";
        hamburgbutton.style.left = "0px"
        maindiv.style.marginLeft = "0px"
        console.log("Closed Info Panel");
    } else {
        navpanel.style.left = "-335px";
        infopanel.style.left = "0px";
        infobutton.style.left = "335px";
        hamburgbutton.style.left = "335px"
        maindiv.style.marginLeft = "335px"
        console.log("Opened Info Panel");
    }
    
}

function openHamburg() {
    let infopanel = document.getElementById("info");
    let navpanel = document.getElementById("nav");
    let infobutton = document.getElementById("infobtn");
    let hamburgbutton = document.getElementById("hamburgbtn");
    let maindiv = document.getElementById("main");

    if (navpanel.style.left == "0px") {
        navpanel.style.left = "-285px";
        infobutton.style.left = "0px";
        hamburgbutton.style.left = "0px";
        maindiv.style.marginLeft = "0px"
        console.log("Closed Nav Panel");
    } else {
        navpanel.style.left = "0px";
        infopanel.style.left = "-335px";
        infobutton.style.left = "285px";
        hamburgbutton.style.left = "285px";
        maindiv.style.marginLeft = "285px"
        console.log("Opened Nav Panel");
    }
    
}