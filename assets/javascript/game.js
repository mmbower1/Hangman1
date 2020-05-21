const teams = [
    "San Francisco Giants", "Los Angeles Dodgers", "San Diego Padres", "Detroit Tigers", "Atlanta Braves",
    "New York Yankees", "Los Angeles Angels", "Baltimore Orioles", "Texas Rangers", "Tampa Bay Devil Rays",
    "Boston Red Sox", "Minnesota Twins", "Miami Marlins", "Cincinnati Reds", "Pittsburgh Pirates",
    "Cleveland Indians", "Texas Rangers", "Chicago Cubs", "Seattle Mariners", "Oakland Athletics",
    "Philadelphia Eagles", "Dallas Cowboys", "Carolina Panthers", "Seattle Seahawks", "Green Bay Packers",
    "Los Angeles Rams", "New York Jets", "Pittsburgh Steelers", "Minnesota Vikings", "New England Patriots",
    "Washington Redskins", "Cleveland Browns", "New Orleans Saints", "Houston Texans", "Buffalo Bills",
    "Jacksonville Jaguars", "Tennessee Titans", "Tampa Bay Buccaneers", "Indianapolis Colts", "Miami Dolphins",
    "Boston Celtics", "Phoenix Suns", "Houston Rockets", "Denver Nuggets", "Kansas City Chiefs", "Sacramento Kings",
    "Cleveland Caveliers", "San Antonio Spurs", "Toronto Raptors", "Oklahoma City Thunder", "Utah Jazz",
    "Charlotte Hornets", "Portland Trail Blazers", "Orlando Magic", "Memphis Grizzlies", "Chicago Bulls",
    "Golden State Warriors", "Los Angeles Lakers", "New York Knicks", "Miami Heat", "Milwaukee Bucks",
    "Toronto Maple Leafs", "Montreal Canadiens", "Vancouver Canucks", "Vegas Golden Knights", "Boston Bruins",
    "Edmonton Oilers", "New York Rangers", "Pittsburgh Penguins", "Chicago Blackhawks", "Detroit Red Wings",
    "Ottowa Senators", "Buffalo Sabres", "Calgary Flames", "Winnipeg Jets", "San Jose Sharks", "Arizona Coyotes",
    "Nashville Predators", "Anaheim Ducks", "New Jersey Devils", "Carolina Hurricanes", "Colorado Avalanche",
    "Los Angeles Galaxy", "New York RedBulls", "Atlanta United FC", "Seattle Sounders FC", "Columbus Crew SC",
    "Orlando City SC", "Sporting Kansas City", "Portland Timbers", "Montreal Impact", "New England Revolution",
    "San Jose Earthquakes", "Houston Dynamo", "Colorado Rapids", "Philadelphia Union", "Real Salt Lake",
    "Minnesota United FC", "Colorado Rapids", "District Columbia United", "FC Dallas"
];

var winNum = $("#winnum");
var lossNum = $("#lossnum");

//dom manipulation
var docScore = document.getElementsByClassName("underScore");
var docRightTeam = document.getElementsByClassName("right");
var docRightTeamLetters = document.getElementsByClassName("right-letters");
var docWrongTeam = document.getElementsByClassName("wrong");
var docWrongTeamLetters = document.getElementsByClassName("wrong-letters");
var docGuessesLeft = document.getElementById("guesses-left");
var hangman = document.getElementsByClassName("hangman");


//variables
var randomNumber = Math.floor(Math.random() * teams.length);
var chosenTeam = teams[randomNumber].toLowerCase();
var rightTeam = [];
var wrongTeam = [];
var underScoreArray = [];
var underScore = "";

var guesses = 5;

docGuessesLeft.innerHTML = guesses;

//number of times user gets it wrong
var tries = 0;

console.log(chosenTeam);

//create underscores based on word length
var generateScore = () => {
    for (let i = 0; i < chosenTeam.length; i++) {
        if (' \t\n\r\v'.indexOf(chosenTeam[i]) > -1) {
            underScoreArray.push(' ');
        } else {
            underScoreArray.push('_');
        }
    }
    underScore = underScoreArray.join('&nbsp;');
};
generateScore();

var setVars = () => {
    //randomly chooses a team
    randomNumber = Math.floor(Math.random() * teams.length);
    chosenTeam = teams[randomNumber].toLowerCase();
    rightTeam = [];
    wrongTeam = [];
    underScoreArray = [];
    underScore = "";
    //max number of wrong guesses
    guesses = 5;
    //actual number of times user gets it wrong
    tries = 0;
}

//get users guess
document.addEventListener("keypress", (e) => {
    var keyword = String.fromCharCode(e.keyCode);
    console.log(keyword);

    //if user guess is right
    if (chosenTeam.indexOf(keyword) > -1) {
        // add to right teams array
        if (rightTeam.indexOf(keyword) < 0) {
            rightTeam.push(keyword);
        }
        //find the indices of each necessary underscore
        for (i = 0; i < chosenTeam.length; i++) {
            if (keyword === chosenTeam[i]) {
                underScoreArray.splice(i, 1, keyword);
            }
        }
        //access DOM elements
        underScore = underScoreArray.join('&nbsp;');
        docScore[0].innerHTML = underScore;
        docRightTeamLetters[0].innerHTML = rightTeam;
        underScoreArray[chosenTeam.indexOf(keyword)] = keyword;

        //checks if user matches guess
        for (var i = 0; i < underScoreArray.length; i++) {
            if (underScoreArray[i] == '\xa0') { // Non-breakable space is char 0xa0 (160 dec)
                underScoreArray[i] = ' ';
            }
        }
        
        //if user wins
        if (underScoreArray.join("") === chosenTeam) {
            swal("You're a sports genius!");
            winNum.text(parseInt(winNum.text()) + 1);
            resetGame();
        }
    } else {
        // user guess is wrong
        if (wrongTeam.indexOf(keyword) < 0) {
            wrongTeam.push(keyword);
            docWrongTeamLetters[0].innerHTML = wrongTeam;

            //grab #guesseses-left for DOM
            // docGuessesLeft[0].innerHTML = guessesLeft
            //docGuessesLeft--;
            docGuessesLeft.innerHTML = --guesses;
            // hangman.append()
            //var guessesLeftElementNew = document.getElementById("guesses-left");
            //docGuessesLeft = guessesLeftElementNew.innerHTML;
            tries++;
        }
    }

    // if user loses
    if (guesses === 0) {
        swal("You lost :(");
        lossNum.text(parseInt(lossNum.text()) + 1);
        resetGame();
        return;
    }

    //if user guesses letter more than once
    // if (underScoreArray > 1) {
    //     winNum.text(parseInt(winNum.text()) + 0);
    //     lossNum.text(parseInt(lossNum.text()) + 0);
    //     alert("Already guessed that letter!");
    // }

});

var resetGame = () => {
    setVars();
    $(".underScore").text("");
    $(".right").text("~Correct Letters~");
    $(".wrong").text("~Wrong Letters~");
    $("#guesses-left").html(guesses);
    generateScore();
    docScore[0].innerHTML = underScore;
}