var arr = []
var dragged
const row = 9;
const col = 9;

var startI, startJ, endI, endJ

function createBoard() {
    var arr = [];
    for (var i = 0; i < row; i++) {
      var rowArr = [];
      for (var j = 0; j < col; j++) {
        var value = true;
        if (i < 3 && j < 3) value = false
        if (i < 3 && j > 5) value = false
        if (i > 5 && j < 3) value = false
        if (i > 5 && j > 5) value = false
        rowArr.push({ piece: value, background: value });
      }
      arr.push(rowArr);
    }
    arr[4][4] = { piece: false, background: true }
    return arr;
}
function renderBoard() {
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            var backgroundClass
            if (arr[i][j].background) {
                backgroundClass = "polje";
            } else{
                backgroundClass = "prazno";
            }
            var divPolje = document.createElement("div");
            divPolje.dataset.x = i;
            divPolje.dataset.y = j;
            divPolje.dataset.piece = arr[i][j].piece;
            divPolje.classList.add(backgroundClass);
           
            /* events fired on the drop targets */
            divPolje.addEventListener("dragover", function( event ) {
                // prevent default to allow drop
                event.preventDefault();

            }, false);

            divPolje.addEventListener("dragenter", function( event ) {
                // highlight potential drop target when the draggable element enters it
                event.target.style.background = "#2b86b1"; //"purple"
                console.log("DragEnter")
            }, false);

            divPolje.addEventListener("dragleave", function( event ) {
                // reset background of potential drop target when the draggable element leaves it
                event.target.style.background = "";
                console.log("DragLeave")
            }, false);

            divPolje.addEventListener("drop", function( event ) {
                // prevent default action (open as link for some elements)
                event.preventDefault();
                endI = parseInt(event.target.getAttribute("data-x"));
                endJ = parseInt(event.target.getAttribute("data-y"));
                // move dragged elem to the selected drop target
                if (ruleCheck()){
                    dragged.parentNode.removeChild( dragged );
                    event.target.appendChild( dragged ); 
                    arr[startI][startJ].piece = false;
                    let middleI = (startI + endI)/2
                    let middleJ = (startJ + endJ)/2
                    arr[middleI][middleJ].piece = false
                    //OVde cu da prckam dalje :D
                    const myNode = document.querySelectorAll('[data-x=`${middleI}`][data-y=`${middleJ}`]');
                    console.log(`${middleI}, ${middleJ}`)
                    // myNode.innerHTML = '';
                    console.log(myNode.innerHTML)
                }
                event.target.style.background = "";

                console.log("Drop");
            }, false);
            // <div data-x="0" data-y="0" data-piece="false" class="prazno"></div>
            document.getElementById("app").appendChild(divPolje);
            if (arr[i][j].piece){
                var divFigura = document.createElement("div");
                divFigura.classList.add("figura");
                divFigura.setAttribute('draggable', true);
                divFigura.addEventListener('drag', function(ev) {
                    ev.preventDefault();
                    
                    
                // console.log("radim Drag");
                })
                divFigura.addEventListener('dragstart', function(ev) {
                    startI = parseInt(ev.target.parentElement.getAttribute("data-x")) 
                    startJ = parseInt(ev.target.parentElement.getAttribute("data-y"))
                    dragged = ev.target
                    ev.dataTransfer.setData("text/plain", null);

                })
                divFigura.addEventListener('dragend', function(ev) {
                })
                divPolje.appendChild(divFigura);
            }
        }
    }
}
function ruleCheck(){
    // return true
    console.log(`startI = ${startI}, startJ = ${startJ}, endI = ${endI}, endJ = ${endJ}`)
    // if ( Math.abs((startI + startJ) - (endI + endJ)) !== 2) break
    if ( (startI === endI) && Math.abs(startJ - endJ) == 2 && arr[endI][(startJ + endJ)/2].piece === true && arr[endI][endJ].piece === false && arr[endI][endJ].background === true) {
        console.log("true_1")
        return true 
    }
    // else {console.log("ne moze 1")}

    if ( (startJ === endJ) && Math.abs(startI - endI) == 2 && arr[endJ][(startI + endI)/2].piece === true && arr[endI][endJ].piece === false && arr[endI][endJ].background === true) {
         console.log("true_2")
         return true 
    }
    else {console.log("ne moze 2")}
    return false
    
}



// 4 2 u 4 4 radi
// startI = 4;
// startJ = 2;
// endI = 4;
// endJ = 4;
arr = createBoard(9, 9);
renderBoard();
//ruleCheck();

