using System;

namespace FlashcardsApp.Models
{
    public class Flashcard
    {
        public string Category { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
        public long Id { get; set; } = 0;
    }
}
