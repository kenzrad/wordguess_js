
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

var insults = [
    "Are you even trying?",
    "Do you even game?",
    "I don't know what makes you so stupid, but it really works!",
    "Okay, dumb-dumb",
    "Suriously - there are only 26 letters in the alphabet",
    "And you call yourself a Nord.",
    "WELL, we all know who here wouldn't survive nuclear fallout",
    "I just can't",
    "COME ON!",
    "Are you always this thick?",
    "Navi can't save you now",
    "We are all very disappointed in you.",
    "I have no words",
    "wrong AGAIN",
    "WRONG",
    "NEWP",
    "Negatory",
    "Not even close, Mr. Not-even-close-man",
    "Do you enjoy failure?",
    "Yo momma wears army boots",
    "How could you do that to Mr. Blue Man Friend?",
    "You do realize what's at stake here, right?",
    "Awwwwww you're so cute when you try",
    "no no NO!",
    "Disappointing.",
    "....",
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
var howDare;

var checkBankFunction = false;
var checkWordFunction = false;
var cancelled = false;

// Create variables that hold references to the places in the HTML where we want to display things.
var directionsText = document.getElementById("directions-text");
var wordAnswerText = document.getElementById("word-answer-text");
var letterText = document.getElementById("letter-text");
var winsText = document.getElementById("wins-text");
var wordBox =  document.getElementById("word-answer-box");
var hangBox =  document.getElementById("hang-box");
var hangMan = document.getElementById("hang-man");
var insultDiv = document.getElementById("insult-div");

hangMan.style.visibility = "hidden";

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
        maim()
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
        insultDiv.textContent = " ";
        check = lettersLeft;
        for (var i = 0; i < wordAnswer.length;  i++) {
            if (word[i] === userGuess) {
                lettersLeft--;
                wordAnswer[i] = userGuess;
                wordAnswerText.textContent = wordAnswer.join("");
                if ((lettersLeft === 0)&&(limbs > 0)) {
                    wordAnswerText.textContent = word;
                    win();
                    cleanSlate();
                    
                }
            }
        }
        if ((lettersLeft - check) === 0) {
            limbs--;
            maim();
            letter.push(userGuess);
            letterText.textContent = ("Incorrect: " + letter.join(" "));
            if (limbs === 0) {
                wordAnswerText.textContent = word;
                lose();
                cleanSlate();
            }
        }
    }

    function progressTracker () {
        wordAnswerText.textContent = wordAnswer.join("");
        lettersLeft = wordAnswer.length; //my array that counts the "_" (in a nutshell)
        directionsText.textContent = "Guess any letter of the alphabet!";
        letterText.textContent = "Incorrect: " + letter;
        winsText.textContent = "WON: " + wins + " | LOST: " + losses; 
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

    function maim() {
        hangMan.style.visibility = "visible";
        if (limbs === 6) {
            document.getElementById("hang-man").src="assets/images/gallow.gif";
        }
        else if (limbs === 5) {
            document.getElementById("hang-man").src="assets/images/gallow_1.gif";
            insult();
        }
        else if (limbs === 4) {
            document.getElementById("hang-man").src="assets/images/gallow_2.gif";
            insult();
        }
        if (limbs === 3) {
            document.getElementById("hang-man").src="assets/images/gallow_3.gif";
            insult();
        }
        if (limbs === 2) {
            document.getElementById("hang-man").src="assets/images/gallow_4.gif";
            insult();
        }
        if (limbs === 1) {
            document.getElementById("hang-man").src="assets/images/gallow_5.gif";
            insult();
        }
    }

    function insult() {
        howDare = insults[Math.floor(Math.random() * insults.length)]; 
        insultDiv.textContent = howDare;
    }

    function win() {
        wins++;
        hangMan.style.visibility = "visible";
        document.getElementById("hang-man").src="assets/images/win.gif";
    }

    function lose() {
        document.getElementById("hang-man").src="assets/images/gallow_dead.gif";
        losses++;
    }

    function cleanSlate() {
        word = 0;
        wordAnswer = [];
        limbs = 6;
        letter = [];
        directionsText.innerHTML = "<i>Press any key to play again!</i>";
        letterText.textContent = "Incorrect: ";
        winsText.textContent =  "WON: " + wins + " | LOST: " + losses; 
    }
 
}

function goodBye () {
    document.getElementById("headHeadHead").src="https://fontmeme.com/permalink/190302/823c506ee10425ea8f1ee94797b69465.png";
    letterText.style.display = 'none';    
    winsText.style.display = 'none';   
    letterText.style.display = 'none';  
    wordAnswerText.style.display = 'none';
    letterText.style.display = 'none';
    winsText.style.display = 'none';
    wordBox.style.display = 'none';
    hangBox.style.display = 'none';
    hangMan.style.display = 'none';
    insultDiv.style.display = 'none';
    cancelled = true; //gameOn will not run if set to true
}