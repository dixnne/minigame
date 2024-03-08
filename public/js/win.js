const canvas = document.getElementById("fallingLeavesCanvas");
const ctx = canvas.getContext("2d");
const leaves = [];
const numLeaves = 100;

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

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.getElementById("text-container").innerText = "Felicidades, " + localStorage.name;
switch (localStorage.lastLevel) {
    case "easy":
        document.getElementById("time").innerText = localStorage.lastTime;
        document.getElementById("levelTime").innerText = localStorage.easyTime;
        document.getElementById("points").innerText = localStorage.lastPoints;
        document.getElementById("levelPoints").innerText = localStorage.easyPoints;
        document.getElementById("level").innerText = "fácil";
        break;
    case "medium":
        document.getElementById("time").innerText = localStorage.lastTime;
        document.getElementById("levelTime").innerText = localStorage.easyTime;
        document.getElementById("points").innerText = localStorage.lastPoints;
        document.getElementById("levelPoints").innerText = localStorage.easyPoints;
        document.getElementById("level").innerText = "medio";
        break;
    case "hard":
        document.getElementById("time").innerText = localStorage.lastTime;
        document.getElementById("levelTime").innerText = localStorage.easyTime;
        document.getElementById("points").innerText = localStorage.lastPoints;
        document.getElementById("levelPoints").innerText = localStorage.easyPoints;
        document.getElementById("level").innerText = "difícil";
        break;
    default:
        break;
}

function createLeaf() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * 18 + 2,
    size: Math.random() * 22 + 3, // Random size between 3 and 25
    speed: Math.random() * 3 + 1, // Random speed between 1 and 4
    color: `rgba(${Math.random() * 200 + 50}, ${Math.random() * 200 + 50}, ${Math.random() * 200 + 50}, ${Math.random() * 0.8 + 0.2})`, // Random color
    //color: `rgba(255, ${Math.random() * 100 + 100}, 0, ${Math.random() * 0.8 + 0.2})`, // Random orange-ish color
    //color: '#000A',
    rotation: Math.random() * 360 // Random initial rotation
  };
}

function createLeaves() {
  for (let i = 0; i < numLeaves; i++) {
    leaves.push(createLeaf());
  }
}

function updateLeaves() {
  for (let i = 0; i < leaves.length; i++) {
    const leaf = leaves[i];
    leaf.y += leaf.speed;
    leaf.x += 1.0 * Math.sin(leaf.y / leaf.size);
    
    if (leaf.y > canvas.height) {
      // Reset the leaf when it goes below the canvas
      leaf.y = -20;
      leaf.x = Math.random() * canvas.width;
    }
  }
}

function drawLeaves() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < leaves.length; i++) {
    const leaf = leaves[i];

    ctx.save();
    ctx.translate(leaf.x + leaf.size / 2, leaf.y + leaf.size / 2);
    ctx.rotate((leaf.rotation * Math.PI) / 180);
    ctx.fillStyle = leaf.color;
    ctx.fillRect(-leaf.size / 2, -leaf.size / 2, leaf.size, leaf.size);
    
    //ctx.beginPath();
    //ctx.arc(200,150,leaf.size,0,0.5*Math.PI);
    //ctx.arc(200+leaf.size,150+leaf.size,leaf.size,Math.PI, 1.5*Math.PI);
    //ctx.fillStyle = leaf.color;
    //ctx.fill();
    //ctx.closePath();  

    ctx.restore();
  }
}

function animate() {
  updateLeaves();
  drawLeaves();
  requestAnimationFrame(animate);
}

function onWindowResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", onWindowResize);
createLeaves();
animate();

function changeTextColor() {
    const textContainer = document.getElementById("text-container");
    const words = textContainer.innerText.split(" ");

    const coloredWords = words.map((word) => {
        const randomColor = getRandomColor();
        return `<span style="color: ${randomColor};">${word}</span>`;
    });

    textContainer.innerHTML = coloredWords.join(" ");
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//function getRandomColor() {
//  return Math.random() * 0xffffff;
//}

setInterval(changeTextColor, 1000);