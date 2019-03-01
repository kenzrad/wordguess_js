
//create array for word choices
var words = [
    "hyrule", 
    "link", 
    "navi", 
    "whiterun", 
    "horde",
    "magicka", 
    "bethesda", 
    "greybeards", 
    "sovngarde", 
    "wasteland",  
    "triforce", 
    "ocarina", 
    "epona", 
    "gananondorf",
    "deku",
    "radiation",
    "ghoul",
    "toadstool",
    "rayman",
    "argonia",
    "dunmer",
    "khajiit",
    "tamriel",
    "overlord",
    "nordic",
    "sheik",
    "brotherhood",
    "goodneighbor",
    "nukacola",
    "codsworth",
    "deathclaw",
    "mirelurk",
    "bloodbug",
    "radroach",
    "annihilator",
    "behemoth",
    "necrolyte",
    "conjuration",
    "wisp",
    "balverine",
    "arngeir",
    "dragonborn",
    "paarthurnax",
];

//variables and arrays that we see
var letter = [];
var limbs = 6;
var wins = 0;
var losses = 0;


//Ghost variables and arrays
var word = 0;
var userGuess;
var wordAnswer = []; //placeholder array for my word letters
var lettersLeft = 0;
var check = 0;

var checkBankFunction = false;
var checkWordFunction = false;
var cancelled = false;

// Create variables that hold references to the places in the HTML where we want to display things.
var directionsText = document.getElementById("directions-text");
var wordAnswerText = document.getElementById("word-answer-text");
var letterText = document.getElementById("letter-text");
var limbsText = document.getElementById("limbs-text");
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");
var wordBox =  document.getElementById("word-answer-box");
var hangBox =  document.getElementById("hang-box");



document.onkeyup = function(gameOn) {
    if (cancelled) {
        return;
    }
    else if (word == 0) {
        word = words[Math.floor(Math.random() * words.length)]; 
        //This is a loop that will add one "_" until the "n-1" the word.length.
        for (var i = 0; i < word.length; i++) { 
            wordAnswer[i] = ("_");
        };
        wordBox.style.borderTop = "thin solid #68CEB3";
        hangBox.style.borderTop = "thin solid #68CEB3";
    //my function for the scoreboard and whatnot
    progressTracker();
    }

    //LOOP the game while there are still letters remaining
    else if (lettersLeft > 0) {
        readLetter(); //check to make sure its actually a letter and the user doesn't want to peace out
        checkBank(); //check to make sure letter hasn't been guessed before (incorrectly)
        checkWord(); //check to make sure letter hasn't been guessed before (correctly)
        if (checkBankFunction === false && checkWordFunction === false) {
            letterLoop(); //commence the search for the letter
        }
        else {
            return; //stop looking if the letter has already been selected (either check function is true)
        }
    }

    function letterLoop() {
        directionsText.textContent = " ";
        check = lettersLeft;
        for (var i = 0; i < wordAnswer.length;  i++) {
            if (word[i] === userGuess) {
                lettersLeft--;
                wordAnswer[i] = userGuess;
                wordAnswerText.textContent = wordAnswer.join(" ");
                if ((lettersLeft === 0)&&(limbs > 0)) {
                    wordAnswerText.textContent = word;
                    alert("OMG!!! You guessed the word " + word + "!")
                    wins++;
                    cleanSlate();
                }
            }
        }
        if ((lettersLeft - check) === 0) {
            limbs--;
            limbsText.textContent = "Number of Limbs Remaining: " + limbs;
            letter.push(userGuess);
            letterText.textContent = ("Incorrect Letters Guessed: " + letter.join(" "));
            if (limbs === 0) {
                wordAnswerText.textContent = word;
                alert("SURIOUSLY?! The word was " + word + "!")
                losses++;
                cleanSlate();
            }
        }
    }

    function progressTracker () {
        wordAnswerText.textContent = wordAnswer.join(" ");
        lettersLeft = wordAnswer.length; //my array that counts the "_" (in a nutshell)
        directionsText.textContent = "Guess any letter of the alphabet!";
        letterText.textContent = "Incorrect Letters Guessed: " + letter;
        limbsText.textContent = "Number of Limbs Remaining: " + limbs;
        winsText.textContent = "Wins: " + wins;
        lossesText.textContent = "Losses: " + losses;
    }

    function readLetter() {
        var x = gameOn.charCode || gameOn.keyCode; //this converts it to the character code
        var y = String.fromCharCode(x);  //keeps one version a string
        if (x > 64 && x < 91) { //this checks to make sure it's actually a letter
            userGuess = y.toLowerCase(); //logs the userGuess letter
            console.log(userGuess); 
        }
        else if ( x === 27) {
            var con = confirm("Are you leaving me?");
            if (con == true) {
                goodBye();
            }
            else {
                return;
            }
        }
        else {
            alert("Please press a letter A-Z, you ding dong!") //if it's not a letter, it'll alert! I MEAN C'MON!
            return;
        }
    }

    function checkWord() {
        for (var i = 0; i < wordAnswer.length;  i++) {
            if (wordAnswer[i] === userGuess) {
                checkWordFunction = true;
                return;
            }
            else {
                checkWordFunction = false;
            }
        }
    }

    function checkBank() {
        for (var i = 0; i < letter.length;  i++) {
            if (letter[i] === userGuess) {
                checkBankFunction = true;
                return;
            }
            else {
                checkBankFunction = false;
            }
        }
    }

    function cleanSlate() {
        word = 0;
        wordAnswer = [];
        limbs = 6;
        letter = [];
        directionsText.innerHTML = "<i>Press any key to play again!</i>";
        letterText.textContent = "Incorrect Letters Guessed: ";
        limbsText.textContent = "Number of Limbs Remaining: " + limbs;
        winsText.textContent = "Wins: " + wins;
        lossesText.textContent = "Losses: " + losses;
    }
 
}

function goodBye () {
    directionsText.textContent = "Sayonara!";
    letterText.style.display = 'none';    
    winsText.style.display = 'none';  
    lossesText.style.display = 'none';  
    letterText.style.display = 'none';  
    limbsText.style.display = 'none';
    wordAnswerText.style.display = 'none';
    cancelled = true; //gameOn will not run if set to true
}