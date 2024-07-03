using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using FlashcardsApp.Models;

namespace FlashcardsApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Categories()
        {
            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "data", "flashcards.json");
            var json = System.IO.File.ReadAllText(filePath);
            var flashcards = JArray.Parse(json);
            var categories = flashcards.Select(fc => fc["category"].ToString()).Distinct().ToList();
            return View(categories);
        }

        public IActionResult Flashcards()
        {
            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "data", "flashcards.json");
            var json = System.IO.File.ReadAllText(filePath);
            var flashcards = JArray.Parse(json).Select(fc => new Flashcard
            {
                Id = long.Parse(fc["id"].ToString()),
                Category = fc["category"].ToString(),
                Question = fc["question"].ToString(),
                Answer = fc["answer"]?.ToString() // Populate Answer property
            }).ToList();

            return View("/Views/Flashcards/Index.cshtml", flashcards);
        }

        [HttpPost]
        public IActionResult Flashcards(string[] selectedCategories)
        {
            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "data", "flashcards.json");
            var json = System.IO.File.ReadAllText(filePath);
            var flashcards = JArray.Parse(json).Select(fc => new Flashcard
            {
                Id =long.Parse(fc["id"].ToString()),
                Category = fc["category"].ToString(),
                Question = fc["question"].ToString(),
                Answer = fc["answer"]?.ToString() // Populate Answer property
            }).ToList();

            if (selectedCategories != null && selectedCategories.Length > 0)
            {
                flashcards = flashcards.Where(fc => selectedCategories.Contains(fc.Category)).ToList();
            }

            return View("/Views/Flashcards/Index.cshtml", flashcards);
        }
    }
}
