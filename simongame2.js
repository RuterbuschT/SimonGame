var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

document.addEventListener("keydown", function(){
    if(!started){
        document.querySelector("#level-title").innerHTML = `Level ${level}`
        nextSequence();
        started = true;
    }
})
const handleClick = e => {
    var clicked = e.target;
    const clickedColor = clicked.getAttribute("id")
    console.log(clickedColor)
    userClickedPattern.push(clickedColor)

    animatePress(clickedColor)
    playSound(clickedColor)

    checkAnswer(userClickedPattern.length - 1);
}

const checkAnswer = currentLevel => {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
               nextSequence(); 
            }, 1000)
            
        }
    }else{
        playSound("wrong");

        document.querySelector("body").classList.add("game-over")
        setTimeout(() => {
            document.querySelector("body").classList.remove("game-over")
        }, 1000)

        document.querySelector("#level-title").innerHTML = "Game over. you lose"

        startOver();
    }
}


const nextSequence = () => {
    userClickedPattern = [];
    level++;
    document.querySelector("#level-title").innerHTML = `Level ${level}`
    let randomNumber = Math.floor(Math.random() * buttonColours.length)
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour)
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
}

const playSound = word => {
    let audio = new Audio("sounds/"+ word + ".mp3")
    audio.play();
}

const animatePress = color =>{
    document.querySelector(`#${color}`).classList.add("pressed")
    setTimeout(() => {
        document.querySelector(`#${color}`).classList.remove("pressed")
    },100)
}

document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", handleClick)
})




