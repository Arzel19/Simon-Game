var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var randomNumber;
var randomChosenColour;
var level = 0;


function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playAudio(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
};

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {


        if (currentLevel === gamePattern.length - 1) {
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    } else {
        playAudio("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Presiona Una Tecla/Botón Para Reintentar");
        startOver();
    }
};

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}
function playAudio(color) {
    new Audio("sounds/" + color + ".mp3").play();
};

function animatedPress(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 100);
}

/*Event Listeners*/

$(".btn").on("click", function () {
    if (level === 0) {
        nextSequence();
    } else {
        var userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        playAudio(userChosenColour);
        animatedPress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    };
});

$(document).on("keypress", function () {
    if (level === 0) {
        nextSequence();
    }
});

