let time = 0;
let interval;
let display = document.getElementById("display");
let ctx = [];
let drop = [];
let canvas = [];
let pointsSum = 0;
let hits = 0;

class Drop{
    constructor(id, character, audio, dropSrc){
        this.id = id;
        this.character = character;
        this.audio = audio;
        this.dropSrc = dropSrc;
    }
}

class Drag{
    constructor(id, character, audio, dragSrc){
        this.id = id;
        this.character = character;
        this.audio = audio;
        this.dragSrc = dragSrc;
    }
}

let drops = [
    new Drop(0, "Thorfinn",  "./images/hard/pic1.2.png"),
    new Drop(1, "Lain", "./images/hard/pic2.2.jpg"),
    new Drop(2, "Yu", "./images/hard/pic3.2.jpg"),
    new Drop(3, "Maka", "./images/hard/pic4.2.jpg"),
    new Drop(4, "Guts", "./images/hard/pic5.2.jpg"),
    new Drop(5, "Alucard", "./images/hard/pic6.2.png"),
    new Drop(6, "Hei", "./images/hard/pic7.2.webp"),
    new Drop(7, "Durham", "./images/hard/pic8.2.webp"),
    new Drop(8, "Isao", "./images/hard/pic9.2.jpg"),
    new Drop(9, "Shorter", "./images/hard/pic10.2.jpg"),
    new Drop(10, "Kure Raian", "./images/hard/pic11.2.jpg"),
    new Drop(11, "Hidenori", "./images/hard/pic12.2.webp"),
    new Drop(12, "Death the kid", "./images/hard/pic13.2.jpg"),
    new Drop(13, "Shura", "./images/medium/pic15.2.jpg")
];

let drags = [
    new Drag(0, "Thorfinn", "../assets/audios/", "./images/hard/pic1.png"),
    new Drag(1, "Lain", "../assets/audios/",  "./images/hard/pic2.jpg"),
    new Drag(2, "Yu", "../assets/audios/", "./images/hard/pic3.webp"),
    new Drag(3, "Maka", "../assets/audios/", "./images/hard/pic4.png"),
    new Drag(4, "Guts", "../assets/audios/", "./images/hard/pic5.jpg"),
    new Drag(5, "Alucard", "../assets/audios/", "./images/hard/pic6.jpeg"),
    new Drag(6, "Hei", "../assets/audios/", "./images/hard/pic7.webp"),
    new Drag(7, "Durham", "../assets/audios/", "./images/hard/pic8.webp"),
    new Drag(8, "Isao", "../assets/audios/", "./images/hard/pic9.jpg"),
    new Drag(9, "Shorter", "../assets/audios/", "./images/hard/pic10.jpg"),
    new Drag(10, "Kure Raian", "../assets/audios/", "./images/hard/pic11.webp"),
    new Drag(11, "Hidenori", "../assets/audios/", "./images/hard/pic12.jpg"),
    new Drag(12, "Death the kid", "../assets/audios/", "./images/hard/pic13.jpg"),
    new Drag(13, "Shura", "../assets/audios/", "./images/medium/pic15.jpg")
];

let characters = [];
let scenarios = [];

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex > 0) {
  
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

document.getElementById("setName").addEventListener("click", () => {
    window.location.href = "./name.html";
});

document.getElementById("menu").addEventListener("click", () => {
    window.location.href = "./index.html";
});

function start() {

    startStopwatch();
    document.getElementById("points").innerHTML = 0;
    document.getElementById("name").innerHTML = localStorage.name;
    document.getElementById("progressBar").style.width = "0%";
    shuffle(drags);
    characters = drags.slice(0,3);
    drags = drags.slice(3,drags.length);
    setDrags(characters);
    scenarios = setScenarios(characters);
    shuffle(scenarios);
    drawScenarios(scenarios);

    document.querySelector("#dragBox1 > img").addEventListener('dragstart', dragging, false);
    document.querySelector("#dragBox2 > img").addEventListener('dragstart', dragging, false);
    document.querySelector("#dragBox3 > img").addEventListener('dragstart', dragging, false);
    document.querySelector("#dragBox1 > img").addEventListener('dragend', dragEnded, false);
    document.querySelector("#dragBox2 > img").addEventListener('dragend', dragEnded, false);
    document.querySelector("#dragBox3 > img").addEventListener('dragend', dragEnded, false);

    canvas = document.querySelectorAll("#dropsSection > canvas");
    for (let index = 0; index < canvas.length; index++) {
        drop[index] = canvas[index];
        ctx[index] = drop[index].getContext('2d');
        drop[index].addEventListener('dragenter', dragEnter, false); 
        drop[index].addEventListener('dragover', dragOver, false);
        drop[index].addEventListener('drop', dropping, false);
    }
}

function dragEnter(e) {
    e.preventDefault();
    console.log("Drag Enter");
}

function dragOver(e) {
    e.preventDefault();
    console.log("Drag Over");
}

function dragEnded(e) {
    element = e.target; 
    console.log("Drag End");
}

function dragging(e) { 
    element = e.target;
    e.dataTransfer.setData('Text', element.getAttribute('id'), element.getAttribute('width'), element.getAttribute('height')); 
    e.dataTransfer.setDragImage (e.target, 0, 0);
    console.log("Drag Start");
}

function dropping(e) {
    e.preventDefault();
    let id = e.dataTransfer.getData('Text');
    let element = document.getElementById(id);
    var posx = e.pageX - e.target.offsetLeft;
    var posy = e.pageY - e.target.offsetTop; 
    if (e.target.id == "c" + element.id && posx > 0 && posx < 200) {
        for (let index = 0; index < drop.length; index++) {
            const canva = drop[index];
            if (canva.id == e.target.id) {
                ctx[index].drawImage(element, 50, 50, element.width, element.height);
                updatePoints(true);
                hits++;
                console.log(hits);
                updateProgress();
                element.style.visibility ='hidden';
                for (let index = 0; index < characters.length; index++) {
                    let character = characters[index];
                    if (element.id == character.id) {
                        let phrase = new Audio(character.audio);
                        phrase.play();
                        let cname = character.character;
                        document.getElementById("s" + e.target.id).innerHTML = cname;
                        if (hits == 3) {
                            setTimeout(function(){
                                characters = drags.slice(0,3);
                                setDrags(characters);
                                scenarios = setScenarios(characters);
                                shuffle(scenarios);
                                drawScenarios(scenarios);
                                document.querySelector("#dragBox1 > img").addEventListener('dragstart', dragging, false);
                                document.querySelector("#dragBox2 > img").addEventListener('dragstart', dragging, false);
                                document.querySelector("#dragBox3 > img").addEventListener('dragstart', dragging, false);
                                document.querySelector("#dragBox1 > img").addEventListener('dragend', dragEnded, false);
                                document.querySelector("#dragBox2 > img").addEventListener('dragend', dragEnded, false);
                                document.querySelector("#dragBox3 > img").addEventListener('dragend', dragEnded, false);

                                canvas = document.querySelectorAll("#dropsSection > canvas");
                                for (let index = 0; index < canvas.length; index++) {
                                    drop[index] = canvas[index];
                                    ctx[index] = drop[index].getContext('2d');
                                    drop[index].addEventListener('dragenter', dragEnter, false); 
                                    drop[index].addEventListener('dragover', dragOver, false);
                                    drop[index].addEventListener('drop', dropping, false);
                                }
                            }, 5000);

                        } else if (hits >= 6) {
                            win();
                        }
                    }
                }
            }
        }
    } else {
        updatePoints(false);
    }
}

function updatePoints(pointsState) {

    let points = 0;
    if (pointsState) {
        points = 1;
        if (time <= 10) {
            points = points * 5;
        } else if (time <= 20 && time > 10) {
            points = points * 4;
        } else if (time <= 30 && time > 20) {
            points = points * 3;
        } else if (time <= 40 && time > 30) {
            points = points * 2;
        } else {
            points = points * 1;
        }

    } else {
        points = -1;
        if (time <= 10) {
            points = points * 1;
        } else if (time <= 20 && time > 10) {
            points = points * 2;
        } else if (time <=30 && time > 20) {
            points = points * 3;
        } else if (time <= 40 && time > 30) {
            points = points * 4;
        } else {
            points = points * 5;
        }
    }

    

    pointsSum += points;
    document.getElementById("points").innerHTML = pointsSum;
}

function updateProgress() {
    switch (hits) {
        case 1:
            document.getElementById("progressBar").style.width = "16%";
            break;
        case 2:
            document.getElementById("progressBar").style.width = "32%";
            break;  
        case 3:
            document.getElementById("progressBar").style.width = "50%";
            break;
        case 4:
            document.getElementById("progressBar").style.width = "66%";
            break;
        case 5:
            document.getElementById("progressBar").style.width = "82%";
            break;  
        case 6:
            document.getElementById("progressBar").style.width = "100%";
            break;
        default:
            document.getElementById("progressBar").style.width = "0%";
            break;
    }
}

function startStopwatch() {
    if(interval){
        clearInterval(interval);
    }
    interval = setInterval(() => { 
        time += 1
        display.innerHTML = 
          Math.floor(time / 3600).toString().padStart(2, "0") + ":" + Math.floor((time % 3600) / 60).toString().padStart(2, "0") + ":" + Math.floor((time % 60)).toString().padStart(2, "0")
    }, 1000);
}

function stopStopwatch() {
    clearInterval(interval);
    interval = null;
}

function resetStopwatch() {
    if(interval){
        clearInterval(interval);
    }
    interval = null;
    time = 0;
    display.innerHTML = "00:00:00";
}

function setDrags(characters){

    let i = 1;
    characters.forEach(character => {

        img = new Image();
        img.id = character.id;
        img.src = character.dragSrc;
        img.width = "200";
        img.height = "200";
        document.getElementById("dragBox" + i).innerHTML = "";
        document.getElementById("dragBox" + i).appendChild(img);
        i++;
    });

}

function setScenarios(characters){
    let scenarios = [];
    for (let index = 0; index < 3; index++) {
        drops.forEach(drop => {
            if(characters[index].id === drop.id) {
                scenarios[index] = drop;
            }
        });
    }
    return scenarios;
}

function drawScenarios(scenarios) {
    let i = 1;
    let canvas = document.querySelectorAll("canvas");
    let names = document.querySelectorAll(".name");
    scenarios.forEach(scenario => {
        let ctx = canvas[i-1].getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas[i-1].id = "c" + scenario.id;
        names[i-1].innerHTML = "";
        names[i-1].id = "sc" + scenario.id;
        
        let img= new Image()
        img.src= scenario.dropSrc;

        img.onload = () => {
            ctx.drawImage(img,0,0,250, 250);
        };
        i++;
    });
}

function checkTime() {
    if (localStorage.hardTime) {
        if (localStorage.hardTime > time) {
            localStorage.hardTime = time;
        } 
    } else {
        localStorage.hardTime = time;
    }
    localStorage.lastTime = time;
}

function checkPoints() {
    if (localStorage.hardPoints) {
        if (localStorage.hardPoints < pointsSum) {
            localStorage.hardPoints = pointsSum;
        } 
    } else {
        localStorage.hardPoints = pointsSum;
    }
    localStorage.lastPoints = pointsSum;
}

function win() {
    checkTime();
    checkPoints();
    localStorage.lastLevel = "hard";
    setTimeout(function(){
        window.location.href = "./loadwin.html";
    }, 5000);
}

window.addEventListener('load', start, false);

