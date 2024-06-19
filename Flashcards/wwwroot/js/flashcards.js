document.addEventListener('DOMContentLoaded', (event) => {
    let flashcards = JSON.parse(document.getElementById('flashcards-data').textContent);
    let currentFlashcardIndex = 0;
    let showingQuestion = true;
    let randomFlashcards = [...flashcards];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    window.startGame = function () {
        shuffle(randomFlashcards);
        currentFlashcardIndex = 0;
        showFlashcard();
        $('#flashcardModal').modal('show');
    };

    window.startGameFromId = function () {
        const id = parseInt(document.getElementById('startFromId').value);
        const index = flashcards.findIndex(f => f.Id === id);
        if (index !== -1) {
            currentFlashcardIndex = index;
            showFlashcard();
            $('#flashcardModal').modal('show');
        } else {
            alert('Flashcard with ID ' + id + ' not found.');
        }
    };

    window.showFlashcard = function () {
        const flashcard = flashcards[currentFlashcardIndex];
        document.getElementById('flashcardModalLabel').innerText = flashcard.Id + ' - ' + flashcard.Category;
        document.getElementById('flashcardContent').innerHTML = flashcard.Question.replace(/\n/g, '<br>');
        document.getElementById('flashcardContentBack').innerHTML = flashcard.Answer.replace(/\n/g, '<br>');
        document.getElementById('watermark').innerText = "Question";
        showingQuestion = true;
        document.querySelector('.card').classList.remove('flip');
    };

    window.flipCard = function (event) {
        if (event.target.tagName.toLowerCase() === 'a') {
            return;
        }
        document.querySelector('.card').classList.toggle('flip');
        if (showingQuestion) {
            document.getElementById('watermark').innerText = "Answer";
        } else {
            document.getElementById('watermark').innerText = "Question";
        }
        showingQuestion = !showingQuestion;
    };

    window.nextFlashcard = function () {
        currentFlashcardIndex = (currentFlashcardIndex + 1) % randomFlashcards.length;
        showFlashcard();
    };

    window.previousFlashcard = function () {
        currentFlashcardIndex = (currentFlashcardIndex - 1 + randomFlashcards.length) % randomFlashcards.length;
        showFlashcard();
    };

    // Ensure the close button works
    document.querySelector('.modal .close').addEventListener('click', function () {
        $('#flashcardModal').modal('hide');
    });

    // Event listener for table rows
    document.querySelectorAll('.flashcard-row').forEach(row => {
        row.addEventListener('click', function () {
            currentFlashcardIndex = parseInt(this.dataset.index); // Ensure index is correctly parsed
            showFlashcard();
            $('#flashcardModal').modal('show');
        });
    });
});
