using FlashcardsApp.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace FlashcardsApp.Services
{
    public class FlashcardService
    {
        private readonly string _jsonFilePath;

        public FlashcardService()
        {
            _jsonFilePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/data/flashcards.json");
        }

        public List<Flashcard> GetFlashcards()
        {
            var jsonData = File.ReadAllText(_jsonFilePath);
            var flashcards = JsonConvert.DeserializeObject<List<Flashcard>>(jsonData);
            return flashcards;
        }
    }
}
