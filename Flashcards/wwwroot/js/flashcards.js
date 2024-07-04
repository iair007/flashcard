let currentFlashcardIndex = 0;
let flashcards = [];
let showingQuestion = true;

window.onload = function () {
    let flashcardsData = document.getElementById("flashcards-data");
    if (flashcardsData) {
        flashcards = JSON.parse(flashcardsData.textContent);
        console.log("Flashcards loaded:", flashcards); // Debugging line
    } else {
        console.error("flashcards-data element not found");
    }

    // Add event listeners to the table rows
    document.querySelectorAll('.flashcard-row').forEach(row => {
        row.addEventListener('click', function () {
            currentFlashcardIndex = parseInt(this.dataset.index);
            showFlashcard();
        });
    });
};

window.startGame = function () {
    if (flashcards.length > 0) {
        currentFlashcardIndex = Math.floor(Math.random() * flashcards.length);
        showFlashcard();
    } else {
        console.error("No flashcards available");
    }
};

window.startGameFromId = function () {
    let startFromIdInput = document.getElementById("startFromId");
    if (startFromIdInput) {
        let id = startFromIdInput.value;
        let index = flashcards.findIndex(f => f.Id === id);
        if (index !== -1) {
            currentFlashcardIndex = index;
            showFlashcard();
        } else {
            alert("Flashcard ID not found.");
        }
    } else {
        console.error("startFromId element not found");
    }
};

window.showFlashcard = function () {
    showingQuestion = true;
    let flashcard = flashcards[currentFlashcardIndex];
    console.log("Showing flashcard:", flashcard); // Debugging line
    if (flashcard) {
        let flashcardContent = document.getElementById("flashcardContent");
        let flashcardContentBack = document.getElementById("flashcardContentBack");
        let flashcardModalLabel = document.getElementById("flashcardModalLabel");

        console.log("Elements found:", {
            flashcardContent,
            flashcardContentBack,
            flashcardModalLabel
        });

        if (flashcardContent && flashcardContentBack && flashcardModalLabel) {
            flashcardModalLabel.textContent = flashcard.Category + " " + flashcard.Id;
            flashcardContent.innerHTML = flashcard.Question.replace(/\n/g, "<br>");
            flashcardContentBack.innerHTML = flashcard.Answer ? flashcard.Answer.replace(/\n/g, "<br>") : "No answer available.";
            $('#flashcardModal').modal('show');
        } else {
            if (!flashcardContent) console.error("flashcardContent element not found");
            if (!flashcardContentBack) console.error("flashcardContentBack element not found");
            if (!flashcardModalLabel) console.error("flashcardModalLabel element not found");
        }
    } else {
        console.error("Flashcard not found at index", currentFlashcardIndex);
    }
};

window.nextFlashcard = function () {
    currentFlashcardIndex = (currentFlashcardIndex + 1) % flashcards.length;
    showFlashcard();
};

window.previousFlashcard = function () {
    currentFlashcardIndex = (currentFlashcardIndex - 1 + flashcards.length) % flashcards.length;
    showFlashcard();
};

window.flipCard = function (event) {
    let card = event.currentTarget.closest('.flip-container');
    card.classList.toggle("flipped");
    if (showingQuestion) {
        document.getElementById('watermark').innerText = "Answer";
    } else {
        document.getElementById('watermark').innerText = "Question";
    }
    showingQuestion = !showingQuestion;
};
