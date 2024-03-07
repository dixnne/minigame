var time = 0;
var interval;
var display = document.getElementById("display");

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
    new Drop(0, "Pikachu", "../assets/audios/", "./images/easy/"),
    new Drop(1, "Goku", "../assets/audios/",  "./images/easy/"),
    new Drop(2, "Luffy", "../assets/audios/", "./images/easy/"),
    new Drop(3, "Naruto", "../assets/audios/", "./images/easy/"),
    new Drop(4, "Oliver", "../assets/audios/", "./images/easy/"),
    new Drop(5, "Seiya", "../assets/audios/", "./images/easy/"),
    new Drop(6, "Santana", "../assets/audios/", "./images/easy/"),
    new Drop(7, "Anya", "../assets/audios/", "./images/easy/"),
    new Drop(8, "Asuka", "../assets/audios/", "./images/easy/"),
    new Drop(9, "Kira", "../assets/audios/", "./images/easy/"),
    new Drop(10, "Sailor Moon", "../assets/audios/", "./images/easy/"),
    new Drop(11, "Eren", "../assets/audios/", "./images/easy/"),
    new Drop(12, "Nezuko", "../assets/audios/", "./images/easy/"),
    new Drop(13, "Yugi", "../assets/audios/", "./images/easy/")
];

let drags = [
    new Drag(0, "Pikachu", "../assets/audios/", "./images/easy/pika.png"),
    new Drag(1, "Goku", "../assets/audios/",  "./images/easy/pika.png"),
    new Drag(2, "Luffy", "../assets/audios/", "./images/easy/pika.png"),
    new Drag(3, "Naruto", "../assets/audios/", "./images/easy/pika.png"),
    new Drag(4, "Oliver", "../assets/audios/", "./images/easy/pika.png"),
    new Drag(5, "Seiya", "../assets/audios/", "./images/easy/pika.png"),
    new Drag(6, "Santana", "../assets/audios/", "./images/easy/pika.png"),
    new Drag(7, "Anya", "../assets/audios/", "./images/easy/pika.png"),
    new Drag(8, "Asuka", "../assets/audios/", "./images/easy/pika.png"),
    new Drag(9, "Kira", "../assets/audios/", "./images/easy/pika.png"),
    new Drag(10, "Sailor Moon", "../assets/audios/", "./images/easy/pika.png"),
    new Drag(11, "Eren", "../assets/audios/", "./images/easy/pika.png"),
    new Drag(12, "Nezuko", "../assets/audios/", "./images/easy/pika.png"),
    new Drag(13, "Yugi", "../assets/audios/", "./images/easy/pika.png")
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
    document.getElementById("name").innerHTML = localStorage.name;
    document.getElementById("progressBar").style.width = "60%";
    shuffle(drags);
    characters = drags.slice(0,3);
    setDrags(characters);
    scenarios = setScenarios(characters);
    shuffle(scenarios);
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
    scenarios.forEach(scenario => {
        let canvas = document.getElementById("dropBox" + i);
        let ctx = canvas.getContext("2d");
        canvas.id = scenario.id;
        
        let img= new Image()
        img.src= scenario.dropSrc;

        img.onload = () => {
            ctx.drawImage(img,0,0,300, 300);
        };
        i++;
    });
}

window.addEventListener('load', start, false);

