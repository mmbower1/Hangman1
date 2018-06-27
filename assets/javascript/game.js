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

//randomly chooses a team
var randomNumber = Math.floor(Math.random() * teams.length);
var chosenTeam = teams[randomNumber].toLowerCase();
var rightTeam = [];
var wrongTeam =[];
var underScoreArray = [];
var underScore = "";
var checkArray = [];
//max number of wrong guesses
var guesses = 5;
//actual number of times user gets it wrong
var tries = 0;

//dom manipulation
var docScore = document.getElementsByClassName('underScore');
var docRightTeam = document.getElementsByClassName('right');
var docWrongTeam = document.getElementsByClassName('wrong');

//create underscores based on word length
var generateScore = () => {
    for(let i = 0; i < chosenTeam.length; i++) {
        if (' \t\n\r\v'.indexOf(chosenTeam[i]) > -1) {
            underScoreArray.push(' ');
        } else {
            underScoreArray.push('_');
        }
        
    }
    underScore = underScoreArray.join('&nbsp;');
    console.log(underScore);
}

//get users guess
document.addEventListener('keypress', (event) => {
    var keyword = String.fromCharCode(event.keyCode);
    console.log(keyword);

    // if user has guesses left
    if (tries >= guesses) {
        //alert when user loses
        alert('You lose');
        window.location.reload();
        return;
    }
    
    //if user guess is right
    if(chosenTeam.indexOf(keyword) > -1) {


        //add to right teams array
        if(rightTeam.indexOf(keyword) < 0) {
            rightTeam.push(keyword);
        }
        

        //find the indexes of each necessary underscore
        for(i = 0; i < chosenTeam.length; i++) {
            console.log(keyword === chosenTeam[i]);
            if (keyword === chosenTeam[i]) {
                underScoreArray.splice(i, 1, keyword);
                console.log(underScoreArray);
            }
        }
        underScore = underScoreArray.join('&nbsp;');

        docScore[0].innerHTML = underScore;

        docRightTeam[0].innerHTML = rightTeam;

        underScoreArray[chosenTeam.indexOf(keyword)] = keyword;

        //checks if user matches guess
        for (var i = 0; i < underScoreArray.length; i++) {
            if (underScoreArray[i] == '\xa0') { // Non-breakable space is char 0xa0 (160 dec)
                underScoreArray[i] = ' ';
            }
        }
        console.log(underScoreArray);
        console.log(chosenTeam);
        console.log(underScoreArray.join(""));
        
        docScore[0].innerHTML = underScore;

        if (underScoreArray.join("") === chosenTeam) {
            alert('You win');
            window.location.reload();
        }
        
        //After the user wins/loses the game should automatically choose another word
        //Project an image of a sports star when user wins 
        
    }
    else {
        if(wrongTeam.indexOf(keyword) < 0) {
        wrongTeam.push(keyword);
        docWrongTeam[0].innerHTML = wrongTeam;
        tries++;
        console.log(tries);
        }
    }
});

generateScore();
docScore[0].innerHTML = underScore;
// generateScore.join(' ');
// generateScore[0].innerHTML = 'Working';