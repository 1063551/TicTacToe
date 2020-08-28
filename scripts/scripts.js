// Pair add button
let modalBtn = document.getElementById("newGame")
let singleBtn = document.getElementById("singleChoose")
let multiBtn = document.getElementById("MultiPlayerBut")
let modal = document.querySelector(".modal")
let closeBtn = document.querySelector(".close-btn")
modalBtn.onclick = function(){
    modal.style.display = "block"
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
closeBtn.onclick = function(){
    modal.style.display = "none"
}
singleBtn.onclick = function(){
    modal.style.display = "none"
    displayGrid()
}
multiBtn.onclick = function(){
    modal.style.display = "none"
    displayGrid()
}
window.onclick = function(e){
    if(e.target == modal){
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
    let grid = document.getElementById("Grid")
    for (let i = 0; i < 9; i++) {
        let element = document.createElement("div");
        element.setAttribute("class", "grid-item");
        element.setAttribute("id", "grid-item" + i);
        switch (i) {
            case 0:
                element.setAttribute("style", "border-left: 0px; border-top: 0px;")
                break;
            case 1:
                element.setAttribute("style", "border-top: 0px;")
                break;
            case 2:
                element.setAttribute("style", "border-right: 0px; border-top: 0px;")
                break;
            case 3:
            case 5:
                if (i == 3) { element.setAttribute("style", "border-left: 0px;") }
                if (i == 5) { element.setAttribute("style", "border-right: 0px;") }
                break;
            case 6:
                element.setAttribute("style", "border-left: 0px; border-bottom: 0px;")
                break;
            case 7:
                element.setAttribute("style", "border-bottom: 0px;")
                break;
            case 8:
                element.setAttribute("style", "border-right: 0px; border-bottom: 0px;")
                break;
            default:
                break;
        }
        grid.appendChild(element);
    }
    return
}