
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
var wordAnsweNew;
var check = 0;
var limbs = 5;

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
        directionsText.textContent = "Guess any letter of the alphabet!";
        letterText.textContent = "Incorrect Letters Guessed: ";
        limbsText.textContent = "Number of Limbs Remaining: " + limbs;
        winsText.textContent = "Wins: " + wins;
        lossesText.textContent = "Losses: " + losses;
    
    }

//LOOP the game while there are still letters remaining
    else if (lettersLeft > 0) {
        userGuess = gameOn.key;
        check = lettersLeft;
        for (var i = 0; i < wordAnswer.length;  i++) {
            if (word[i] === userGuess) {
                lettersLeft--;
                wordAnswer[i] = userGuess;
                wordAnswerText.textContent = wordAnswer.join(" ");
            }
        }
        if ((lettersLeft - check) === 0) {
            limbs--;
            limbsText.textContent = "Number of Limbs Remaining: " + limbs;
            letter.push(userGuess);
            letterText.textContent = ("Incorrect Letters Guessed: " + letter.join(" "));
        }
    }
    else if ((lettersLeft === 0)&&(limbs > 0)) {
        wins++;
        word = 0;
        wordAnswer = null;
        userGuess = null;
    }
    else if (limbs == 0) {
        losses++;
        word = 0;
        wordAnswer = null;
        userGuess = null;
    }
    
}
    //     //     else {
        // directionsText.textContent = "Press any key to play again!";
        // return;
        // }   


    //Game on:
    //take player guesses
    //show game progress
    //update wordAnswer for correct guesses
    //update letterGuess for correct and incorrect guesses
    //update remainingGuesses for incorrect guesses

    //Player guesses (remember to convert to lowercase)
    // document.onkeyup = function(event) {
    //     gameOn()
    // }

    // If the word has not been guessed {
    //     Show the player current progress
    // }

    //log the player's guess

    //check if the guess is valid
    // for (var j = 0; j < word.length; j++) { //loops thorugh the letters of the random word
    //     if (word[j] === playerGuess) { //check if current letter in the word matches user entry
    //         wordAnswer[j] = playerGuess; //if true, than the wordAnswer array will get updated with the player guess. It should update in that spot because its looping the the letters (hopefully, need to test once I guess the script from user keys and whatnot)
    //         lettersLeft--; //if the letter matches, subtract 1 from the number of letters left (don't log this variable, I'm using this to track game status)
    //     }
    // }

    // If the player guess matches any letter of the random word {
    //     Reveal that letter in the word AND alert(letters log)
    // }
    // Else the player guesses a letter that doesn't match {
    //     Log the guess and AND alert(letters log) AND alert(guesses log)
    // }

    //Log wins

    //Log losses
    //If the letter


    //Current progress:
    //Letters guessed
    // var letterGuess = [];

    // letterGuess.push = [playerGuess]

    //Remaining guesses
    //
    //END GAME OPTIONS
    // If the player want to quit game {
    //     Quit Game
    // }

    // If the player guesses the word {
    //     End game and log win
    // }

    // If the player does not guess the word AND choices are up {
    // End game and log loss