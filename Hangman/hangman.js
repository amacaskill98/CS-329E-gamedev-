const PROMPTS = document.querySelectorAll("#p1, #p2");

PROMPTS[1].classList.add("hide");

const PARTS = document.querySelectorAll(".overlay");

for (var i = 0; i < PARTS.length - 1; i++){
  PARTS[i].classList.add("hide");
}

const INPUT = document.querySelector("#secretWord");
const WORD = document.querySelector("#word");
var wordCurrent = [];
var secretWord = [];

function submitWord(e){
  if (e.key == "Enter") {

    secretWord = INPUT.value.toLowerCase().split("");
    var censor = ["_"];
    if (secretWord != [""]){
      for (var i = 0; i < secretWord.length - 1; i++){
        censor.push("_");
      }
    wordCurrent = censor;
    WORD.innerHTML = censor.join(" ");
    INPUT.value = "";
    PROMPTS[0].classList.add("hide");
    PROMPTS[0].querySelector("#secretWord").outerHTML = "<input type= \"password\" id=\"secretWord\" disabled>";
    PROMPTS[1].classList.remove("hide");
    }
  }
}

INPUT.addEventListener('keydown', function(e){submitWord(e)}, false);

const GUESS = document.querySelector("#guess");
const GUESSLIST = document.querySelector("#guesses");
var count = 0;

function getAllIndexes(arr, val) {
  var indexes = [], i = -1;
  while ((i = arr.indexOf(val, i+1)) != -1){
    indexes.push(i);
  }
    return indexes;
}

var guessed = [];

function submitGuess(e){
  if (e.key == "Enter"){
    guess = GUESS.value.toLowerCase();
    if (guess == secretWord.join("")){
      WORD.innerHTML = secretWord.join(" ");
      setTimeout(function(){
        alert("You Win! :)");
      }, 10);
      location.reload();
    } else {
      idx = getAllIndexes(secretWord, guess);
      if (idx.length != 0){
        guessed.push(guess);
        GUESSLIST.innerHTML = "Guessed letters/phrases: " + guessed.sort().join(", ");
        for (var i = 0; i < idx.length; i++){
          wordCurrent[idx[i]] = guess;
          WORD.innerHTML = wordCurrent.join(" ");
        }
      } else if (guessed.indexOf(guess) == -1){
        guessed.push(guess);
        GUESSLIST.innerHTML = "Guessed letters/phrases: " + guessed.sort().join(", ");
        PARTS[count].classList.remove("hide");
        count++;
        if (count == 6){
          for (var i = 0; i < PARTS.length - 1; i++){
            PARTS[i].classList.add("hide");
          }
          PARTS[6].classList.remove("hide");
          WORD.innerHTML = secretWord.join(" ");
          setTimeout(function(){
            alert("You Lose! :(");
          }, 10);
          location.reload();
        }
      } else {
        alert("You have already guessed that! Please try again.");
      }

    }
    GUESS.value = "";
  }
}

GUESS.addEventListener('keydown', function(e){submitGuess(e)}, false);
