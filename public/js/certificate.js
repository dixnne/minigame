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

