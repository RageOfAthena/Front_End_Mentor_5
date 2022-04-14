const rules_btn = document.querySelector(".bottom_rules");
const pop = document.querySelector(".pop");
const pop_close = document.querySelector(".pop_close");
const score = document.querySelector(".score_card_score_value");
const paper = document.querySelector(".rps_paper");
const scissor = document.querySelector(".rps_scissors");
const rock = document.querySelector(".rps_rock");
const main = document.querySelector(".rps");
const triangle = document.querySelector(".rps_triangle");
let clear = document.querySelector(".clear");
let scoreVal = Number(localStorage.getItem("score"));
let selected, selectedElement, compselected, compselectedElement;
let repeat;
let rand = function () {
  compselected = Math.trunc(Math.random() * 3) + 1;
};
let kim;
score.textContent = `${scoreVal}`;
let winner = function (xim, yim) {
  let x = +xim;
  let y = +yim;

  if (x - y === 2) {
    if (scoreVal > 0) {
      scoreVal--;
    }
    return "You Lose";
  } else if (y - x === 2) {
    scoreVal++;
    return "You Win";
  } else if (x - y === 1) {
    scoreVal++;
    return "You Win";
  } else if (y - x === 1) {
    if (scoreVal > 0) {
      scoreVal--;
    }
    return "You Lose";
  } else {
    return "Tied";
  }
};

rand();
if (compselected === 1) {
  compselectedElement = paper;
} else if (compselected === 2) {
  compselectedElement = scissor;
} else {
  compselectedElement = rock;
}
// console.log(compselectedElement);
//////////////////////////////////////////////////
rules_btn.addEventListener("click", function (e) {
  pop.classList.toggle("hidden");
});
pop_close.addEventListener("click", function (e) {
  pop.classList.add("hidden");
});
document.body.addEventListener("click", function (e) {
  if (e.target.closest(".pop") === pop || e.target === rules_btn) return;
  pop.classList.add("hidden");
});
main.addEventListener("click", function (e) {
  if (!e.target.closest(".rps_select")) return;
  if (repeat) return;
  selected = e.target.closest(".rps_select").dataset.selected;
  selectedElement = e.target.closest(".rps_select");
  if (selectedElement === compselectedElement) {
    compselectedElement = compselectedElement.cloneNode(true);
  }
  selectedElement.classList.add("rps_selected");
  main.classList.add("new_main");
  main.innerHTML = `<h1 class="rps_your_choice">You Picked</h1>
    ${selectedElement.outerHTML}
    <h1 class="rps_pc_choice">The House Picked</h1>
    <div class="good"></div>`;
  compselectedElement.classList.add("rock");
  let rps_status = document.createElement("h1");
  rps_status.classList.add("rps_status");
  rps_status.textContent = `${winner(selected, compselected)}`;
  repeat = document.createElement("div");
  repeat.classList.add("rps_repeat");
  repeat.innerHTML = "Play Again";
  setTimeout(function () {
    main.innerHTML = `<h1 class="rps_your_choice">You Picked</h1>
        ${selectedElement.outerHTML}
        ${rps_status.outerHTML}
        <h1 class="rps_pc_choice">The House Picked</h1>
        ${compselectedElement.outerHTML}`;
    main.append(repeat);
  }, 1000);
  setTimeout(function () {
    score.textContent = `${scoreVal}`;
  }, 1000);
  repeat.addEventListener("click", function (e) {
    localStorage.setItem("score", `${scoreVal}`);
    location.reload();
  });
});
clear.addEventListener("click", function (e) {
  localStorage.setItem("score", 0);
  location.reload();
});
