const questions = [
    {
        question: "What is the name of this famous Japanese landmark?",
        img: "../images/Mount Fuji.jfif",
        options: ["Mount Fuji", "Tokyo Skytree", "Kyoto Tower", "Osaka Castle"],
        correct: 0
    },
    {
        question: "Who is this historical Japanese figure?",
        img: "../images/samurai.jpg",
        options: ["Ninja", "Samurai", "Sumo Wrestler", "Kabuki Actor"],
        correct: 1
    },
    {
        question: "What is the name of this iconic tower in Tokyo?",
        img: "../images/Tokyo Tower.jpg",
        options: ["Eiffel Tower", "Kyoto Tower", "Tokyo Tower", "Sky Tree"],
        correct: 2
    },
    {
        question: "What is the name of this famous Japanese charachter?",
        img: "../images/Godzilla.jfif",
        options: ["Dragon Statue",  "Giant Robot", "Godzilla", "Dinosaur"],
        correct: 2
    },
    {
        question: "What is the name of this famous crosswalk in Tokyo?",
        img: "../images/Shibuya Crossing.jpg",
        options: ["Shibuya Crossing", "New York Times Square",  "Akihabara Station", "Harajuku Street"],
        correct: 0
    },
    {
        question: "What is the name of this Japanese dish?",
        img: "../images/Ramen Bowl.jpg",
        options: ["Sushi", "Ramen", "Udon", "Soba"],
        correct: 1
    },
    {
        question: "What are these flowers called in Japanese culture?",
        img: "../images/Cherry Blossoms (Sakura).jpg",
        options: ["Plum Blossoms",  "Wisteria", "Azalea","Cherry Blossoms"],
        correct: 3
    },
    {
        question: "What is the activity shown in this image?",
        img: "../images/Cosplay Festival.jfif",
        options: ["Playing Video Game", "Fashion Show", "Cosplay Festival", "Slave Sale"],
        correct: 2
    },
    {
        question: "What is the name of this iconic dog statue in Tokyo?",
        img: "../images/Hachiko Statue.jfif",
        options: ["Dog from Akita", "Hachiko", "Shiba Inu", "Samurai Dog"],
        correct: 1
    },
    {
        question: "What is the name of this famous Japanese castle?",
        img: "../images/osaka castle.jpg",
        options: ["Osaka Castle", "Himeji Castle",  "Nagoya Castle", "Tokyo Tower"],
        correct: 0
    },
    {
        question: "What type of food is this?",
        img: "../images/Takoyaki.jpg",
        options: ["Pancake Balls", "Takoyaki", "Meatballs", "Sushi Roll"],
        correct: 1
    },
    {
        question: "What is the name of this traditional Japanese gate?",
        img: "../images/Torii Gate.jpg",
        options: [ "Castle Entrance", "Palace Door","Torii Gate", "Shrine Door"],
        correct: 2
    },
    {
        question: "What called this traditional Japanese wind chime?",
        img: "../images/Furin.jfif",
        options: ["tanzaku",  "Chōchin", "wind toy", "Fūrin"],
        correct: 3
    },
    {
        question: "What is the name of this Japanese theme park?",
        img: "../images/Tokyo Disneyland.jpg",
        options: ["Tokyo Disneyland", "Osaka Universal Studios", "Tokyo Sea World", "Pokemon Land"],
        correct: 0
    },
    {
        question: "What is the name of the traditional Japanese building?",
        img: "../images/Shinto Shrine.jpg",
        options: ["Buddhist Temple", "Shinto Shrines", "Pagoda", "Tea House"],
        correct: 1
    },
];

let currentQuestionIndex = 0;
let score = 0;

const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const resetBtn = document.getElementById("reset-btn");

// Function to load a question
function loadQuestion(index) {
    const questionData = questions[index];
    quizContainer.innerHTML = `
        <div class="question-container active">
        <h2>${questionData.question}</h2>
            <img src="${questionData.img}" alt="Question Image">
            ${questionData.options.map((option, i) => `
                <button onclick="submitAnswer(${i})">${option}</button>
            `).join("")}
        </div>
    `;

}

showResults();
// Function to submit an answer
function submitAnswer(selectedIndex) {
    const questionData = questions[currentQuestionIndex];
    const isCorrect = selectedIndex === questionData.correct;

    // Create or update the result box
    let resultBox = document.getElementById("result-box");
    if (!resultBox) {
        resultBox = document.createElement("div");
        resultBox.id = "result-box";
        resultBox.style.cssText = `
            position:  absolute;
            margin: auto;
            top: 75%;
            left: 52%;
            transform: translate(-50%, -50%);
            padding: 40px;
            border-radius: 10px;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            max-width: 80%;
            color: white;
            z-index: 1000;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            background-color: #333;
        `;
        document.body.appendChild(resultBox);
    }
    

    // Disable interactions on the quiz container
    quizContainer.style.pointerEvents = "none";
    quizContainer.style.filter = "blur(4px)";
    
    // Display the result
    if (isCorrect) {
        resultBox.style.backgroundColor = "green";
        resultBox.innerHTML = `<p>Correct!</p>`;
        score++;
    } else {
        resultBox.style.backgroundColor = "red";
        resultBox.innerHTML = `<p>Wrong! The correct answer is: ${questionData.options[questionData.correct]}</p>`;
    }

    // Add a "Next" button to the result box
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.style.cssText = `
        margin-top: 10px;
        padding: 10px 20px;
        border: none;
        background-color: #555;
        color: white;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s ease;
    `;
    nextButton.onmouseover = () => (nextButton.style.backgroundColor = "#777");
    nextButton.onmouseout = () => (nextButton.style.backgroundColor = "#555");
    nextButton.onclick = () => {
        resultBox.remove();                             // Remove the result box
        quizContainer.style.pointerEvents = "auto";     // Re-enable interactions
        quizContainer.style.filter = "none";            // Remove blur effect
        loadNextQuestion();                             // Load the next question
    };

    resultBox.appendChild(nextButton);
}

// Function to load the next question
function loadNextQuestion() {
    currentQuestionIndex++;
    showResults()
    if (currentQuestionIndex < questions.length) {
        loadQuestion(currentQuestionIndex); // Load the next question
    } else if (1) {
        showFinalMessage()
    }
}

// Function to display the final message
function showFinalMessage() {
    quizContainer.innerHTML = ""; // Clear the quiz-container

    const finalMessageContainer = document.createElement("div");
    finalMessageContainer.id = "final-message";
    finalMessageContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        text-align: center;
        background: linear-gradient(135deg, #FF7E5F, #FEB47B);
        color: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        animation: fadeInScale 0.8s ease-in-out;
    `;

    let message = "";
    let image = "";

    if (score > questions.length / 2) {
        message = "You are truly Japanese at heart!\nAmazing job!";
        image = "https://media.giphy.com/media/26xBwdIuRJiAIqHwA/giphy.gif"; // Celebratory GIF
    } else {
        message = "You should learn more about Japan!\nDon't worry, keep exploring!";
        image = "https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif"; // Encouraging GIF
    }

    finalMessageContainer.innerHTML = `
        <h2>${message}</h2>
        <img src="${image}" alt="Final Result" style="width: 200px; border-radius: 10px; margin-top: 20px;">
    `;

    quizContainer.appendChild(finalMessageContainer);

    const restartBtn = document.getElementById("restart-btn");
    restartBtn.addEventListener("click", resetQuiz);
}


// Function to show results
function showResults() {
    quizContainer.innerHTML = "";
    resultContainer.innerHTML = `You scored ${score} / ${questions.length}`;
    resetBtn.style.display = "inline-block";
}

// Function to reset the quiz
resetBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.innerHTML = "";
    resetBtn.style.display = "none";
    showResults();
    loadQuestion(currentQuestionIndex);
});

// Load the first question
loadQuestion(currentQuestionIndex);
