import * as sortingAlgorithms from './classes/sortingAlgorithms.js';

let arraySize = 20; // Default array size
let animationSpeed = 100; // Default speed in ms
let array = [];
let audioCtx = null;
let isPaused = false;
let moves = []; // Store moves for pausing/resuming

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("init").addEventListener("click", init);
  document.getElementById("play").addEventListener("click", play);
  document.getElementById("pause").addEventListener("click", pause);

  document.getElementById("sizeSlider").addEventListener("input", updateSize);
  document.getElementById("speedSlider").addEventListener("input", updateSpeed);

  // Set slider steps correctly
  document.getElementById("speedSlider").step = 50;
  document.getElementById("sizeSlider").step = 5;

  init();
});

// Initialize array
function init() {
  array = Array.from({ length: arraySize }, () => Math.random());
  showBars();
  isPaused = false; // Reset pause state
  moves = []; // Clear previous moves
}

// Play sorting animation
function play() {
  if (moves.length === 0) {
    const algorithm = document.getElementById("algorithm").value;
    const copy = [...array];
    moves = sortingAlgorithms[algorithm](copy);
  }

  isPaused = false;
  animate();
}

// Pause animation
function pause() {
  isPaused = true;
}

// Animate sorting process
function animate() {
  if (isPaused || !moves.length) return; // Stop if paused

  const { indices: [i, j], type } = moves.shift();

  if (type === "swap") {
    [array[i], array[j]] = [array[j], array[i]];
  } else if (type === "over") {
    array[i] = j;
  }

  [i, j].forEach(index => {
    if (array[index] !== undefined) {
      playNote(200 + array[index] * 500);
    }
  });

  showBars({ indices: [i, j], type });

  setTimeout(() => animate(), animationSpeed);
}

function updateSpeed() {
  let sliderValue = parseInt(document.getElementById("speedSlider").value);

  // If the slider is at the far left (10), set speed to 350ms (slowest)
  if (sliderValue === 10) {
    animationSpeed = 350;
  } else {
    // Convert slider value into increments of 50ms, ensuring the speed decreases as the slider moves right
    animationSpeed = 350 - Math.round((sliderValue - 10) / 50) * 50;
    animationSpeed = Math.max(Math.min(animationSpeed, 350), 10); // Limit between 10 and 350ms
  }

  document.getElementById("speedValue").innerText = animationSpeed;
}



// Update array size and reinitialize
function updateSize() {
  arraySize = parseInt(document.getElementById("sizeSlider").value);
  document.getElementById("sizeValue").innerText = arraySize;
  init(); // Reinitialize array with new size
}

// Play sound effect during sorting
function playNote(freq) {
  if (!audioCtx) audioCtx = new (AudioContext || webkitAudioContext)();

  // if (animationSpeed < 50) return;
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


// Display bars
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
