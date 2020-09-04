// gamemode variable
var gMode = 23
// 0 for single
// 1 for mult

// gameBoard object 
var gBoard = null

// counter for the turns (starts the player)
let count = 0

// var to know how many removes we have to do
let rem = 0

// Pair add button
let modalBtn = document.getElementById("newGame")
let singleBtn = document.getElementById("singleChoose")
let multiBtn = document.getElementById("MultiPlayerBut")
let modal = document.querySelector(".modal")
let closeBtn = document.querySelector(".close-btn")
modalBtn.onclick = function () {
    modal.style.display = "block"
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
closeBtn.onclick = function () {
    modal.style.display = "none"
}
singleBtn.onclick = function () {
    modal.style.display = "none"
    gMode = 0
    resetGrid()
    displayGrid()
}
multiBtn.onclick = function () {
    modal.style.display = "none"
    gMode = 1
    resetGrid()
    displayGrid()
}
window.onclick = function (e) {
    if (e.target == modal) {
        modal.style.display = "none"
    }
}

//         <div id = "Grid">
//             <div class="grid-item">1</div>
//             <div class="grid-item">2</div>
//             <div class="grid-item">3</div>
//             <div class="grid-item">4</div>
//             <div class="grid-item">5</div>
//             <div class="grid-item">6</div>
//             <div class="grid-item">7</div>
//             <div class="grid-item">8</div>
//             <div class="grid-item">9</div>
//         </div>

function displayGrid() {
    //         <button id="redo" style="background-color: white; border: 0"><img src="imgs/redo.png"
    //             style="width:50px;"></button>

    let container = document.getElementById("container")
    let redoBtn = document.createElement("button")
    redoBtn.setAttribute("id", "redo")
    redoBtn.setAttribute("style", "background-color: white; border: 0")
    let imageRedo = document.createElement("img")
    imageRedo.setAttribute("src", "./imgs/redo.png")
    imageRedo.setAttribute("style", "width: 50px;")
    redoBtn.appendChild(imageRedo)
    redoBtn.onclick = function () {
        resetGrid()
        displayGrid()
    }
    container.appendChild(redoBtn)
    rem++

    var tmpArr = []
    let grid = document.getElementById("Grid")
    for (let i = 0; i < 9; i++) {
        let element = document.createElement("button");
        element.setAttribute("class", "grid-item");
        element.setAttribute("id", "grid-item" + i);
        switch (i) {
            case 0:
                element.setAttribute("style", "border-left: 0px; border-top: 0px; background-color: white;")
                break;
            case 1:
                element.setAttribute("style", "border-top: 0px; background-color: white;")
                break;
            case 2:
                element.setAttribute("style", "border-right: 0px; border-top: 0px; background-color: white;")
                break;
            case 3:
            case 5:
                if (i == 3) { element.setAttribute("style", "border-left: 0px; background-color: white;") }
                if (i == 5) { element.setAttribute("style", "border-right: 0px; background-color: white;") }
                break;
            case 6:
                element.setAttribute("style", "border-left: 0px; border-bottom: 0px; background-color: white;")
                break;
            case 7:
                element.setAttribute("style", "border-bottom: 0px; background-color: white;")
                break;
            case 8:
                element.setAttribute("style", "border-right: 0px; border-bottom: 0px; background-color: white;")
                break;
            default:
                element.setAttribute("style", "background-color: white;")
                break;
        }
        tmpArr.push(element.id)
        grid.appendChild(element);
    }
    gBoard = new Gameboard(tmpArr, gMode)
    setClick(gridArray)
    return
}

function resetGrid() {
    document.getElementById("Grid").innerHTML = ""
    let c = document.getElementById("container")
    if (c.childElementCount > 5) {
        while (true) {
            if (c.lastElementChild.getAttribute("id") == "redo") {
                c.removeChild(c.lastElementChild);
                count = 0;
                return;
            }
            c.removeChild(c.lastElementChild);
        }
    }
    count = 0
}

// Gameboard object
function Gameboard(arr, gm) {
    gridArray = arr
    gameMode = gm
}

// We set up onClick events for the grid
function setClick(arr) {
    for (let i = 0; i < 9; i++) {
        let s = "btn" + i
        s = document.getElementById(arr[i])
        s.onclick = function () {
            console.log("clicked " + arr[i])
            if (!s.hasChildNodes()) {
                // It has at least one
                console.log(count)
                if (count % 2 == 0 || gMode == 0) {
                    // <button id="grida"><img src="imgs/O.png" style="width:80px;"></button>
                    // <button id="gridaa"><img src="imgs/X.png" style="width:65px;"></button>
                    let im = document.createElement("img")
                    im.setAttribute("src", "./imgs/O.png")
                    im.setAttribute("style", "width:80px;")
                    im.setAttribute("value", "O")
                    s.appendChild(im)

                    if (gMode == 0 && count < 4) {
                        let loop = true
                        while (loop != false) {
                            let randN = Math.floor((Math.random() * 9) + 0);
                            let randEl = document.getElementById(arr[randN])
                            if (randEl.hasChildNodes() == false) {
                                let im = document.createElement("img")
                                im.setAttribute("src", "./imgs/X.png")
                                im.setAttribute("style", "width:65px;")
                                im.setAttribute("value", "X")
                                randEl.appendChild(im)
                                loop = false
                            }
                        }
                    }
                } else if (count % 2 != 0 && gMode != 0) {
                    let im = document.createElement("img")
                    im.setAttribute("src", "./imgs/X.png")
                    im.setAttribute("style", "width:65px;")
                    im.setAttribute("value", "X")
                    s.appendChild(im)
                }
                count++
                let r = checkWin()
                if (r[0] == true) {
                    let container = document.getElementById("container")
                    let p = document.createElement("p")
                    p.innerText = "CIRCLES WIN";
                    container.append(p);
                    rem++;
                    fillEmpty();
                } else if (r[1] == true) {
                    let container = document.getElementById("container")
                    let p = document.createElement("p")
                    p.innerText = "CROSSES WIN";
                    container.append(p)
                    rem++;
                    fillEmpty();
                }
            }
        }
    }
}

function fillEmpty() {
    for (let i = 0; i < 9; i++) {
        let gridEl = document.getElementById(gridArray[i])
        if (gridEl.hasChildNodes() == false) {
            let x = document.createElement("p")
            gridEl.append(x)
        }
    }
}

function checkWin() {
    // m.childNodes[0].getAttribute("value") -> "O"
    let aux1
    let aux2
    let ret
    var o = false
    var x = false
    for (let i = 0; i < 9; i++) {
        let gridEl = document.getElementById(gridArray[i])
        if (gridEl.hasChildNodes() == true) {
            let val = gridEl.childNodes[0].getAttribute("value")
            switch (i) {
                case 0:
                    aux1 = document.getElementById(gridArray[1])
                    aux2 = document.getElementById(gridArray[2])

                    ret = check(aux1, aux2, val)
                    if (ret == true) {
                        gridEl.style.removeProperty('background-color')
                        gridEl.style.backgroundColor = '#b8ffc5';
                        aux1.style.removeProperty('background-color')
                        aux1.style.backgroundColor = '#b8ffc5';
                        aux2.style.removeProperty('background-color')
                        aux2.style.backgroundColor = '#b8ffc5';
                        (val == "O") ? o = true : x = true; return [o, x]
                    }

                    aux1 = document.getElementById(gridArray[3])
                    aux2 = document.getElementById(gridArray[6])

                    ret = check(aux1, aux2, val)
                    if (ret == true) {
                        gridEl.style.removeProperty('background-color')
                        gridEl.style.backgroundColor = '#b8ffc5';
                        aux1.style.removeProperty('background-color')
                        aux1.style.backgroundColor = '#b8ffc5';
                        aux2.style.removeProperty('background-color')
                        aux2.style.backgroundColor = '#b8ffc5';
                        (val == "O") ? o = true : x = true; return [o, x]
                    }

                    aux1 = document.getElementById(gridArray[4])
                    aux2 = document.getElementById(gridArray[8])

                    ret = check(aux1, aux2, val)
                    if (ret == true) {
                        gridEl.style.removeProperty('background-color')
                        gridEl.style.backgroundColor = '#b8ffc5';
                        aux1.style.removeProperty('background-color')
                        aux1.style.backgroundColor = '#b8ffc5';
                        aux2.style.removeProperty('background-color')
                        aux2.style.backgroundColor = '#b8ffc5';
                        (val == "O") ? o = true : x = true; return [o, x]
                    }
                    break;
                case 1:
                    aux1 = document.getElementById(gridArray[4])
                    aux2 = document.getElementById(gridArray[7])

                    ret = check(aux1, aux2, val)
                    if (ret == true) {
                        gridEl.style.removeProperty('background-color')
                        gridEl.style.backgroundColor = '#b8ffc5';
                        aux1.style.removeProperty('background-color')
                        aux1.style.backgroundColor = '#b8ffc5';
                        aux2.style.removeProperty('background-color')
                        aux2.style.backgroundColor = '#b8ffc5';
                        (val == "O") ? o = true : x = true; return [o, x]
                    }
                    break;
                case 2:
                    aux1 = document.getElementById(gridArray[5])
                    aux2 = document.getElementById(gridArray[8])

                    ret = check(aux1, aux2, val)
                    if (ret == true) {
                        gridEl.style.removeProperty('background-color')
                        gridEl.style.backgroundColor = '#b8ffc5';
                        aux1.style.removeProperty('background-color')
                        aux1.style.backgroundColor = '#b8ffc5';
                        aux2.style.removeProperty('background-color')
                        aux2.style.backgroundColor = '#b8ffc5';
                        (val == "O") ? o = true : x = true; return [o, x]
                    }

                    aux1 = document.getElementById(gridArray[4])
                    aux2 = document.getElementById(gridArray[6])

                    ret = check(aux1, aux2, val)
                    if (ret == true) {
                        gridEl.style.removeProperty('background-color')
                        gridEl.style.backgroundColor = '#b8ffc5';
                        aux1.style.removeProperty('background-color')
                        aux1.style.backgroundColor = '#b8ffc5';
                        aux2.style.removeProperty('background-color')
                        aux2.style.backgroundColor = '#b8ffc5';
                        (val == "O") ? o = true : x = true; return [o, x]
                    }
                    break;
                case 3:
                    aux1 = document.getElementById(gridArray[4])
                    aux2 = document.getElementById(gridArray[5])

                    ret = check(aux1, aux2, val)
                    if (ret == true) {
                        gridEl.style.removeProperty('background-color')
                        gridEl.style.backgroundColor = '#b8ffc5';
                        aux1.style.removeProperty('background-color')
                        aux1.style.backgroundColor = '#b8ffc5';
                        aux2.style.removeProperty('background-color')
                        aux2.style.backgroundColor = '#b8ffc5';
                        (val == "O") ? o = true : x = true; return [o, x]
                    }
                    break;
                case 6:
                    aux1 = document.getElementById(gridArray[7])
                    aux2 = document.getElementById(gridArray[8])

                    ret = check(aux1, aux2, val)
                    if (ret == true) {
                        gridEl.style.removeProperty('background-color')
                        gridEl.style.backgroundColor = '#b8ffc5';
                        aux1.style.removeProperty('background-color')
                        aux1.style.backgroundColor = '#b8ffc5';
                        aux2.style.removeProperty('background-color')
                        aux2.style.backgroundColor = '#b8ffc5';
                        (val == "O") ? o = true : x = true; return [o, x]
                    }
                    break;
                default:
                    break;
            }
        }
    }
    return [o, x]
}

function check(aux1, aux2, val) {
    if (aux1.hasChildNodes() == true && aux2.hasChildNodes() == true) {
        if (aux1.childNodes[0].getAttribute("value") == val && aux2.childNodes[0].getAttribute("value") == val && aux1.childNodes[0].getAttribute("value") == aux2.childNodes[0].getAttribute("value")) {
            return true
        }
    }
    return false
}
