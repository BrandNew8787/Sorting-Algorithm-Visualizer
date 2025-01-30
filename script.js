import * as sortingAlgorithms from './classes/sortingAlgorithms.js';

const n = 20;
let array = [];
let audioCtx = null;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("init").addEventListener("click", init);
  document.getElementById("play").addEventListener("click", play);
  init();
});

function init() {
  array = Array.from({ length: n }, () => Math.random());
  showBars();
}

function play() {
  const algorithm = document.getElementById("algorithm").value;
  const copy = [...array];
  const moves = sortingAlgorithms[algorithm](copy); // Using the mergeSort here
  animate(moves);
}

function animate(moves) {
  if (!moves.length) return showBars();
  const { indices: [i, j], type } = moves.shift();
  if (type === "swap") {
    [array[i], array[j]] = [array[j], array[i]];
  } else if (type === "over") {
    array[i] = j; // Overwrite value directly (instead of swapping)
    playNote(200 + array[i] * 500)
  }
  if (type != "over"){
    [i, j].forEach(index => playNote(200 + array[index] * 500));
  }
  showBars({ indices: [i, j], type });
  setTimeout(() => animate(moves), 50);
}

function playNote(freq) {
  if (!audioCtx) audioCtx = new (AudioContext || webkitAudioContext)();
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  osc.frequency.value = freq;
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.1);
}

function showBars(highlight) {
  const container = document.getElementById("container");
  container.innerHTML = "";
  array.forEach((value, index) => {
    const bar = document.createElement("div");
    bar.style.height = `${value * 100}%`;
    bar.className = "bar";
    if (highlight?.indices.includes(index)) {
      bar.style.backgroundColor = highlight.type === "comp" ? "blue" : "red";
    }
    container.appendChild(bar);
  });
}
