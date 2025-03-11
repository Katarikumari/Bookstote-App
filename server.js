const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());  // Middleware to parse JSON
app.use(cors());  // Enable CORS for frontend-backend communication

// ✅ Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/bookstore", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Define Book Schema & Model
const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number
});
const Book = mongoose.model("Book", BookSchema);

// ✅ GET All Books
app.get("/api/books", async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
});

// ✅ POST: Add a New Book
app.post("/api/books", async (req, res) => {
    try {
        const { title, author, price } = req.body;
        const newBook = new Book({ title, author, price });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(500).json({ error: "Failed to add book" });
    }
});

// ✅ PUT: Update a Book by ID
app.put("/api/books/:id", async (req, res) => {
    try {
        const { title, author, price } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { title, author, price },
            { new: true }
        );
        res.json(updatedBook);
    } catch (err) {
        res.status(500).json({ error: "Failed to update book" });
    }
});

// ✅ DELETE: Remove a Book by ID
app.delete("/api/books/:id", async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: "Book deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete book" });
    }
});

// ✅ Start the Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
