const vowel = ["A", "E", "I", "O", "U", "A", "E", "O"]
const consonant = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z", "B", "C", "D", "F", "G", "H", "K", "L", "M", "N", "P", "R", "S", "T", "V", "W"]
lettArray = [];
showMeaning = false;
var letScore = 0
var enteryNo = 0;
myForm.input_answer.value = '';
document.getElementById("input_answer").disabled = true;
document.getElementById("message").innerHTML = "Please Select 9 letters as vowles or consonants";
document.getElementById("bscore").innerHTML = localStorage.getItem("bestLscore");


function getLetter(letter) {
  var x = document.querySelectorAll("#display button")
  var lenBtn = x.length

  if (lenBtn == 8) {

    document.getElementById("control").innerHTML = '<button class="btnControl" value="Clear"  id="clearButton" onclick="resetLetters();">Clear</button>' +
      '<button class="btnControl" value="&#10140;"  onclick="saveWord()">Save Word &#10140;</button>'

    document.getElementById("message").innerHTML = "Use 'Save Word' button to save your word"
    timer()
  }

  if (lenBtn < 9) {
    var myLetter = letter[Math.floor(Math.random() * letter.length)]
    var btn = document.createElement("button")
    btn.setAttribute("value", myLetter)
    btn.innerHTML = myLetter
    btn.setAttribute("onClick", "this.disabled=true ,  myFunction(this.value)")
    btn.setAttribute("class", "btnClass1")
    var mydisplay = document.getElementById("display")
    mydisplay.appendChild(btn)
  }
}

function myFunction(value) {
  myForm.input_answer.value += value;
}

function resetLetters() {
  myForm.input_answer.value = '';
  let x = document.getElementById("display").querySelectorAll("button");
  n = x.length;
  for (i = 0; i < n; i++) {
    x[i].disabled = false;
  }

  let y = document.getElementById("saved").querySelectorAll("button");
  n = y.length
  for (i = 0; i < n; i++) {
    y[i].disabled = false;
  }

}

function saveWord() {
  let x = document.querySelectorAll("#saved button")
  var lenBtn = x.length
  var btnId = 'btn2' + lenBtn;

  wrdValue = myForm.answer.value
  if (wrdValue != '') {
    var newWrd = document.createElement("button")
    newWrd.setAttribute("value", wrdValue)
    newWrd.setAttribute("class", "btnClass2")
    newWrd.setAttribute("id", btnId)
    newWrd.setAttribute("onClick", "submitWord(this.value , this.id)")
    newWrd.innerHTML = wrdValue;
    var mydisplay = document.getElementById("saved")
    mydisplay.appendChild(newWrd)
  }
}

function submitWord(value, id) {
  // disable all the non selected saved words.
  myId = id
  let x = document.querySelectorAll("#saved button")
  lenBtn = x.length

  for (i = 0; i < lenBtn; i++) {
    if (x[i].id != myId) {
      x[i].disabled = true;
    }
  }

  // if time interval has cleared fetch word from dictionary
  if (showMeaning == true) {
    var theWord = value;
    url = 'https://mydictionaryapi.appspot.com/?define=' + theWord
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', url);
    ourRequest.onload = function () {


      console.log(ourRequest.status)
      if (ourRequest.status == 404) {
        document.getElementById("message").innerHTML = theWord + " is not in the dictionary";
        finishGame()
      } else {

        //calculate points based on word length;
        let lenWord = theWord.length;

        if (lenWord <= 6) {
          letScore = lenWord * 2;
        } else {
          switch (lenWord) {
            case 0:
              letScore = 0;
              break;
            case 1:
              letScore = 0;
              break;
            case 7:
              letScore = 15
              break;
            case 8:
              letScore = 20
              break;
            case 9:
              letScore = 25
              break;
          }
        }
        document.getElementById("score").innerHTML = "Score: " + letScore
        console.log("before if " + enteryNo)
        // save value to local storage if first entery
        if (enteryNo == 0) {
          // Update local score if current score is higher        
          if (typeof (Storage) !== "undefined") {
            // Store
            bestScore = Number(localStorage.getItem("bestLscore"))
            console.log(bestScore)

            if (letScore > bestScore) {
              localStorage.setItem("bestLscore", letScore);
            }
          }
          // Retrieve
          document.getElementById("bscore").innerHTML = localStorage.getItem("bestLscore");
        } else {
          // document.getElementById("bscore").innerHTML = "";
        }


        enteryNo++
        console.log("after if " + enteryNo)

        
        // get meaning for the word
        const resData = JSON.parse(this.responseText);
        ourWord = resData[0].word
        let myMean1 = resData[0].meaning
        let myValues = Object.values(myMean1)

        if (Array.isArray(myValues) == true) {
          len = myValues.length
          for (i = 0; i < len; i++) {
            var meaning = myValues[i]
          }
        }

        theMeaning = "<span class='word'>" + ourWord + " :</span> " + meaning[0].definition
        document.getElementById("message").innerHTML = theMeaning;
        finishGame()
        return theMeaning;

      }
    }
    ourRequest.send();
  }
}

function finishGame() {
  document.getElementById("finish").innerHTML =
    '<button class="btnControl2" value="Play Again"  onclick="document.location.reload(true)">Play Again</button> ' + 
    '<button class="btnControl2" value="Clear"  id="clearButton" onclick="resetLetters();">Clear</button>' +
    '<button class="btnControl2" value="&#10140;"  id="clearButton" onclick="saveWord(this.value);">save &#10140;</button>'
}


function timer() {
  var timeLeft = 35;
  var allowedTime = setInterval(function () {
    timeLeft -= 1;
    document.getElementById("time").innerHTML = "00:" + timeLeft;

    if (timeLeft <= 0) {
      var x = document.getElementById("display").querySelectorAll("button");
      n = x.length;
      for (i = 0; i < n; i++) {
        x[i].disabled = true;
      }
      showMeaning = true;
      //  See if anywords to submit
      let y = document.querySelectorAll("#saved button")
      lenBtn = y.length

      if (lenBtn == 0) {
        document.getElementById("message").innerHTML = "You did not make any words"
        finishGame()

        clearInterval(allowedTime);
        letScore = 0
        document.getElementById("score").innerHTML = "Score: " + letScore
      } else {
        document.getElementById("message").innerHTML = "Please click the word you wish to submit"
        document.getElementById("control").innerHTML = ''
        clearInterval(allowedTime);
        return showMeaning;
      }
    }
  }, 1000)
}


function backSpace() {
  var value = document.getElementById("input_answer").value;
  var len = value.length
  var lastChar = value.substr(len - 1)
  document.getElementById("input_answer").value = value.substr(0, value.length - 1)
}