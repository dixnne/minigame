let time = 0;
let interval;
let display = document.getElementById("display");
let ctx = [];
let drop = [];
let canvas = [];
let pointsSum = 0;
let hits = 0;
let stats = [];
let playerStats = "";
let playerIndex = 0;
let audioWasPlaying = false;


class Drop{
    constructor(id, character, dropSrc){
        this.id = id;
        this.character = character;
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
    new Drop(0, "Thorfinn Karlsefni",  "./images/hard/pic1.2.png"),
    new Drop(1, "Ominae Yū", "./images/hard/pic2.2.jpg"),
    new Drop(2, "Maka Arubān", "./images/hard/maka-bg.png"),
    new Drop(3, "Guts", "./images/hard/guts-bg.jpeg"),
    new Drop(4, "Alucard", "./images/hard/alucard-bg.png"),
    new Drop(5, "Hei", "./images/hard/hei-bg.jpeg"),
    new Drop(6, "Durham", "./images/hard/durham-bg.jpg"),
    new Drop(7, "Isao Shinomiya", "./images/hard/pic8.2.webp"),
    new Drop(8, "Shorter Wong", "./images/hard/pic9.2.jpg"),
    new Drop(9, "Kure Raian", "./images/hard/pic10.2.jpg"),
    new Drop(10, "Hidenori Tabata", "./images/hard/pic11.2.jpg"),
    new Drop(11, "Death the kid", "./images/hard/pic12.2.webp"),
    new Drop(12, "Shura Kirigajure", "./images/hard/pic13.2.jpg"),
    new Drop(13, "Lain Iwakura", "./images/hard/lain-bg.png"),
    new Drop(14, "Jabami Yumeko", "./images/hard/jabami-bg.webp"),
    new Drop(15, "Fujiwara Chika", "./images/hard/chika-bg.webp"),
    new Drop(16, "Shiba Miyuki", "./images/hard/miyuki.jpeg"),
    new Drop(17, "Katarina Claes", "./images/hard/katarina-bg.jpg")
];

let drags = [
    new Drag(0, "Thorfinn Karlsefni", "./assets/hard/thurfinn.mp3", "./images/hard/pic1.png"),
    new Drag(1, "Ominae Yū", "./assets/hard/spriggan.mp3",  "./images/hard/yu.png"),
    new Drag(2, "Maka Arubān", "./assets/hard/maka.mp3", "./images/hard/pic3.webp"),
    new Drag(3, "Guts", "./assets/hard/guns.mp3", "./images/hard/guts.webp"),
    new Drag(4, "Alucard", "./assets/hard/alucard.mp3", "./images/hard/alucard.png"),
    new Drag(5, "Hei", "./assets/hard/hei.mp3", "./images/hard/hei.png"),
    new Drag(6, "Durham", "./assets/hard/durham.mp3", "./images/hard/pic7.webp"),
    new Drag(7, "Isao Shinomiya", "./assets/hard/isao.mp3", "./images/hard/isao.webp"),
    new Drag(8, "Shorter Wong", "./assets/hard/shorter.mp3", "./images/hard/shorter.webp"),
    new Drag(9, "Kure Raian", "./assets/hard/raian.mp3", "./images/hard/kure.webp"),
    new Drag(10, "Hidenori Tabata", "./assets/hard/Hidenori.mp3", "./images/hard/hidenori.png"),
    new Drag(11, "Death the kid", "./assets/hard/death-the-kid.mp3", "./images/hard/deaththekid.png"),
    new Drag(12, "Shura Kirigajure", "./assets/hard/shuras.mp3", "./images/hard/shura.webp"),
    new Drag(13, "Lain Iwakura", "./assets/hard/lain.mp3", "./images/hard/lain.png"),
    new Drag(14, "Jabami Yumeko", "./assets/hard/kakegurui.mp3", "./images/hard/jabami.png"),
    new Drag(15, "Fujiwara Chika", "./assets/hard/chika.mp3", "./images/hard/chika.png"),
    new Drag(16, "Shiba Miyuki", "./assets/hard/miyuki.mp3", "./images/hard/miyuki.webp"),
    new Drag(17, "Katarina Claes", "./assets/hard/katarina.mp3", "./images/hard/katarina.webp")
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

    if (localStorage.stats) {
        stats = JSON.parse(localStorage.stats);
    } else {
        stats = [
            {
                username: localStorage.name,
                easyTime: 0,
                easyPoints: 0,
                mediumTime: 0,
                mediumPoints: 0,
                hardTime: 0,
                hardPoints: 0,
                lastTime: 0,
                lastPoints: 0,
                lastLevel: "",
            }
        ]
    }

    for (let index = 0; index < stats.length; index++) {
        const player = stats[index];
        if (player.username == localStorage.name) {
            playerStats = player;
            playerIndex = index;
        } else {
            playerIndex = index;
        }
    }

    if (playerStats == "") {
        playerStats = {
            username: localStorage.name,
            easyTime: 0,
            easyPoints: 0,
            mediumTime: 0,
            mediumPoints: 0,
            hardTime: 0,
            hardPoints: 0,
            lastTime: 0,
            lastPoints: 0,
            lastLevel: "",
        }
        playerIndex += 1;
    }

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
                        let cname = character.character;
                        if (!audio.paused) {
                            audio.pause();
                            audioWasPlaying = true;
                        }
                        phrase.play();
                        phrase.addEventListener("ended", () => {
                            if ('speechSynthesis' in window) {
                                // Speech Synthesis supported 
                                var msg = new SpeechSynthesisUtterance();
                                document.getElementById("s" + e.target.id).innerHTML = cname;
                                msg.voice = speechSynthesis.getVoices().filter(function (voice) { return voice.name === "Google 日本語"; })[0];
                                msg.volume = 1;
                                msg.rate = 1;
                                msg.pitch = 1;
                                msg.lang = "ja-JP";
                                msg.text = cname;
                                window.speechSynthesis.speak(msg);
                                msg.addEventListener("end", () => {
                                    if (audioWasPlaying) audio.play();
                                });
                            }else{
                                 // Speech Synthesis Not Supported 
                                console.log("Sorry, your browser doesn't support text to speech!");
                            }
                            if (hits == 3) {
                                setTimeout(function(){
                                    document.getElementById("dropsSection").innerHTML = '<canvas id="dropBox1" height="250px" width="250px"></canvas><canvas id="dropBox2" height="250px" width="250px"></canvas><canvas id="dropBox3" height="250px" width="250px"></canvas>';
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
                        });
                    }
                }
            }
        }
    } else {
        updatePoints(false);
        let fail = new Audio("./assets/baka.mp3");
        fail.play();
    }
}

function updatePoints(pointsState) {

    let points = 0;
    if (pointsState) {
        points = 1;
        if (time <= 20) {
            points = points * 5;
        } else if (time <= 40 && time > 20) {
            points = points * 4;
        } else if (time <= 60 && time > 40) {
            points = points * 3;
        } else if (time <= 80 && time > 60) {
            points = points * 2;
        } else {
            points = points * 1;
        }

    } else {
        points = -1;
        if (time <= 20) {
            points = points * 1;
        } else if (time <= 40 && time > 20) {
            points = points * 2;
        } else if (time <=60 && time > 40) {
            points = points * 3;
        } else if (time <= 80 && time > 60) {
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
        time += 1;
        display.innerHTML = 
          Math.floor(time / 3600).toString().padStart(2, "0") + ":" + Math.floor((time % 3600) / 60).toString().padStart(2, "0") + ":" + Math.floor((time % 60)).toString().padStart(2, "0");
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
            if (img.height > img.width) {
                ctx.drawImage(img, 0, (img.height - img.width)/2, img.width, img.width, 0, 0, 250, 250);
            } else {
                ctx.drawImage(img, (img.width - img.height)/2, 0, img.height, img.height, 0, 0, 250, 250);
            }
        };
        i++;
    });
}

function checkTime() {
    if (playerStats.hardTime > time || playerStats.hardTime == 0) {
        playerStats.hardTime = time;
    } 
    playerStats.lastTime = time;
}

function checkPoints() {
    if (playerStats.hardPoints < pointsSum) {
        playerStats.hardPoints = pointsSum;
    } 
    playerStats.lastPoints = pointsSum;
}

function win() {
    checkTime();
    checkPoints();
    playerStats.lastLevel = "hard";
    stats[playerIndex] = playerStats;
    localStorage.stats = JSON.stringify(stats);
    setTimeout(function(){
        window.location.href = "./loadwin.html";
    }, 5000);
}

window.addEventListener('load', start, false);


