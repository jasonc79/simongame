var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var keyPressed = false;

$(".btn").click(function(event) {
    var userChosenColour = $(event.target).attr("id");
    animatePress(userChosenColour);
    playSound(userChosenColour);
    handler(userChosenColour);
    // At end of next sequence
    if (checkAnswer(userClickedPattern.length - 1) == "wrong") {
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over")},
            200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    else if (level == userClickedPattern.length) {
        setTimeout(function() {
            nextSequence()},
            1000);
        userClickedPattern = [];
    }
    
    
});

$(document).keypress(function() {
    if (keyPressed == false) {
        nextSequence();
        keyPressed = true;
    }
});

// Fired when it is successful
function nextSequence() {
    var randomNumber = Math.round((Math.random()*3)); // Between 0 and 3
    var buttonColours = ["red", "blue", "green", "yellow"];
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#level-title").text("Level " + (level + 1));
    animatePress(randomChosenColour);
    level++;
}
function handler(event) {
    userClickedPattern.push(event);
    console.log(userClickedPattern);
}

function playSound(name) {
    var audio = new Audio("./sounds/"+ name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed")},
        100)
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        return "success";
    }
    return "wrong";
}
function startOver() {
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
    keyPressed = false; 
}
