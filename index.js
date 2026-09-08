
var noOfDrums= document.querySelectorAll(".drum").length;
for(var i=0;i<noOfDrums;i++){

 document.querySelectorAll(".drum")[i].addEventListener("click",function(){ 

  //detecting button Press
   var buttonInnerHTML=this.innerHTML; 
   makeSound(buttonInnerHTML); 
   buttonAnimation(buttonInnerHTML);
 });
} 
document.addEventListener("keypress", function(event ){
  makeSound(event.key); 
  buttonAnimation(event.key);
}); 

function makeSound(key) { 
  switch (key) {
    case "w":
     var audio= new Audio("sounds/tom-1.mp3") ;
     audio.play();
      break;
    case "w":
     var audio= new Audio("sounds/tom-1.mp3") ;
     audio.play();
      break;
    case "a":
     var audio= new Audio("sounds/tom-2.mp3") ;
     audio.play();
      break;
    case "s":
     var audio= new Audio("sounds/tom-3.mp3") ;
     audio.play();
      break;
    case "d":
     var audio= new Audio("sounds/tom-4.mp3") ;
     audio.play();
      break;
    case "j":
     var audio= new Audio("sounds/crash.mp3") ;
     audio.play();
      break;
    case "k":
     var audio= new Audio("sounds/kick-bass.mp3") ;
     audio.play();
      break;
    case "l":
       var audio= new Audio("sounds/snare.mp3") ;
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
  var activeButton= document.querySelector("."+currentKey);
  activeButton.classList.add("pressed");
	setTimeout(function() {
    activeButton.classList.remove("pressed");
  }, 200);
  
}
