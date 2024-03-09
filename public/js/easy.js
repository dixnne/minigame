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
    new Drop(0, "Pikachu", "./images/easy/pic1.2.png"),
    new Drop(1, "Goku", "./images/easy/pic2.2.webp"),
    new Drop(2, "Luffy", "./images/easy/pic3.2.png"),
    new Drop(3, "Naruto", "./images/easy/pic4.2.jpg"),
    new Drop(4, "Oliver", "./images/easy/pic5.2.webp"),
    new Drop(5, "Seiya", "./images/easy/pic6.2.jpg"),
    new Drop(6, "Santana", "./images/easy/pic7.2.webp"),
    new Drop(7, "Anya", "./images/easy/pic8.2.jpeg"),
    new Drop(8, "Asuka", "./images/easy/pic9.2.jpg"),
    new Drop(9, "Kira", "./images/easy/pic10.2.jpg"),
    new Drop(10, "Sailor Moon", "./images/easy/pic11.2.jpg"),
    new Drop(11, "Eren",  "./images/easy/pic12.2.png"),
    new Drop(12, "Nezuko", "./images/easy/pic13.2.jpg"),
    new Drop(13, "Yugi", "./images/easy/pic14.2.jpg")
];

let drags = [
    new Drag(0, "Pikachu", "./assets/easy/son1.mp3", "./images/easy/pic1.webp"),
    new Drag(1, "Goku", "./assets/easy/son2.mp3",  "./images/easy/pic2.png"),
    new Drag(2, "Luffy", "./assets/easy/son3.mp3", "./images/easy/pic3.jpg"),
    new Drag(3, "Naruto", "./assets/easy/son4.mp3", "./images/easy/pic4.png"),
    new Drag(4, "Oliver", "./assets/easy/son5.mp3", "./images/easy/pic5.png"),
    new Drag(5, "Seiya", "./assets/easy/son6.mp3", "./images/easy/pic6.png"),
    new Drag(6, "Saitama", "./assets/easy/sonsai.mp3", "./images/easy/pic7.png"),
    new Drag(7, "Anya", "./assets/easy/son7.mp3", "./images/easy/pic8.png"),
    new Drag(8, "Asuka", "./assets/easy/son8.mp3", "./images/easy/pic9.jpg"),
    new Drag(9, "Kira", "./assets/easy/son9.mp3", "./images/easy/pic10.jpg"),
    new Drag(10, "Sailor Moon", "./assets/easy/son10.mp3", "./images/easy/pic11.png"),
    new Drag(11, "Eren", "./assets/easy/son11.mp3", "./images/easy/pic12.png"),
    new Drag(12, "Nezuko", "./assets/easy/son12.mp3", "./images/easy/pic13.png"),
    new Drag(13, "Yugi", "./assets/easy/son13.mp3", "./images/easy/pic14.png")
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
    if (playerStats.easyTime > time || playerStats.easyTime == 0) {
        playerStats.easyTime = time;
    } 
    playerStats.lastTime = time;
}

function checkPoints() {
    if (playerStats.easyPoints < pointsSum) {
        playerStats.easyPoints = pointsSum;
    } 
    playerStats.lastPoints = pointsSum;
}

function win() {
    checkTime();
    checkPoints();
    playerStats.lastLevel = "easy";
    stats[playerIndex] = playerStats;
    localStorage.stats = JSON.stringify(stats);
    setTimeout(function(){
        window.location.href = "./loadwin.html";
    }, 5000);
}

window.addEventListener('load', start, false);

