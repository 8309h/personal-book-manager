const express = require("express");
const protect = require("../middleware/auth.middleware");

const {
      getBooks,
      createBook,
      updateBook,
      deleteBook
} = require("../controllers/book.controller");

const router = express.Router();

// Protect all book routes
router.use(protect);

// GET all books
router.get("/", getBooks);

// CREATE new book
router.post("/", createBook);

// UPDATE book
router.patch("/:id", updateBook);

// DELETE book
router.delete("/:id", deleteBook);

module.exports = router;