
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

//variables for number of wins/losses (start at 0)
var wins = 0;
var losses = 0;
var letter = [];

//Ghost variables
var word = 0;
var userGuess;
var wordAnswer;
var lettersLeft = 0;
var check = 0;
var limbs = 5;
var checkBankFunction = false;
var checkWordFunction = false;

// Create variables that hold references to the places in the HTML where we want to display things.
var directionsText = document.getElementById("directions-text");
var userChoiceText = document.getElementById("userchoice-text");
var wordAnswerText = document.getElementById("word-answer-text");
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");
var letterText = document.getElementById("letter-text");
var limbsText = document.getElementById("limbs-text");


document.onkeyup = function(gameOn) {
    if (word == 0) {
        //pick a random word from the array
        word = words[Math.floor(Math.random() * words.length)];
        console.log(word);
    
        //remove that word from the array so it doesn't get selected again:
        // indexOf.words[]
    
        //create an array to hold the placeholder letters ("_") for the randomized word
        wordAnswer = [];
    
        //This is a loop that will add one "_" until the "n-1" the word.length. This works out to the number of letters in the word because it starts at 0! The word becomes an array of "_"
        for (var i = 0; i < word.length; i++) {
            wordAnswer[i] = ("_");
        }
        wordAnswerText.textContent = wordAnswer.join(" ");
    
        //Create an array for remaining letters, which will be equal to the number of "_"
        lettersLeft = wordAnswer.length;
        console.log(lettersLeft);
        directionsText.textContent = "Guess any letter of the alphabet!";
        letterText.textContent = "Incorrect Letters Guessed: ";
        limbsText.textContent = "Number of Limbs Remaining: " + limbs;
        winsText.textContent = "Wins: " + wins;
        lossesText.textContent = "Losses: " + losses;
    }

//LOOP the game while there are still letters remaining
    else if (lettersLeft > 0) {
        readLetter();
        checkBank();
        checkWord();
        if (checkBankFunction === false && checkWordFunction === false) {
            letterLoop();
        }
        else {
            return;
        }
    }


    function letterLoop() {
        check = lettersLeft;
        console.log(lettersLeft);
        for (var i = 0; i < wordAnswer.length;  i++) {
            if (word[i] === userGuess) {
                lettersLeft--;
                console.log(lettersLeft);
                wordAnswer[i] = userGuess;
                wordAnswerText.textContent = wordAnswer.join(" ");
                if ((lettersLeft === 0)&&(limbs > 0)) {
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
                alert("SURIOUSLY?! The word was " + word + "!")
                losses++;
                cleanSlate();
            }
        }
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
                alert("You already picked that letter, C'MON!");
                checkWordFunction = true;
                console.log("Word check true");
                return;
            }
            else {
                checkWordFunction = false;
                console.log("Word check false");
            }
        }
    }

    function checkBank() {
        for (var i = 0; i < letter.length;  i++) {
            if (letter[i] === userGuess) {
                alert("Are you TRYING to lose more limbs?");
                checkBankFunction = true;
                console.log("Bank check true");
                return;
            }
            else {
                checkBankFunction = false;
                console.log("Bank check false");
            }
        }
    }

    function cleanSlate() {
        word = 0;
        wordAnswer = 0;
        limbs = 5;
        directionsText.textContent = "Press any key to try again!";
        letterText.textContent = "Incorrect Letters Guessed: ";
        limbsText.textContent = "Number of Limbs Remaining: " + limbs;
        winsText.textContent = "Wins: " + wins;
        lossesText.textContent = "Losses: " + losses;
    }

    
}

function goodBye () {
    directionsText.textContent = "Press any key if you want to play again, friend!";
    letterText.style.display = 'none';    
    winsText.style.display = 'none';  
    lossesText.style.display = 'none';  
    letterText.style.display = 'none';  
    limbsText.style.display = 'none';  
}


    //END GAME OPTIONS
    // If the player want to quit game {
    //     Quit Game
    // }

    // If the player guesses the word {
    //     End game and log win
    // }

    // If the player does not guess the word AND choices are up {
    // End game and log loss