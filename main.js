document.addEventListener('DOMContentLoaded', function(){
    let weight_from_storage = localStorage.getItem("font-weight")
    if (weight_from_storage) {
        document.getElementById("som_text").style.fontWeight = weight_from_storage
    }
    handleInputFocus()
    // rememberOriginalText()
    const func = changeSizeINnBlock()
    setInterval(() => {
        func()     
    }, 5000)
    // for task 3
    let submit = document.getElementById("getCommit")
    submit.addEventListener("click", Task3)
    //for task 4
    let hellow = x =>console.log("Hellow " + x)
    let powerFunc = (x,y)=>console.log(x ** y)
    action(hellow, powerFunc)
    changeText()
})

const leftBlock = document.getElementById('header')
const topBlock = document.getElementById('in_intro')
const bottomBlock = document.getElementById('in_header_inner')
const bigBlock = document.getElementById('in_menu')
const smallBlock= document.getElementById('in_information')
const footerBlock= document.getElementById('footer')

localStorage.setItem('header', leftBlock.innerHTML)
localStorage.setItem('in_intro', bottomBlock.innerHTML)
localStorage.setItem('in_header_inner', topBlock.innerHTML)
localStorage.setItem('in_menu', bigBlock.innerHTML)
localStorage.setItem('in_information', smallBlock.innerHTML)
localStorage.setItem('footer', footerBlock.innerHTML)


function changeText(){

   let a=  setTimeout(function(){
      topBlock.innerHTML = localStorage.getItem('header');
   
    }, 5000);
  

    let b = setTimeout(function(){
        bigBlock.innerHTML = localStorage.getItem('in_intro');
    },10000)

  

    let c = setTimeout(function(){
        smallBlock.innerHTML = localStorage.getItem('in_header_inner');
    },15000)

   

   let d = setTimeout(function(){
        bottomBlock.innerHTML = localStorage.getItem('in_menu');
    },20000)

   let e=  setTimeout(function(){
        leftBlock.innerHTML = localStorage.getItem('in_information');

    },25000)

    let =  setTimeout(function(){
        footerBlock.innerHTML = localStorage.getItem('footer');

    },35000)
  

    let f = setTimeout(function(){
        leftBlock.innerHTML = localStorage.getItem('header')
        smallBlock.innerHTML =  localStorage.getItem('in_intro');
        bigBlock.innerHTML =  localStorage.getItem('in_header_inner');
        topBlock.innerHTML =  localStorage.getItem('in_menu');
        bottomBlock.innerHTML =  localStorage.getItem('in_information');
        footerBlock.innerHTML =  localStorage.getItem('footer');
        clearTimeout(a)
        clearTimeout(b)
        clearTimeout(c)
        clearTimeout(d)
        clearTimeout(e)
        clearTimeout(f)
    },27000)
  
}


function changeSizeINnBlock(){
    check = true
    const text = document.getElementById("in_menu")
    return function() {
        if (check){     
            let mysize = 800
            text.style.fontWeight = mysize 
            check = false
        }
        else{
            let mysize = 200
            text.style.fontWeight = mysize 
            check = true
        }
    }
}

function changeSizeINnBlocks(){
    check = true
    const text = document.getElementById("in_text")
    const text1 = document.getElementById("in_footer")
    return function() {
        console.log('check', check);
        if (check) {     
            let mysize = 800
            text.style.fontWeight = mysize 
            text1.style.fontWeight = mysize
            check = false
        }
        else{
            let mysize = 200
            text.style.fontWeight = mysize 
            text1.style.fontWeight = mysize
            check = true
        }
    }
}

function changeSize() {
    let mysize = document.getElementById("fontSize").value * 100
    document.getElementById("som_text").style.fontWeight = mysize
    localStorage.setItem("font-weight", mysize)
}

function check() {
    let chbox = document.getElementById("first")
    if (chbox.checked) {
        changeSize()
    }
    
} 
function handleInputFocus() {
    let focus_input = document.getElementById("focus_input")
    let error = document.getElementById("error")
    focus_input.onblur = on_blur.bind(this, focus_input, error)
    focus_input.onfocus = on_focus.bind(this, focus_input, error)
}

function on_blur(input, error) {
    if (!input.value.includes('@')) {
        input.classList.add('invalid')
        error.innerHTML = 'Пожалуйста, введите правильный email.'
    }
  }
  

const func = changeSizeINnBlocks()
function on_focus(input, error) {
    if (input.classList.contains('invalid')) {
        input.classList.remove('invalid')
        error.innerHTML = ""
    }
    setTimeout(() => {
        func()   
    }, 1000)
}    

//Task 3
let submit = document.getElementById("getCommit")
submit.addEventListener("click", Task3)
function Task3(){
    let author = document.getElementById("author").value
    let repository = document.getElementById("repository").value
    let addres = "https://api.github.com/repos/" + author +"/" + repository + "/commits?sha=master"

     $.ajax(addres, {
        success: function (data){
            let div = document.getElementById("result")
            div.style.background = "blue"
            div.style.color='white'
            data.forEach((com) => {
                let blockRes = document.getElementById("result")
                let innerBlockRes = document.createElement("div")
                let auth = com.commit.author.name
                let mess = com.commit.message
                let str = "<commit.author.name>: " + auth + " <commit.message>: " + mess
                innerBlockRes.innerText = str
                blockRes.appendChild(innerBlockRes)
            })
        },
        error: function (jqXHR, exception) {
            let err = ifErrror(jqXHR, exception)
            let div = document.getElementById("result")
            div.style.background = "red"
            div.innerText = err

        },
    })

    function ifErrror(){
        let msg = 'Error'
        return msg;``
    }
}

// Task 4
function action(callback1, callback2) {
    callback1("Roman")
    callback2(2,3)
}

// Task5
const editText= document.getElementById('editText')
const button = document.getElementById('show')
const arr1=  document.getElementById('arr1')
const arr2=  document.getElementById('arr2')
let array= new Array()

function isValid(value){
    return (/^\d{1,}$/ ).test(value)
}

function quickSort(arr) {
    if (arr.length < 2){
        return arr
    } 
    let pivot = arr[0]
    const left = []
    const right = []
      
    for (let i = 1; i < arr.length; i++) {
      if (pivot > arr[i]) {
        left.push(arr[i])
      } else {
        right.push(arr[i])
      }
    }
    return quickSort(left).concat(pivot, quickSort(right))
  }
button.onclick= function(){
    let num = editText.value
    if(isValid(num)){       
        for ( let i = 0; i < num; i++ ) {
            let a = Math.random() *100
            array.push(Number(a.toFixed())) 
        }
    arr1.innerHTML= array
    arr2.innerHTML = quickSort(array)
    }else{
        console.log('Ошибка! Введите число')
    }      
}



// var in_header = document.getElementById("in_text")
// var in_left = document.getElementById("in_intro")
// var in_menu = document.getElementById("in_menu")
// var in_header_inner = document.getElementById("in_header_inner")
// var in_right = document.getElementById("in_information")
// var in_footer = document.getElementById("in_footer")

// function rememberOriginalText() {
//     localStorage.setItem("in_header", in_header.innerHTML)
//     localStorage.setItem("in_left", in_left.innerHTML)
//     localStorage.setItem("in_menu", in_menu.innerHTML)
//     localStorage.setItem("in_header_inner", in_header_inner.innerHTML)
//     localStorage.setItem("in_right", in_right.innerHTML)
//     localStorage.setItem("in_footer", in_footer.innerHTML)
// }

// const editText1= document.getElementById('editText1');
// const editText2= document.getElementById('editText2');
// const editText3= document.getElementById('editText3');
// const editText4= document.getElementById('editText4');
// const editText5= document.getElementById('editText5');
// const editText6= document.getElementById('editText6');

// const button = document.getElementById('but');

// editText1.oninput = function() {
//     localStorage.setItem('text1', editText1.value); 
//     in_header.innerHTML = editText1.value;

// };
   
// button.onclick= function() {
//     localStorage.removeItem('text1')
//     in_header.innerHTML =  localStorage.getItem('in_header');
    
// }

// in_header.innerHTML = localStorage.getItem('text1');

// if (localStorage.getItem('text1')=== null) {
//     in_header.innerHTML =  localStorage.getItem('in_header');
// }
  


// const button2 = document.getElementById('but2');
// editText2.oninput = function() {
//     localStorage.setItem('text2', editText2.value) 
//     in_left.innerHTML = editText2.value;
// };
// button2.onclick= function() {
//     localStorage.removeItem('text2')
//     in_left.innerHTML =  localStorage.getItem('in_left');     
// }

// in_left.innerHTML = localStorage.getItem('text2');

// if (localStorage.getItem('text2')=== null) {
//     in_left.innerHTML =  localStorage.getItem('in_left');

// }


// const button3 = document.getElementById('but3');
// editText3.oninput = function() {
//     in_menu.innerHTML = editText3.value;
//     localStorage.setItem('text3', editText3.value) 
// };
// button3.onclick= function() {
//     localStorage.removeItem('text3')
//     in_menu.innerHTML =  localStorage.getItem('in_menu');
//     handleInputFocus()
// }
// in_menu.innerHTML = localStorage.getItem('text3');
// if (localStorage.getItem('text3')=== null) {
//     in_menu.innerHTML =  localStorage.getItem('in_menu');
// }




// const button4 = document.getElementById('but4');

// editText4.oninput = function() {
//     in_header_inner.innerHTML = editText4.value;
//     localStorage.setItem('text4', editText4.value) 
// };
// button4.onclick= function() {
//     localStorage.removeItem('text4')
//     in_header_inner.innerHTML =  localStorage.getItem('in_header_inner');
// }
// in_header_inner.innerHTML = localStorage.getItem('text4');
// if (localStorage.getItem('text4')=== null) {
//     in_header_inner.innerHTML =  localStorage.getItem('in_header_inner');
// }

// const button5 = document.getElementById('but5');

// editText5.oninput = function() {
//     in_right.innerHTML = editText5.value;
//     localStorage.setItem('text5', editText5.value) 
// };
// button5.onclick= function() {
//     localStorage.removeItem('text5')
//     in_right.innerHTML =  localStorage.getItem('in_right');
// }
// in_right.innerHTML = localStorage.getItem('text5');
// if (localStorage.getItem('text5')=== null) {
//     in_right.innerHTML =  localStorage.getItem('in_right');
// }

// const button6 = document.getElementById('but6');

// editText6.oninput = function() {
//     in_footer.innerHTML = editText6.value;
//     localStorage.setItem('text6', editText6.value) 
// };
// button6.onclick= function() {
//     localStorage.removeItem('text6')
//     in_footer.innerHTML =  localStorage.getItem('in_footer');
// }
// in_footer.innerHTML = localStorage.getItem('text6');
// if (localStorage.getItem('text6')=== null) {
//     in_footer.innerHTML =  localStorage.getItem('in_footer');

// }