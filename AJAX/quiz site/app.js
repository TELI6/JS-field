let number = 1;

function start(){
    const xhr = new XMLHttpRequest( );
    xhr.onreadystatechange = function (){
        if(this.readyState == 4){
            const dataObj = JSON.parse(this.response);
            let buttons = "";

            let maximumSize = number > dataObj.length-1 ? "none" : "block";
            document.getElementById("next").style.display = maximumSize;
            let minimumSize = number < 2 ? "none" : "block";
            document.getElementById("previous").style.display = minimumSize;

            const questionText = `${number}. ${dataObj[number-1].question}`;
            document.querySelector("#question").innerText = questionText;
            for(let i in dataObj[number - 1].options){
                buttons+=`<button>${Number(i)+1}. ${dataObj[number - 1].options[i].text}</button>`;
            }
            document.querySelector("#options").innerHTML = buttons;
        }
    }
    xhr.open("GET", "./data.text");
    xhr.send();
}
start();

const hintText = document.querySelector("#hint");
function next(){
    number+=1;
    hintText.innerText = "";
    document.querySelector("#hint").style.display = 'none';
    start();
}
function previous(){
    number-=1;
    hintText.innerText = "";
    document.querySelector("#hint").style.display = 'none';
    start();
}

function hint(){
    const xhr = new XMLHttpRequest( );
    xhr.onreadystatechange = function (){
        if(this.readyState == 4){
            const dataObj = JSON.parse(this.response);
            document.querySelector("#hint").style.display = 'block';
            document.querySelector("#hint").innerText = dataObj[number - 1].rationale;
        }
    }
    xhr.open("GET", "./data.text");
    xhr.send();
}