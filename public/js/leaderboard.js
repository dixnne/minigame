const stats = JSON.parse(localStorage.stats);
const easyTable = document.getElementById("easyTable");
const mediumTable = document.getElementById("mediumTable");
const hardTable = document.getElementById("hardTable");

document.getElementById("menu").addEventListener("click", () => {
    window.location.href = "./index.html";
});

stats.sort((a, b) => {
    return a.easyPoints - b.easyPoints;
});
stats.reverse();

let erow = mrow = hrow = "";
stats.forEach(player => {
    erow += "<tr>";
    erow += "<td>" + player.username + "</td>";
    erow += "<td>" + Math.floor(player.easyTime / 3600).toString().padStart(2, "0") + ":" + Math.floor((player.easyTime % 3600) / 60).toString().padStart(2, "0") + ":" + Math.floor((player.easyTime % 60)).toString().padStart(2, "0"); + "</td>";
    erow += "<td>" + player.easyPoints + "</td>";
    erow += "</tr>";
});

stats.sort((a, b) => {
    return a.mediumPoints - b.mediumPoints;
});
stats.reverse();

stats.forEach(player => {
    mrow += "<tr>";
    mrow += "<td>" + player.username + "</td>";
    mrow += "<td>" + Math.floor(player.mediumTime / 3600).toString().padStart(2, "0") + ":" + Math.floor((player.mediumTime % 3600) / 60).toString().padStart(2, "0") + ":" + Math.floor((player.mediumTime % 60)).toString().padStart(2, "0"); + "</td>";
    mrow += "<td>" + player.mediumPoints + "</td>";
    mrow += "</tr>";
});

stats.sort((a, b) => {
    return a.hardPoints - b.hardPoints;
});
stats.reverse();

stats.forEach(player => {
    hrow += "<tr>";
    hrow += "<td>" + player.username + "</td>";
    hrow += "<td>" + Math.floor(player.hardTime / 3600).toString().padStart(2, "0") + ":" + Math.floor((player.hardTime % 3600) / 60).toString().padStart(2, "0") + ":" + Math.floor((player.hardTime % 60)).toString().padStart(2, "0"); + "</td>";
    hrow += "<td>" + player.hardPoints + "</td>";
    hrow += "</tr>";
});

easyTable.innerHTML = erow;
mediumTable.innerHTML = mrow;
hardTable.innerHTML = hrow;