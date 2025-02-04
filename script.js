import * as sortingAlgorithms from './classes/sortingAlgorithms.js';

let arraySize = 20; // Default array size
let animationSpeed = 100; // Default speed in ms
let array = [];
let audioCtx = null;
let isPaused = false;
let moves = []; // Store moves for pausing/resuming
let animationTimeoutId; // For tracking the setTimeout

// Allowed speeds (in ms) for the slider.
// The array is ordered from fastest to slowest.
const speedValues = [10, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250];

// Update the displayed code when the sorting algorithm is changed
document.getElementById("algorithm").addEventListener("change", function () {
  let selectedAlgorithm = this.value;
  renderCode(codeSnippets[selectedAlgorithm]);
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("init").addEventListener("click", init);
  document.getElementById("play").addEventListener("click", play);
  document.getElementById("pause").addEventListener("click", pause);

  document.getElementById("sizeSlider").addEventListener("input", updateSize);
  document.getElementById("speedSlider").addEventListener("input", updateSpeed);

  // Set slider steps correctly (for size slider, if needed)
  document.getElementById("sizeSlider").step = 5;

  const defaultAlgorithm = document.getElementById("algorithm").value;
  renderCode(codeSnippets[defaultAlgorithm]);
  init();
});

// Initialize array
function init() {
  // Stop any ongoing animation.
  isPaused = true;
  if (animationTimeoutId) {
    clearTimeout(animationTimeoutId);
  }
  moves = []; // Clear previous moves
  array = Array.from({ length: arraySize }, () => Math.random());
  unhighlightCode(); // Remove code highlighting
  // Render bars with default color (black, per CSS)
  showBars();
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
  if (animationTimeoutId) {
    clearTimeout(animationTimeoutId);
  }
}

// Animate sorting process
function animate() {
  if (isPaused) return; // Stop if paused
  if (!moves.length) {
    markSorted();      // Marks bars green if sorting is naturally complete.
    unhighlightCode(); // Clear code highlighting.
    return;
  }

  const move = moves.shift() || {};
  const { indices = [], type, line } = move;

  if (line !== undefined) {
    highlightCode(line);
  } else {
    unhighlightCode();
  }

  if (type === "swap" && indices.length >= 2) {
    const [i, j] = indices;
    [array[i], array[j]] = [array[j], array[i]];
  } else if (type === "over" && indices.length >= 2) {
    array[indices[0]] = indices[1];
  }

  indices.forEach(index => {
    if (array[index] !== undefined) {
      playNote(200 + array[index] * 500);
    }
  });

  if (indices.length > 0 && type) {
    showBars({ indices, type });
  } else {
    showBars();
  }

  animationTimeoutId = setTimeout(() => animate(), animationSpeed);
}

function updateSpeed() {
  // Get the slider value as an index (0 to 10)
  const sliderIndex = parseInt(document.getElementById("speedSlider").value);
  // Invert the index: index 0 (leftmost) should yield the slowest speed (250 ms),
  // and index 10 (rightmost) should yield the fastest speed (10 ms).
  const maxIndex = speedValues.length - 1; // 10
  animationSpeed = speedValues[maxIndex - sliderIndex];
  document.getElementById("speedValue").innerText = animationSpeed;
}

function updateSize() {
  arraySize = parseInt(document.getElementById("sizeSlider").value);
  document.getElementById("sizeValue").innerText = arraySize;
  init();
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

function markSorted() {
  const bars = document.querySelectorAll(".bar");
  bars.forEach(bar => bar.style.backgroundColor = "green");
}

function highlightCode(line) {
  const lineElements = document.querySelectorAll("#code-block .code-line");
  lineElements.forEach((el, idx) => {
    el.classList.remove("highlighted-line");
    if (idx === line) {
      el.classList.add("highlighted-line");
    }
  });
}

function unhighlightCode() {
  const lineElements = document.querySelectorAll("#code-block .code-line");
  lineElements.forEach(el => el.classList.remove("highlighted-line"));
}

function renderCode(snippet) {
  const codeBlock = document.getElementById("code-block");
  codeBlock.innerHTML = "";
  const lines = snippet.split("\n").filter(line => line.trim() !== "");
  lines.forEach((lineText, idx) => {
    const lineEl = document.createElement("span");
    lineEl.innerText = lineText;
    lineEl.dataset.line = idx;
    lineEl.classList.add("code-line");
    codeBlock.appendChild(lineEl);
    codeBlock.appendChild(document.createElement("br"));
  });
}

const codeSnippets = {
  bubble_sort: `
function bubble_sort(arr) {
    do {
      var swapped = false;
      for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] > arr[i]) {
          swapped = true;
          [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
        }
      }
    } while (swapped);
}`,
  insertion_sort: `
function insertion_sort(arr) {
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
}`,
  selection_sort: `
function selection_sort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
}`,
  merge_sort: `
function merge_sort(arr) {
    if (arr.length < 2) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = merge_sort(arr.slice(0, mid));
    const right = merge_sort(arr.slice(mid));
    return merge(left, right);
}

function merge(left, right) {
    let result = [];
    while (left.length && right.length) {
      result.push(left[0] < right[0] ? left.shift() : right.shift());
    }
    return result.concat(left, right);
}`,
  heap_sort: `
function heap_sort(arr) {
    buildMaxHeap(arr);
    for (let i = arr.length - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      heapify(arr, 0, i);
    }
}

function buildMaxHeap(arr) {
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      heapify(arr, i, arr.length);
    }
}

function heapify(arr, i, length) {
    let largest = i, left = 2 * i + 1, right = 2 * i + 2;
    if (left < length && arr[left] > arr[largest]) largest = left;
    if (right < length && arr[right] > arr[largest]) largest = right;
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(arr, largest, length);
    }
}`,
  shell_sort: `
function shell_sort(arr) {
    let gap = Math.floor(arr.length / 2);
    while (gap > 0) {
      for (let i = gap; i < arr.length; i++) {
        let temp = arr[i], j = i;
        while (j >= gap && arr[j - gap] > temp) {
          arr[j] = arr[j - gap];
          j -= gap;
        }
        arr[j] = temp;
      }
      gap = Math.floor(gap / 2);
    }
}`,
  quick_sort: `
function quick_sort(arr, left, right){
    if(right - left <= 0){
        return;
    } else {
        let partitionPoint = partition(arr, left, right);
        quick_sort(arr, left, partitionPoint-1);
        quick_sort(arr, partitionPoint + 1, right);
    }
}

function partition(arr, left, right, moves) {
    let pivot = arr[right];
    let i = left - 1;
    for (let j = left; j < right; j++) {
      if (arr[j] <= pivot) {
        i++;
        swap(arr, i, j, moves, 5);
      }
    }
    swap(arr, i + 1, right, 6);
    return i + 1;
}

function swap(arr, i, j, moves, line) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}`
};
