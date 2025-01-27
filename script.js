const n = 20;
let array = [];

init();

let audioCtx=null;

function playNote(freq){
  if(audioCtx==null){
    audioCtx=new(
      AudioContext ||
      webkitAudioContext ||
      window.webkitAudioContext
    )();
  }

  const dur=0.1;
  const osc=audioCtx.createOscillator();
  osc.frequency.value = freq;
  osc.start();
  osc.stop(audioCtx.currentTime+dur);
  const node = audioCtx.createGain();
  node.gain.value = 0.05;
  node.gain.linearRampToValueAtTime(0, audioCtx.currentTime+dur);
  osc.connect(node);
  node.connect(audioCtx.destination);
}


function init() {
  array = []; // Clear the array
  for (let i = 0; i < n; i++) {
    array.push(Math.random());
  }
  showBars();
}

function play() {
  const copy=[...array];
  const moves = bubble_sort(copy);
  animate(moves);
}

function animate(moves){
  if (moves.length==0){
    showBars();
    return;
  }
  const move = moves.shift();
  const [i, j] = move.indices;

  if (move.type=="swap"){
    [array[i], array[j]] = [array[j], array[i]];
  }
  
  playNote(200+array[i]*500);
  playNote(200+array[j]*500);

  showBars(move);
  setTimeout(function(){
    animate(moves);
  }, 50)
}

function bubble_sort(arr) {
  const moves =[];
  do{
    var swapped = false;
    for(let i = 1; i <arr.length;i++){
      // moves.push({indices: [i-1, i], type:"comp"});
      if(arr[i-1] > arr[i]){
        swapped=true;
        moves.push({indices: [i-1, i], type:"swap"});
        [arr[i-1], arr[i]] = [arr[i], arr[i-1]];
      }
    }
  }while(swapped);
  return moves;
}


function showBars(move) {
  const container = document.getElementById("container");
  container.innerHTML = ""; // Clear existing bars before re-rendering
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] * 100 + "%";
    bar.classList.add("bar");

    if(move && move.indices.includes(i)){
      bar.style.backgroundColor=
        move.type=="swap"?"red":"blue";
    }
    container.appendChild(bar);
  }
}


// Ensure DOM is fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", () => {
  const initButton = document.querySelector("button#init");
  const playButton = document.querySelector("button#play");
  
  if (initButton && playButton) {
    initButton.addEventListener("click", init);
    playButton.addEventListener("click", play);
  } else {
    console.error("Buttons not found in the DOM");
  }
});
