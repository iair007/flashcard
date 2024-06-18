using Microsoft.AspNetCore.Mvc;
using FlashcardsApp.Services;

namespace FlashcardsApp.Controllers
{
    public class FlashcardsController : Controller
    {
        private readonly FlashcardService _flashcardService;

        public FlashcardsController(FlashcardService flashcardService)
        {
            _flashcardService = flashcardService;
        }

        public IActionResult Index()
        {
            var flashcards = _flashcardService.GetFlashcards();
            return View(flashcards);
        }

        public IActionResult Play()
        {
            var flashcards = _flashcardService.GetFlashcards();
            var random = new Random();
            var flashcard = flashcards[random.Next(flashcards.Count)];
            return View(flashcard);
        }
    }
}
