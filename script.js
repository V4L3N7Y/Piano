

const pianoKeys = document.querySelectorAll(".piano-keys .key"),
volumeSlider = document.querySelector(".volume-slider input[type='range']"),
keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [],
audio = new Audio("tunes/a.wav");


///update ..now you can press multiple keys and the sound will play simultaneous without interruptions
const playTune = (key) => {
    const audio = new Audio(`tunes/${key}.wav`);
    //volume slider fixed
    let volume = volumeSlider.value > 1 ? 1 : volumeSlider.value < 0 ? 0 : volumeSlider.value;
    audio.volume = volume
    audio.play();

    const clickedKey = document.querySelector(`[data-key="${key}"]`)
    clickedKey.classList.add("active");
    setTimeout(() => {
        clickedKey.classList.remove("active");
    },150)
}



pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key);
    key.addEventListener("click", () => playTune(key.dataset.key));
    console.log(key.dataset.key);
})

const pressedKey = (e) => {
    if(allKeys.includes(e.key)) {
    playTune(e.key);
    }
    console.log(e);
}

const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

const handleVolume = (e) => {
    audio.volume = e.target.value;
}

const playButton = document.getElementById("play-button");
let intervalId;

playButton.addEventListener("click", () => {

  const notesToPlay = wolfensteinMusicKeys; // Array of notes `[key pressed]` to play
  let index = 0;

  // Play the notes at an interval of 400ms
  intervalId = setInterval(() => {
    playTune(notesToPlay[index]);
    index++;

    if (index >= notesToPlay.length) {
      clearInterval(intervalId);
    }
  }, 250);
});

console.log('a')
keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);