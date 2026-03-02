const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
      {
            user: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "User",
                  required: true,
                  index: true
            },
            title: {
                  type: String,
                  required: [true, "Title is required"],
                  trim: true
            },
            author: {
                  type: String,
                  required: [true, "Author is required"],
                  trim: true
            },
            tags: {
                  type: [String],
                  default: []
            },
            status: {
                  type: String,
                  enum: ["want_to_read", "reading", "completed"],
                  default: "want_to_read"
            }
      },
      {
            timestamps: true
      }
);

module.exports = mongoose.model("Book", bookSchema);