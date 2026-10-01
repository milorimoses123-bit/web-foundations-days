// Starting Data
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" }
];

// 1. searchNotes(word)
function searchNotes(word) {
  const searchTerm = word.toLowerCase();
  return notes.filter(note => note.text.toLowerCase().includes(searchTerm));
}

// 2. longestNote()
function longestNote() {
  if (notes.length === 0) return null;
  return notes.reduce((longest, current) => {
    return current.text.length > longest.text.length ? current : longest;
  });
}

// 3. countByCategory()
function countByCategory() {
  const counts = {};
  for (const note of notes) {
    counts[note.category] = (counts[note.category] || 0) + 1;
  }
  return counts;
}

// 4. getSummary()
function getSummary() {
  const total = notes.length;
  const wordNote = total === 1 ? "note" : "notes";
  const counts = countByCategory();
  const breakdown = Object.entries(counts)
    .map(([cat, count]) => `\({count}\){cat}`)
    .join(", ");

  return `\({total}\){wordNote}: ${breakdown}.`;
}

// 5. isDuplicate(text)
function isDuplicate(text) {
  const formattedInput = text.trim().toLowerCase();
  return notes.some(note => note.text.trim().toLowerCase() === formattedInput);
}

// 6. addNote(text, category)
function addNote(text, category) {
  const validCategories = ["personal", "work", "study"];

  if (text.length < 1 || text.length > 200) {
    console.log("Failed to add note: Text length must be between 1 and 200 characters.");
    return false;
  }

  if (!validCategories.includes(category)) {
    console.log(`Failed to add note: Category must be one of ${validCategories.join(", ")}.`);
    return false;
  }

  if (isDuplicate(text)) {
    console.log("Failed to add note: Note already exists.");
    return false;
  }

  const newNote = {
    id: notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1,
    text: text,
    category: category
  };

  notes.push(newNote);
  return true;
}

// Console tests
console.log("--- Search Notes ('javascript') ---");
console.log(searchNotes("javascript"));

console.log("\n--- Longest Note ---");
console.log(longestNote());

console.log("\n--- Count By Category ---");
console.log(countByCategory());

console.log("\n--- Summary ---");
console.log(getSummary());

console.log("\n--- Check Duplicate ('Call mum') ---");
console.log(isDuplicate("  call MUM  "));

console.log("\n--- Add Note Tests ---");
console.log("Adding valid note:", addNote("Practice coding daily", "study"));
console.log("Adding duplicate note:", addNote("Call mum", "personal"));
console.log("Adding invalid category:", addNote("Go shopping", "other"));
