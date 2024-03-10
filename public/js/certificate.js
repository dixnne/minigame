const canvas = document.getElementById("certificate");
const ctx = canvas.getContext("2d");
let stats = [];
let playerStats = {};
let easyTime = mediumTime = hardTime = 0;

document.getElementById("menu").addEventListener("click", () => {
    window.location.href = "./index.html";
});

document.getElementById("download").addEventListener("click", () => {
    // Get the canvas
    var certificate = document.getElementById("certificate");
    // Convert the canvas to data
    var image = certificate.toDataURL();
    // Create a link
    var aDownloadLink = document.createElement('a');
    // Add the name of the file to the link
    aDownloadLink.download = 'canvas_image.png';
    // Attach the data to the link
    aDownloadLink.href = image;
    // Get the code to click the download link
    aDownloadLink.click();
});

if (localStorage.stats) {
  stats = JSON.parse(localStorage.stats);
}

for (let index = 0; index < stats.length; index++) {
  const player = stats[index];
  if (player.username == localStorage.name) {
    playerStats = player;
  }

  if (playerStats == {}) {
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
  }
}

//certificados
const canvasdipG = document.querySelector('#certificate'); //objeto canva
const ctxWin = canvasdipG.getContext('2d'); //contexto 2d
switch (playerStats.lastLevel) {
  case "easy":
      ctxWin.strokeStyle= '#6FEDD6'; //color del borde
      break;
  case "medium":
      ctxWin.strokeStyle= '#FF9551'; //color del borde
      break;
  case "hard":
      ctxWin.strokeStyle= '#FF4A4A';
      break;
  default:
      break;
}
ctxWin.beginPath();
ctxWin.lineWidth = 10;
const inset = ctxWin.lineWidth/2;
const radius = [50,0,50,0];
const topLeftRadius = radius[0];
const topRightRadius = radius[1];
const bottomRightRadius = radius[2];
const bottomLeftRadius = radius[3];

const width = canvas.width;
const height = canvas.height;

ctxWin.lineTo(topLeftRadius,inset);
ctxWin.lineTo(width - topRightRadius , inset );
ctxWin.lineTo(width - inset , topRightRadius);
ctxWin.lineTo(width - inset , height - bottomRightRadius);
ctxWin.lineTo(width - bottomRightRadius, height - inset);
ctxWin.lineTo(bottomLeftRadius , height - inset);
ctxWin.lineTo(inset , height - bottomLeftRadius);
ctxWin.lineTo(inset , topLeftRadius);
ctxWin.closePath();
ctxWin.fill();
ctxWin.stroke();

        
ctxWin.font = "105px serif";
ctxWin.strokeText("Certificado", 265, 200);

ctxWin.strokeStyle= '#FF4A4A';
ctxWin.font = "60px sans-serif";
ctxWin.textBaseline = "Lato";
ctxWin.strokeText("OTAKU - METER", 265, 100);
ctxWin.strokeStyle= '#FF9551';
ctxWin.strokeText("OTAKU - METER", 260, 95);
ctxWin.strokeStyle= '#6FEDD6';
ctxWin.strokeText("OTAKU - METER", 255, 90);
ctxWin.strokeStyle= '#B9FFF8';
ctxWin.strokeText("OTAKU - METER", 250, 85);

ctxWin.strokeStyle= '#000000';
ctxWin.font = "105px serif";
ctxWin.fillText("Certificado", 265, 200);

var name= playerStats.username;
var level = playerStats.lastLevel; 
ctxWin.fillStyle= '#F9F5F6';
ctxWin.font = "20px cursive";
ctxWin.textBaseline = "Dancing Script";
ctxWin.fillText("Otrorgamos a "+name+"", 70, 250);
ctxWin.fillText("El certificado nivel "+level+" Del OTAKU-METER", 70, 275);
switch (playerStats.lastLevel) {
  case "easy":
      ctxWin.fillText("Fuiste un gran guerrero, espero", 70, 350);
      ctxWin.fillText("que renazcas como una persona buena,", 70, 370);
      ctxWin.fillText("si es asi, volveremos a luchar.", 70, 390);
      ctxWin.fillText("-Goku.", 70, 420);
      break;
  case "medium":
      ctxWin.fillText("Los sueños solo son sueños", 70, 350);
      ctxWin.fillText("si algun dia se cumplen", 70, 370);
      ctxWin.fillText("nunca fueron sueños.", 70, 390);
      ctxWin.fillText("-Edward Elric.", 70, 420);
      break;
  case "hard":
      ctxWin.fillText("¿Monstruo? Me solprende que alguien ", 70, 350);
      ctxWin.fillText("que se divierte con la muerte ", 70, 370);
      ctxWin.fillText("de su propia especie se capaz", 70, 390);
      ctxWin.fillText("de llamarme monstruo. ", 70, 410);
      ctxWin.fillText("-Alucard",70,430)
      break;
  default:
      break;
}
//Creadores
ctxWin.font = "30px cursive";
ctxWin.fillText("Creadores", 720, 300);
ctxWin.strokeStyle= '#FF4A4A';
ctxWin.strokeText("Dixnne", 698, 350);
ctxWin.strokeText("Monts", 698, 430);
ctxWin.strokeText("Keni", 850, 350);
ctxWin.strokeText("Erik", 850, 430);

ctxWin.strokeStyle= '#FF9551';
ctxWin.strokeText("Dixnne", 696, 348);
ctxWin.strokeText("Monts", 696, 428);
ctxWin.strokeText("Keni", 848, 348);
ctxWin.strokeText("Erik", 848, 428);

ctxWin.strokeStyle= '#6FEDD6';
ctxWin.strokeText("Dixnne", 694, 346);
ctxWin.strokeText("Monts", 694, 426);
ctxWin.strokeText("Keni", 846, 346);
ctxWin.strokeText("Erik", 846, 426);

ctxWin.strokeStyle= '#B9FFF8';
ctxWin.strokeText("Dixnne", 692, 344);
ctxWin.strokeText("Monts", 692, 424);
ctxWin.strokeText("Keni", 844, 344);
ctxWin.strokeText("Erik", 844, 424);

ctxWin.fillStyle= '#000000';
ctxWin.fillText("Dixnne", 692, 344);
ctxWin.fillText("Monts", 692, 424);
ctxWin.fillText("Keni", 842, 342);
ctxWin.fillText("Erik", 842, 422);
