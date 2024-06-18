using System.Collections.Generic;
using System.IO;
using FlashcardsApp.Models;
using Microsoft.AspNetCore.Hosting;

namespace FlashcardsApp.Services
{
    public class FlashcardService
    {
        private readonly string _csvFilePath;

        public FlashcardService(IWebHostEnvironment webHostEnvironment)
        {
            _csvFilePath = Path.Combine(webHostEnvironment.WebRootPath, "flashcards.csv");
        }

        public List<Flashcard> GetFlashcards()
        {
            var flashcards = new List<Flashcard>();

            var lines = File.ReadAllLines(_csvFilePath);
            foreach (var line in lines)
            {
                var parts = line.Split(',');
                flashcards.Add(new Flashcard
                {
                    Category = parts[0],
                    Question = parts[1],
                    Answer = parts[2]
                });
            }

            return flashcards;
        }
    }
}
