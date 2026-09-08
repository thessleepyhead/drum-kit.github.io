// Detect Button Clicks
var noOfDrums = document.querySelectorAll(".drum").length;
for (var i = 0; i < noOfDrums; i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", function () {
    var buttonInnerHTML = this.innerHTML;
    handleInteraction(buttonInnerHTML);
  });
}

// Detect Keypresses
document.addEventListener("keypress", function (event) {
  handleInteraction(event.key.toLowerCase());
});

// Single Master Handler for sound, animation, and recording
function handleInteraction(key) {
  makeSound(key);
  buttonAnimation(key);
  recordNote(key); // <--- Captures the note whenever drum plays
}

function makeSound(key) {
  switch (key) {
    case "w":
      var audio = new Audio("sounds/tom-1.mp3");
      audio.play();
      break;
    case "a":
      var audio = new Audio("sounds/tom-2.mp3");
      audio.play();
      break;
    case "s":
      var audio = new Audio("sounds/tom-3.mp3");
      audio.play();
      break;
    case "d":
      var audio = new Audio("sounds/tom-4.mp3");
      audio.play();
      break;
    case "j":
      var audio = new Audio("sounds/crash.mp3");
      audio.play();
      break;
    case "k":
      var audio = new Audio("sounds/kick-bass.mp3");
      audio.play();
      break;
    case "l":
      var audio = new Audio("sounds/snare.mp3");
      audio.play();
      break;
    default:
      break;
  }
}

function hideStarterNote() {
  const note = document.querySelector("#starter-note");
  if (note) {
    note.style.transition = "opacity 0.5s ease";
    note.style.opacity = "0";
    setTimeout(() => note.remove(), 500);
  }
}

// Hide note on key press or click anywhere
document.addEventListener("keydown", hideStarterNote, { once: true });
document.addEventListener("click", hideStarterNote, { once: true });

function buttonAnimation(currentKey) {
  var activeButton = document.querySelector("." + currentKey);
  if (activeButton) {
    activeButton.classList.add("pressed");
    setTimeout(function () {
      activeButton.classList.remove("pressed");
    }, 200);
  }
}

// Recording State Variables
let isRecording = false;
let recordedBeat = [];
let startTime = 0;

const recordBtn = document.getElementById("record-btn");
const playBtn = document.getElementById("play-btn");

// Toggle Recording State
recordBtn.addEventListener("click", function () {
  isRecording = !isRecording;

  if (isRecording) {
    recordedBeat = []; // Clear previous recording
    startTime = Date.now(); // Record baseline timestamp
    recordBtn.textContent = "⏹️ Stop Recording";
    recordBtn.classList.add("recording");
    playBtn.disabled = true;
  } else {
    recordBtn.textContent = "🔴 Record";
    recordBtn.classList.remove("recording");
    if (recordedBeat.length > 0) {
      playBtn.disabled = false; // Enable play button if sounds were recorded
    }
  }
});

// Play Back the Recorded Sequence
playBtn.addEventListener("click", function () {
  if (recordedBeat.length === 0) return;

  playBtn.disabled = true;
  recordBtn.disabled = true;

  recordedBeat.forEach((note) => {
    setTimeout(() => {
      makeSound(note.key);
      buttonAnimation(note.key);
    }, note.time);
  });

  // Re-enable controls after sequence finishes
  const totalDuration = recordedBeat[recordedBeat.length - 1].time + 300;
  setTimeout(() => {
    playBtn.disabled = false;
    recordBtn.disabled = false;
  }, totalDuration);
});

// Helper function to capture key triggers during recording
function recordNote(key) {
  if (isRecording) {
    const timeOffset = Date.now() - startTime;
    recordedBeat.push({ key: key, time: timeOffset });
  }
}