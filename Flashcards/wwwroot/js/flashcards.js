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
        document.getElementById('flashcardContent').innerHTML = flashcard.Question.replace(/\n/g, '<br>');
        document.getElementById('flashcardContentBack').innerHTML = flashcard.Answer.replace(/\n/g, '<br>');
        document.getElementById('flashcardIndicator').innerText = "Question";
        showingQuestion = true;
        document.querySelector('.card').classList.remove('flip');
    };

    window.flipCard = function (event) {
        if (event.target.tagName.toLowerCase() === 'a') {
            return;
        }
        document.querySelector('.card').classList.toggle('flip');
        if (showingQuestion) {
            document.getElementById('flashcardIndicator').innerText = "Answer";
        } else {
            document.getElementById('flashcardIndicator').innerText = "Question";
        }
        showingQuestion = !showingQuestion;
    };

    window.nextFlashcard = function () {
        currentFlashcardIndex = (currentFlashcardIndex + 1) % flashcards.length;
        showFlashcard();
    };

    // Ensure the close button works
    document.querySelector('.modal .close').addEventListener('click', function () {
        $('#flashcardModal').modal('hide');
    });
});
