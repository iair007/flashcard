document.addEventListener('DOMContentLoaded', (event) => {
    let flashcards = JSON.parse(document.getElementById('flashcards-data').textContent);
    let currentFlashcardIndex = 0;
    let showingQuestion = true;

    document.querySelectorAll('.flashcard-row').forEach(row => {
        row.addEventListener('click', function () {
            currentFlashcardIndex = this.dataset.index;
            showFlashcard();
            $('#flashcardModal').modal('show');
        });
    });

    window.startGame = function () {
        currentFlashcardIndex = 0;
        showFlashcard();
        $('#flashcardModal').modal('show');
    };

    window.showFlashcard = function () {
        const flashcard = flashcards[currentFlashcardIndex];
        document.getElementById('flashcardModalLabel').innerText = flashcard.Category;
        document.getElementById('flashcardContent').innerText = flashcard.Question;
        showingQuestion = true;
    };

    window.flipCard = function () {
        const flashcard = flashcards[currentFlashcardIndex];
        if (showingQuestion) {
            document.getElementById('flashcardContent').innerText = flashcard.Answer;
        } else {
            document.getElementById('flashcardContent').innerText = flashcard.Question;
        }
        showingQuestion = !showingQuestion;
    };

    window.nextFlashcard = function () {
        currentFlashcardIndex = (currentFlashcardIndex + 1) % flashcards.length;
        showFlashcard();
    };
});
