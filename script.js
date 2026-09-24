const challenges = [
    {
        observe: "See a dog",
        challenge: "Answer: “What is your favorite place we’ve been to?”",
        image: "images/web-ready/dogs.jpg"
    },
    {
        observe: "See Halloween decorations",
        challenge: "Share your favorite Halloween memory.",
        image: "images/web-ready/halloween.jpg"
    },
    {
        observe: "A runner passes from behind",
        challenge: "Hold hands until the next fork in the path.",
        image: "images/web-ready/sunset.jpg"
    },
    {
        observe: "A runner passes in the opposite direction",
        challenge: "Kiss on the cheek.",
        image: "images/web-ready/boat.jpg"
    },
    {
        observe: "See kids in a stroller",
        challenge: "Say where we want to vacation next.",
        image: "images/web-ready/bar.jpg"
    },
    {
        observe: "See a cat",
        challenge: "Do a little dance.",
        image: "images/web-ready/market.jpg"
    },
    {
        observe: "See flowers",
        challenge: "Kiss on the lips.",
        image: "images/web-ready/arts.jpg"
    },
    {
        observe: "See geese",
        challenge: "Give each other a playful booty smack.",
        image: "images/web-ready/geese.jpg"
    },
    {
        observe: "See a bike",
        challenge: "Buy a shot before dinner.",
        image: "images/web-ready/bike.jpg"
    },
    {
        observe: "See someone we know",
        challenge: "Order dessert.",
        image: "images/web-ready/family.jpg"
    },
    {
        observe: "See leaves falling",
        challenge: "Hug.",
        image: "images/web-ready/hug.jpg"
    },
    {
        observe: "See ducks",
        challenge: "Skip a rock in the lake.",
        image: "images/web-ready/ducks.jpg"
    },
    {
        observe: "See a kid with a toy",
        challenge: "Pick a movie to watch soon.",
        image: "images/web-ready/movie.jpg"
    },
    {
        observe: "See someone eating at a picnic bench",
        challenge: "Decide what we want for dinner.",
        image: "images/web-ready/dinner.jpg"
    },
    {
        observe: "See kids playing on the playground",
        challenge: "Decide what game to play next.",
        image: "images/web-ready/game.jpg"
    },
    {
        observe: "See a mural",
        challenge: "Recite song lyrics it makes you think of.",
        image: "images/web-ready/song.jpg"
    },
    {
        observe: "Hear live music or see someone performing",
        challenge: "Give them a tip.",
        image: "images/web-ready/music.jpg"
    },
    {
        observe: "See other people holding hands",
        challenge: "Share something the other person does that makes you laugh.",
        image: "images/web-ready/laugh.jpg"
    },
    {
        observe: "See a deer",
        challenge: "Take a selfie together.",
        image: "images/web-ready/selfie.jpg"
    },
    {
        observe: "See a squirrel",
        challenge: "Take a shot at dinner.",
        image: "images/web-ready/shot.jpg"
    },
    {
        observe: "See a groundhog",
        challenge: "Say hi to it.",
        image: "images/web-ready/groundhog.jpg"
    },
    {
        observe: "See someone fishing",
        challenge: "Give each other a compliment.",
        image: "images/web-ready/fish.jpg"
    },
    {
        observe: "See graffiti",
        challenge: "Slow dance for one minute.",
        image: "images/web-ready/graffiti.jpg"
    },
    {
        observe: "Smell something nice",
        challenge: "High five.",
        image: "images/web-ready/smell.jpg"
    },
    {
        observe: "Free space",
        challenge: "Take a shot.",
        image: "images/web-ready/free.jpg"
    }
];

const gameBoard = document.getElementById("gameBoard");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const completionMessage = document.getElementById("completionMessage");
const restartButton = document.getElementById("restartButton");

let completedCards = [];

function createBoard() {
    gameBoard.innerHTML = "";

    challenges.forEach((item, index) => {
        const card = document.createElement("button");

        card.className = "scavenger-item";
        card.type = "button";

        card.innerHTML = `
            <span class="checkbox"></span>
            <span class="item-text">${item.observe}</span>
        `;

        card.addEventListener("click", () => selectItem(index, card));

        gameBoard.appendChild(card);
    });

    updateProgress();
}

function selectItem(index, card) {

    if (completedCards.includes(index)) {
        completedCards = completedCards.filter(
            cardIndex => cardIndex !== index
        );

        card.classList.remove("completed");

        updateProgress();

        return;
    }

    completedCards.push(index);
    card.classList.add("completed");

    updateProgress();

    showChallenge(index);
}

function updateProgress() {

    const completedCount = completedCards.length;
    const totalCount = challenges.length;
    const percentage = (completedCount / totalCount) * 100;

    progressText.textContent =
        `${completedCount} of ${totalCount} completed`;

    progressFill.style.width = `${percentage}%`;

    if (completedCount === totalCount) {
        completionMessage.classList.remove("hidden");
    } else {
        completionMessage.classList.add("hidden");
    }
}

let challengeTimer = null;
let challengeStartTime = null;
let challengeRemainingTime = 15000;
let challengePaused = false;

function showChallenge(index) {

    const item = challenges[index];

    const huntScreen = document.getElementById("huntScreen");
    const challengeScreen = document.getElementById("challengeScreen");

    const challengeImage = document.getElementById("challengeImage");
    const challengeObserve = document.getElementById("challengeObserve");
    const challengeQuestion = document.getElementById("challengeQuestion");
    const challengeProgressBar =
        document.getElementById("challengeProgressBar");

    // Display the selected photo and challenge
    challengeImage.src = item.image;
    challengeObserve.textContent = item.observe;
    challengeQuestion.textContent = item.challenge;

    // Show the challenge screen
    huntScreen.classList.add("hidden");
    challengeScreen.classList.remove("hidden");

    // Reset timer
    clearInterval(challengeTimer);

    challengeRemainingTime = 15000;
    challengePaused = false;

    challengeProgressBar.style.transition = "none";
    challengeProgressBar.style.transform = "scaleX(1)";

    // Give the browser a moment to apply the reset
    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            challengeProgressBar.style.transition =
                "transform 15s linear";

            challengeProgressBar.style.transform =
                "scaleX(0)";

        });

    });

    challengeStartTime = Date.now();

    challengeTimer = setInterval(() => {

        if (challengePaused) {
            return;
        }

        const elapsed = Date.now() - challengeStartTime;

        challengeRemainingTime = 15000 - elapsed;

        if (challengeRemainingTime <= 0) {

            challengeRemainingTime = 0;

            clearInterval(challengeTimer);

            closeChallenge();

        }

    }, 50);
}


function closeChallenge() {

    const huntScreen = document.getElementById("huntScreen");
    const challengeScreen = document.getElementById("challengeScreen");

    clearInterval(challengeTimer);

    challengeScreen.classList.add("hidden");
    huntScreen.classList.remove("hidden");
}

const challengeScreen =
    document.getElementById("challengeScreen");

let holdTimer = null;

function pauseChallenge() {

    if (challengePaused) {
        return;
    }

    challengePaused = true;

    // Calculate how much time has already passed
    const elapsed = Date.now() - challengeStartTime;

    challengeRemainingTime =
        Math.max(0, 15000 - elapsed);

    const progressBar =
        document.getElementById("challengeProgressBar");

    // Get the current progress of the bar
    const progress =
        challengeRemainingTime / 15000;

    // Stop the CSS animation at its current position
    progressBar.style.transition = "none";
    progressBar.style.transform =
        `scaleX(${progress})`;
}


function resumeChallenge() {

    if (!challengePaused) {
        return;
    }

    challengePaused = false;

    const progressBar =
        document.getElementById("challengeProgressBar");

    const remainingSeconds =
        challengeRemainingTime / 1000;

    // Continue the progress bar from where it stopped
    progressBar.style.transition =
        `transform ${remainingSeconds}s linear`;

    progressBar.style.transform = "scaleX(0)";

    // Restart the timing calculation
    challengeStartTime =
        Date.now() - (15000 - challengeRemainingTime);
}

challengeScreen.addEventListener("pointerdown", (event) => {

    event.preventDefault();

    holdTimer = setTimeout(() => {

        pauseChallenge();

    }, 150);

});


challengeScreen.addEventListener("pointerup", () => {

    clearTimeout(holdTimer);

    resumeChallenge();

});


challengeScreen.addEventListener("pointercancel", () => {

    clearTimeout(holdTimer);

    resumeChallenge();

});



function restartGame() {
    completedCards = [];
    completionMessage.classList.add("hidden");
    createBoard();
}

restartButton.addEventListener("click", restartGame);

createBoard();
