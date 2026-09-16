const challenges = [
    {
        observe: "See a dog",
        challenge: "Answer: What is your favorite place we've been to?"
    },
    {
        observe: "See Halloween decorations",
        challenge: "Share your favorite Halloween memory."
    },
    {
        observe: "A runner passes from behind",
        challenge: "Hold hands until the next fork in the path."
    },
    {
        observe: "A runner passes in the opposite direction",
        challenge: "Kiss on the cheek."
    },
    {
        observe: "See kids in a stroller",
        challenge: "Say where we want to vacation next."
    },
    {
        observe: "See a cat",
        challenge: "Do a little dance."
    },
    {
        observe: "See flowers",
        challenge: "Kiss on the lips."
    },
    {
        observe: "See geese",
        challenge: "Give each other a playful booty smack."
    },
    {
        observe: "See a bike",
        challenge: "Buy a shot before dinner."
    },
    {
        observe: "See someone we know",
        challenge: "Order dessert."
    },
    {
        observe: "See leaves falling",
        challenge: "Hug."
    },
    {
        observe: "See ducks",
        challenge: "Skip a rock in the lake."
    },
    {
        observe: "See a kid with a toy",
        challenge: "Pick a movie to watch soon."
    },
    {
        observe: "See someone eating at a picnic bench",
        challenge: "Decide what we want for dinner."
    },
    {
        observe: "See kids playing on the playground",
        challenge: "Decide what game to play next."
    },
    {
        observe: "See a mural",
        challenge: "Recite song lyrics it makes you think of."
    },
    {
        observe: "Hear live music or see someone performing",
        challenge: "Give them a tip if appropriate."
    },
    {
        observe: "See other people holding hands",
        challenge: "Share something the other person does that makes you laugh."
    },
    {
        observe: "See a deer",
        challenge: "Take a selfie together."
    },
    {
        observe: "See a squirrel",
        challenge: "Take a shot at dinner."
    },
    {
        observe: "See a groundhog",
        challenge: "Say hi to it."
    },
    {
        observe: "See someone fishing",
        challenge: "Give each other a compliment."
    },
    {
        observe: "See graffiti",
        challenge: "Slow dance for one minute."
    },
    {
        observe: "Smell something nice",
        challenge: "High five."
    },
    {
        observe: "Free space",
        challenge: "Take a shot!"
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

        card.className = "card";
        card.type = "button";
        card.dataset.index = index;

        card.innerHTML = `
            <span class="card-number">Card ${index + 1}</span>
            <span class="card-front">${item.observe}</span>
            <span class="card-back">${item.challenge}</span>
        `;

        card.addEventListener("click", () => completeCard(index, card));

        gameBoard.appendChild(card);
    });

    updateProgress();
}

function completeCard(index, card) {
    if (completedCards.includes(index)) {
        // Unselect the card
        completedCards = completedCards.filter(cardIndex => cardIndex !== index);
        card.classList.remove("completed");
    } else {
        // Select the card
        completedCards.push(index);
        card.classList.add("completed");
    }

    updateProgress();

    // Hide the completion message if a card is unselected
    if (completedCards.length < challenges.length) {
        completionMessage.classList.add("hidden");
    }
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
    }
}

function restartGame() {
    completedCards = [];
    completionMessage.classList.add("hidden");
    createBoard();
}

restartButton.addEventListener("click", restartGame);

createBoard();
