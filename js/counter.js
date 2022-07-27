var sounds = [
  {"file":"alarm.wav", "description": "Alarm"},
  {"file":"mixkit-battleship-alarm-1001.wav", "description": "Battleship Alarm"},
  {"file":"mixkit-casino-win-alarm-and-coins-1990.wav", "description": "Casino Win Alarm And Coins"},
  {"file":"mixkit-city-alert-siren-loop-1008.wav", "description": "City Alert Siren"},
  {"file":"mixkit-classic-alarm-995.wav", "description": "Classic Alarm"},
  {"file":"mixkit-retro-game-emergency-alarm-1000.wav", "description": "Retro Game Emergency Alarm"},
  {"file":"mixkit-scanning-sci-fi-alarm-905.wav", "description": "Scanning Sci Fi Alarm"},
  {"file":"mixkit-security-facility-breach-alarm-994.wav", "description": "Security Facility Breach Alarm"},
  {"file":"mixkit-sound-alert-in-hall-1006.wav", "description": "Sound Alert In Hall"},
  {"file":"mixkit-street-public-alarm-997.wav", "description": "Street Public Alarm"},
  {"file":"mixkit-warning-alarm-buzzer-991.wav", "description": "Warning Alarm Buzzer"}
];

function startTimer(){
    defineSound();
    document.getElementById("formCounter").classList.add("hide");
    document.getElementById("counterBox").classList.remove("hide");
    startInternval();
}

function cancelTimer(){
  document.getElementById("counterBox").classList.add("hide");
  document.getElementById("formCounter").classList.remove("hide");
  clearInterval(intervalTimer);
  stopSound();
  document.getElementById("counter").innerHTML = ""
  document.getElementById("counter").classList.remove("blink");
}

function myOption(element, value, label){
  let valueStr = value.toString().padStart(2,"0");
  element.appendChild(new Option(valueStr + " " + label, value))
}

function checkExternal(element) {
  if(element.checked){
    document.getElementById("soundsBox").classList.add("hide");
    document.getElementById("externalBox").classList.remove("hide");
  } else {
    document.getElementById("soundsBox").classList.remove("hide");
    document.getElementById("externalBox").classList.add("hide");
  }
}

function playSound(){
  document.getElementById("audio").play();
}

function defineSound(){
  let audioElement = document.getElementById("audio");
  //check use external sound
  if(document.getElementById("externalSound").checked){
    let value = String(document.getElementById("linkSound").value).trim();
    if(value == ''){
      alert("Don't have value in the box of the link")
      return;
    } else {
      audioElement.src = value;
    }
  } else {
    //Use internal audio
    audioElement.src = "./audio/" + document.getElementById("sounds").value;
  }
}

function stopSound(){
  soundActive = false;
  document.getElementById("audio").pause();
  document.getElementById("audio").currentTime = 0;
}

function populateBox(){
  let hourList = document.getElementById("hours");
  let minuteList = document.getElementById("minutes");
  let secondsList = document.getElementById("seconds");
  let soundList = document.getElementById("sounds");

  for (var value = 1; value < 60; value++) {
    if(value<24) {
      myOption(hourList,value,"H");
    }
    myOption(minuteList,value,"Min");
    myOption(secondsList,value,"Sec");
  }
  sounds.forEach(sound => {
    soundList.appendChild(new Option(sound.description, sound.file))
  })
}

function getNumberOfBox(name){
  let item = document.getElementById(name);
  return Number(item.value)
}

//var to set Internval
var intervalTimer;

//play sound timer
var soundActive = false;

//var countDownDate
var countDownDate;

//Start interval;
function startInternval(){ 
  countDownDate = new Date();
  countDownDate.setHours(countDownDate.getHours() + getNumberOfBox("hours"));
  countDownDate.setMinutes(countDownDate.getMinutes() + getNumberOfBox("minutes"));
  countDownDate.setSeconds(countDownDate.getSeconds() + getNumberOfBox("seconds"));
  timer();
  intervalTimer = setInterval(function(){timer();}, 500);
}

//function timer
function timer() {

  // Get today's date and time
  let now = new Date().getTime();

  // Find the distance between now and the count down date
  let distance = countDownDate - now;

  // Time calculations hours, minutes and seconds
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if(distance > 0){
    // Display the result in the element with id="counter"
    document.getElementById("counter").innerHTML = String(hours).padStart(2,"0") + ":"+ String(minutes).padStart(2,"0")  + ":" + String(seconds).padStart(2,"0") ;
  } else {
    // If the count down is finished, write some text
    clearInterval(intervalTimer);
    document.getElementById("counter").innerHTML = "Timer is Over";
    document.getElementById("counter").classList.add("blink");
    soundActive = true;
    playSound();
  }
}

setInterval(function(){
  let now = new Date();
  let result = now.getSeconds() % 5;
  if(soundActive && result == 0){
    playSound();
  }
}, 500);