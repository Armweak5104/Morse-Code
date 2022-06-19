let inputBox
let input
let converted
let startButton
let noiseAmps = []
let convertedMorse
let output

function setup() {
  createCanvas(window.innerWidth,window.innerHeight)
  inputBox = createInput("Default input text")
  inputBox.position(width/2-150, height/2)
  inputBox.size(300)

  osc = new p5.Oscillator();
  osc.amp(0)
  osc.start();

  frameRate(3)

  startButton = createButton('Start');
  startButton.position(width/2-20, height/2 + 80)
  startButton.mousePressed(startButtonPressed)
}

let arr = [1,0,1,1,0]
function draw() {
  background("black")
  input=inputBox.value()
  //console.log(inputBox.value())

  fill("white");
  stroke("white");
  textSize(30);
  textAlign(CENTER);
  text(input, width/2,height/2-20)

//   morse_code = conversion(input.toLowerCase())
//   //console.log(morse_code)
//   text(morse_code,width/2,height/2-50)

//   convertedMorse=mToE(inputBox.value())

//   text(convertedMorse,width/2,height/2-100)

  if (inputBox.value().toLowerCase()[0] in morse) {
  output = conversion(inputBox.value().toLowerCase())
} else {
  output = mToE(inputBox.value())
}

  text(output,width/2,height/2-100)
  // let word = "apple"
  // converted =""
  // for(let i=0;i<word.length;i++){
  //   converted+= morse[word[i]]+" "
  // }
  // console.log(converted)
  // let a = shorten(converted)
  // console.log(a)
  //console.log(noise_conversion("hello"))

  let nextAmp = noiseAmps.shift()
  // console.log(nextAmp)
  // console.log(noiseAmps)
  //console.log(arr)
  osc.amp(nextAmp)

  //arr.push(500)

  //.[1,0]  -[1,1,1,0] " "[0,0,0] /[0,0,0,0,0,0]
}
let sounds = {'.' : [1,0] , '-': [1,1,1,0], ' ': [0,0,0], '/': [0,0,0,0,0,0] }

let morse = {'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 'f': '..-.', 'g': '--.', 'h': '....', 'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..', 'm': '--', 'n': '-.', 'o': '---', 'p': '.--.', 'q': '--.-', 'r': '.-.', 's': '...', 't': '-', 'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-', 'y': '-.--', 'z': '--..', ' ': '/'};

let english = {}
for (let i in morse){
  english[morse[i]]=i
}
console.log(english)
//1) store dots dashes somewhere
//2) when u see space --> convert
//3) store converted
//4) dots and dashes cleared

//"-.-..-.--.-"


function mToE(word){
  //word += " "
  let morseLetter=""
  let eng=""
  for (let i=0;i<word.length;i++){
    if (word[i]=="." || word[i]=="-"){
      morseLetter+= word[i]
    }
    if (word[i]==" " || i==word.length-1){
      eng+=english[morseLetter]
      morseLetter=""
    }
    if (word[i]=="/"){
      eng+=" "
    }
  }
  return eng
}


function conversion(word){
  let converted=""
  for(let i=0;i<word.length;i++){

    if (i == word.length -1) {
      converted+= morse[word[i]]
    } else {
      converted+= morse[word[i]]+" "
    }
   }
  return converted
}

function noise_conversion(words){
  let amps=[]
  let mc = conversion(words)
  for(let i=0;i<mc.length; i++){
    amps.push.apply(amps,sounds[mc[i]])
  }
  return amps
}

//push([1,1,1])
//console.log(converted)//
function startButtonPressed(){
 noiseAmps= noise_conversion(inputBox.value())
}

console.log(conversion("nvnfnv"))
