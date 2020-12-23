let pla = document.getElementById("play")
pla.addEventListener("click", play)
localStorage.setItem("work", "[]" )
localStorage.setItem("messages", "[]" )
localStorage.setItem('in_header_inner', header.innerHTML)

function cleanHeaderContent() {
    let header = document.getElementById("header")
    header.innerHTML = ''
}

function logWorkEventToLocalStorage() {
    let arr = JSON.parse(localStorage.getItem("work"))
    arr.push("work appear at " + new Date().toLocaleTimeString())
    localStorage.setItem("work", JSON.stringify(arr))
}

function play() {
    cleanHeaderContent();
    
    logWorkEventToLocalStorage();

    let work = document.createElement("div")
    work.id = "work"
    
    let closeBtn = document.createElement("button")
    closeBtn.innerText = "Close"
    closeBtn.id = "close"
    closeBtn.addEventListener("click", stop)

    let startBtn = document.createElement("button")
    startBtn.innerText = "Start"
    startBtn.id = "start"
    startBtn.onclick = start

    let animArea = document.createElement("div")
    animArea.id = "anim"

    let centre = document.createElement("div")
    centre.id = "centre"

    let square = document.createElement("div")
    square.id = "square"

    let message = document.createElement("div")
    message.id = "message"
    message.innerText = "message"

    let canvas = document.createElement("canvas")
    canvas.id = "canvas"

    work.appendChild(message)
    work.appendChild(closeBtn)
    work.appendChild(startBtn)
    work.appendChild(centre)
   
    work.appendChild(animArea)
    animArea.appendChild(canvas)
    header.appendChild(work)

    let ctx = canvas.getContext("2d");

    canvas.width = work.offsetWidth;
    canvas.height = work.offsetHeight;
    canvas.style.setProperty('left', 0 + 'px');
    canvas.style.setProperty('top', 0 + 'px');

    drawsquare(ctx, work.offsetWidth/2, work.offsetHeight/2 - 20);
}

function drawsquare(ctx, x, y) {
    ctx.beginPath();
    ctx.fillRect(x, y, 10, 15);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function stop(){
    console.log(true);
    myMessage("close clicked")
    let header = document.getElementById("header")
    let work = document.getElementById('work')
    let animArea = document.getElementById('anim')
    let canvas = document.getElementById("canvas")

    animArea.removeChild(canvas)
    header.removeChild(work)
    ///
    let arr = JSON.parse(localStorage.getItem("work"))
    arr.push("work disappear at " + new Date().toLocaleTimeString())
    ///
    localStorage.setItem("work", JSON.stringify(arr))
    header.innerHTML = localStorage.getItem('in_header_inner')
    readLocal()
}

function readLocal(){
    let res = document.getElementById("result")
    let str = localStorage.getItem("work") + localStorage.getItem("messages")
    res.innerText = str
}

function start(){
    myMessage("start clicked ")
    moveFunc()
}

function moveFunc(){
    let work = document.getElementById('work')
    let stop_movs = document.createElement("button")
    stop_movs.id = 'stops_mov'
    stop_movs.innerText = "Stop"
    
    let sta = document.getElementById("start")
    work.replaceChild(stop_movs, sta)
    
    let inte = setInterval(mov, 100)
    let square = document.getElementById("square")
    let distance = 8
    let x = work.offsetWidth/2
    let y = work.offsetHeight/2 - 20
    //
    stop_movs.onclick = function stop_mov(){
    clearInterval(inte)
    myMessage('stop clicked ')
    work.replaceChild(sta, stop_movs)
    }
    
    function mov(){
        let canvas = document.getElementById("canvas")
        let ctx = canvas.getContext("2d")
        ctx.clearRect(0, 0, canvas.width, canvas.height);


        if( (x <= -5) || (y <= -10) || (x >= work.offsetWidth) || (y >= work.offsetHeight - 5)){
            clearInterval(inte)
            drawsquare(ctx, x,  y);
            let work = document.getElementById("work")
            let sta = document.getElementById("start")
            let reload = document.createElement("button")
            reload.id = "reload"
            reload.innerText = "Reload"
            reload.addEventListener("click", reloadSquare)
            work.replaceChild(reload, stop_movs)

        }else {
            if((distance % 4) === 0 ){
                x = x - distance
                drawsquare(ctx, x,  y);
                myMessage("square is on right top square ")

            }else if ((distance % 4) === 1 ){
                y = y + distance
                drawsquare(ctx, x,  y);
                myMessage("square is on left top square ")

            }else if ((distance % 4) === 2 ){
                x = x + distance
                drawsquare(ctx, x,  y);
                myMessage("square is on left bottom square ")

            }else if ((distance % 4) === 3 ){
                y = y - distance
                drawsquare(ctx, x,  y);
                myMessage("square is on right bottom square ")

            }
            distance++
        }
    }
}


function reloadSquare(){
    myMessage("reload clicked ")
    let work = document.getElementById('work')
    let canvas = document.getElementById("canvas")
    let ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawsquare(ctx, work.offsetWidth/2, work.offsetHeight/2 - 20);

    let sta = document.createElement("button")
    sta.innerText = "Start"
    sta.id = "start"
    sta.addEventListener("click", start)
    let reload = document.getElementById("reload")

    work.replaceChild(sta, reload)

}



function myMessage(string) {
    let div = document.getElementById("message")
    div.innerText += `\n${string}`

    let arr = JSON.parse(localStorage.getItem("messages"))
    arr.push(string + "at " + new Date().toLocaleTimeString())
    localStorage.setItem("messages", JSON.stringify(arr))

}