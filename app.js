const input = document.querySelector(".input");
const btn_add = document.querySelector(".btn.add");
const btn_start = document.querySelector(".btn.start");
const players = document.querySelector(".players");
const addPlayerContainer = document.querySelector(".add-player");
const btn_round = document.querySelector(".btn.round");
const title = document.querySelector(".title");
const roundNumber = document.querySelectorAll(".round-number");

let isStarted = false;
const names = [];

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const playerNode = (name) => {
  const player = document.createElement("div");
  const playerName = document.createElement("div");
  const playerPoints = document.createElement("div");

  player.classList.add("player");
  player.setAttribute("name", `${name}`);
  player.style.borderColor = getRandomColor();
  playerName.classList.add("player-name");
  playerPoints.classList.add("player-points");

  if (
    (name.toLowerCase()[0] === "а" || name.toLowerCase()[0] === "a") &&
    (name.toLowerCase()[1] === "н" || name.toLowerCase()[1] === "n")
  ) {
    playerName.innerHTML = "Браатииишкааа";
  } else {
    playerName.innerHTML = name;
  }
  playerPoints.innerHTML = 0;

  player.append(playerName, playerPoints);
  return player;
};

btn_add.addEventListener("click", () => {
  if (input.value.length > 1) {
    if (names.findIndex((item) => item === input.value.toLowerCase()) === -1) {
      names.push(input.value.toLowerCase());
      const playerItem = playerNode(input.value);
      input.value = "";
      players.append(playerItem);
    } else {
      alert("Такой игрок уже есть");
    }
  } else {
    alert("Минимум 2 символа");
  }
});

btn_start.addEventListener("click", () => {
  const playersLength = document.querySelectorAll(".player").length;
  if (playersLength > 2) {
    isStarted = true;
    btn_start.style.display = "none";
    btn_round.style.display = "flex";
    title.style.display = "flex";
    addPlayerContainer.style.display = "none";
  } else {
    alert("Нужно минимум 3 игрока");
  }
});

let obj = {};

players.addEventListener("click", (e) => {
  if (
    (e.target.className === "player-name" ||
      e.target.className === "player-points") &&
    isStarted
  ) {
    const node = e.target.parentNode;
    const name = node.getAttribute("name");
    const borderColor = window
      .getComputedStyle(node, null)
      .getPropertyValue("border-color");
    const isHave = obj[name];
    if (isHave) {
      node.style.backgroundColor = "white";
      delete obj[name];
    } else {
      node.style.backgroundColor = borderColor;
      obj[name] = 1;
    }
  }
});

btn_round.addEventListener("click", () => {
  roundNumber.forEach((item) => {
    item.innerHTML = Number(item.innerHTML) + 1;
  });
  for (let i = 0; i < players.children.length; i++) {
    const playerItem = players.children[i];
    const playerName = players.children[i].getAttribute("name");
    const points = Number(players.children[i].children[1].innerHTML);
    if (obj[playerName]) {
      players.children[i].children[1].innerHTML = points + 10;
    } else {
      players.children[i].children[1].innerHTML = points - 5;
    }
    playerItem.style.backgroundColor = "white";
  }
  obj = {};
});
