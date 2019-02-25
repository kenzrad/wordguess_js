
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

// Create variables that hold references to the places in the HTML where we want to display things.
var directionsText = document.getElementById("directions-text");
var userChoiceText = document.getElementById("userchoice-text");
var wordAnswerText = document.getElementById("word-answer");
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");


//use keytouch event (any key) to initiate word selection (I may change this to be an onClick event)
document.onkeyup = function (gameOn) {
    //pick a random word from the array
    var word = words[Math.floor(Math.random() * words.length)];
    // console.log(word);

    //remove that word from the array so it doesn't get selected again:
    // indexOf.words[]

    //create an array to hold the placeholder letters ("_") for the randomized word
    var wordAnswer = [];

    //This is a loop that will add one "_" until the "n-1" the word.length. This works out to the number of letters in the word because it starts at 0! The word becomes an array of "_"
    for (var i = 0; i < word.length; i++) {
        wordAnswer[i] = ("_");
    }
    wordAnswerText.textContent = wordAnswer;
    
    // console.log(wordAnswer);

    //Create an array for remaining letters, which will be equal to the number of "_"
    var lettersLeft = wordAnswer.length;
    // console.log(lettersLeft);


    //LOOP the game while there are still letters remaining
    if (lettersLeft > 0) {
        directionsText.textContent = "Guess any letter of the alphabet!"
        document.onkeyup = function(userKey) {
            var letterGuess = userKey.key;
        }
    } else {
        directionsText.textContent = "Press any key to play again!";
        return;
    }
    } //explore maybe using a while loop!



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
    //     End game and log loss
