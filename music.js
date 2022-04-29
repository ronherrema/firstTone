// const { Tone } = require("tone/build/esm/core/Tone")

const notes = ["C2", "C3", "E3", "F3", "G3", "C4", "E4", "D4"]

let synth

let panner

panner = new Tone.Panner3D({
  panningModel: "HRTF",
  positionX: 2,
  positionY: -5,
  positionZ: 3,
})

synth = new Tone.PolySynth({
  volume: -10,
  envelope: {
    attack: 0.1,
    decay: 0,
    sustain: 0.05,
    release: 0,
  },
}).chain(panner, Tone.Destination)

synth.set({
  oscillator: {
    type: "sine",
  },
})

var pattern = new Tone.Pattern(
  (time, note) => synth.triggerAttackRelease(note, "16n"),
  Array(12)
    .fill()
    .map(() => notes[Math.floor(Math.random() * notes.length)]),
  "upDown"
)

pattern.loop = false
pattern.interval = "12n"

document.getElementById("play-button").addEventListener("click", function () {
  if (Tone.Transport.state !== "started") {
    Tone.start()
    Tone.Transport.start()
    pattern.start(0)
  } else {
    Tone.Transport.stop()
  }
})
