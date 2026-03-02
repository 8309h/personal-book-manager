const Book = require("../models/Book");

// ================= GET ALL BOOKS =================
exports.getBooks = async (req, res) => {
      try {
            const userId = req.user.id;

            const { status, tag } = req.query;

            let filter = { user: userId };

            if (status) {
                  filter.status = status;
            }

            if (tag) {
                  filter.tags = tag;
            }

            const books = await Book.find(filter).sort({ createdAt: -1 });

            return res.status(200).json({
                  success: true,
                  message: "Books fetched successfully",
                  data: books
            });

      } catch (error) {
            return res.status(500).json({
                  success: false,
                  message: "Failed to fetch books",
                  data: {}
            });
      }
};
// ================= CREATE BOOK =================
exports.createBook = async (req, res) => {
      try {
            const userId = req.user.id;

            const { title, author, tags, status } = req.body;

            if (!title || !author) {
                  return res.status(400).json({
                        success: false,
                        message: "Title and author are required",
                        data: {}
                  });
            }

            const book = await Book.create({
                  user: userId,
                  title,
                  author,
                  tags: tags || [],
                  status: status || "want_to_read"
            });

            return res.status(201).json({
                  success: true,
                  message: "Book added successfully",
                  data: book
            });

      } catch (error) {
            return res.status(500).json({
                  success: false,
                  message: "Failed to create book",
                  data: {}
            });
      }
};

// ================= UPDATE BOOK =================
exports.updateBook = async (req, res) => {
      try {
            const userId = req.user.id;
            const bookId = req.params.id;

            const book = await Book.findOne({ _id: bookId, user: userId });

            if (!book) {
                  return res.status(404).json({
                        success: false,
                        message: "Book not found",
                        data: {}
                  });
            }

            const { title, author, tags, status } = req.body;

            if (title !== undefined) book.title = title;
            if (author !== undefined) book.author = author;
            if (tags !== undefined) book.tags = tags;
            if (status !== undefined) book.status = status;

            await book.save();

            return res.status(200).json({
                  success: true,
                  message: "Book updated successfully",
                  data: book
            });

      } catch (error) {
            return res.status(500).json({
                  success: false,
                  message: "Failed to update book",
                  data: {}
            });
      }
};

// ================= DELETE BOOK =================
exports.deleteBook = async (req, res) => {
      try {
            const userId = req.user.id;
            const bookId = req.params.id;

            const book = await Book.findOneAndDelete({
                  _id: bookId,
                  user: userId
            });

            if (!book) {
                  return res.status(404).json({
                        success: false,
                        message: "Book not found",
                        data: {}
                  });
            }

            return res.status(200).json({
                  success: true,
                  message: "Book deleted successfully",
                  data: {}
            });

      } catch (error) {
            return res.status(500).json({
                  success: false,
                  message: "Failed to delete book",
                  data: {}
            });
      }
};