let pla = document.getElementById("play")
pla.addEventListener("click", play)
localStorage.setItem("work", "[]" )
localStorage.setItem("messages", "[]" )
localStorage.setItem('header_inner', header.innerHTML)

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

    let res = document.getElementById("result")
    res.innerText = ""

    animArea.appendChild(square)
    work.appendChild(message)
    work.appendChild(closeBtn)
    work.appendChild(startBtn)
    work.appendChild(centre)
    work.appendChild(animArea)
    header.appendChild(work)

    //размер поля anim
    header.style.width = document.body.clientWidth + 'px'
    header.style.height = 100 + 'px'

    let workHeight = work.offsetHeight - 50
    let workWidth = work.offsetWidth - 10
    animArea.style.height = workHeight + "px"
    animArea.style.width = workWidth + "px"

    //размер square
    let squareHeight = workHeight / 2 - 10
    let squareWidth = workWidth / 2 - 10
    square.style.marginTop = squareHeight + "px"
    square.style.marginLeft = squareWidth + "px"
    square.style.marginBottom = squareHeight + "px"
    square.style.marginRight = squareWidth + "px"
}

function stop(){
    myMessage("close clicked")
    let header = document.getElementById("header")
    
    let arr = JSON.parse(localStorage.getItem("work"))
    arr.push("work disappear at " + new Date().toLocaleTimeString())
    
    localStorage.setItem("work", JSON.stringify(arr))
    header.innerHTML = localStorage.getItem('header_inner')
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
    let inte = setInterval(mov, 100)
    let square = document.getElementById("square")
    let distance = 10
    let stop_movs = document.createElement("button")
    stop_movs.id = 'stops_mov'
    stop_movs.innerText = "stop"
    let sta = document.getElementById("start")
    work.replaceChild(stop_movs, sta)

    stop_movs.onclick = function stop_mov(){
    clearInterval(inte)
    myMessage('stop clicked ')
    work.replaceChild(sta, stop_movs)
    }

    function mov(){
        let top = parseInt(square.style.marginTop.replace(/px/g, ""))
        let left = parseInt(square.style.marginLeft.replace(/px/g, ""))
        let right = parseInt(square.style.marginRight.replace(/px/g, ""))
        let bottom = parseInt(square.style.marginBottom.replace(/px/g, ""))

        if (top <= -10 || left <= -10 ||
            right <= -10 || bottom <= -10) {

            clearInterval(inte)
            let work = document.getElementById("work")
            let reload = document.createElement("button")
            reload.id = "reload"
            reload.innerText = "Reload"
            reload.addEventListener("click", reloadSquare)
            work.replaceChild(reload, stop_movs)

        } else {
            if((distance % 4) === 2 ){
                square.style.marginLeft = (left - distance) + "px"
                square.style.marginRight = (right + distance) + "px"

                myMessage("square is on right top square ")

            }else if ((distance % 4) === 1 ){
                square.style.marginTop = (top + distance) + "px"
                square.style.marginBottom = (bottom - distance) + "px"

                myMessage("square is on left top square ")

            }else if ((distance % 4) === 0 ){
                square.style.marginLeft = (left + distance) + "px"
                square.style.marginRight = (right - distance) + "px"

                myMessage("square is on left bottom square ")

            }else if ((distance % 4) === 3 ){
                square.style.marginTop = (top - distance) + "px"
                square.style.marginBottom = (bottom + distance) + "px"

                myMessage("square is on right bottom square ")

            }
            distance++
        }
    }

}


function reloadSquare(){
    myMessage("reload clicked ")
    let square = document.getElementById("square")
    let wo = document.getElementById('work')

    let he = wo.offsetHeight - 50
    let wi = wo.offsetWidth - 10

    let squarehe = he/2 - 10
    let squarewi = wi/2 - 10
    square.style.marginTop = squarehe + "px"
    square.style.marginLeft = squarewi + "px"
    square.style.marginBottom = squarehe + "px"
    square.style.marginRight = squarewi + "px"

    let sta = document.createElement("button")
    sta.innerText = "Start"
    sta.id = "start"
    sta.addEventListener("click", start)
    let reload = document.getElementById("reload")

    wo.replaceChild(sta, reload)

}



function myMessage(string) {
    let div = document.getElementById("message")
    div.innerText += `\n${string}`

    let arr = JSON.parse(localStorage.getItem("messages"))
    arr.push(string + "at " + new Date().toLocaleTimeString())
    localStorage.setItem("messages", JSON.stringify(arr))

}