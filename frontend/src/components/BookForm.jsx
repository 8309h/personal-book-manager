"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { ENDPOINTS } from "@/lib/endpoints";

export default function BookForm({ refresh }) {
      const [form, setForm] = useState({
            title: "",
            author: "",
            tags: "",
            status: "want_to_read"
      });

      const handleChange = (e) => {
            setForm({ ...form, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
            e.preventDefault();

            await apiFetch(ENDPOINTS.BOOKS, {
                  method: "POST",
                  body: JSON.stringify({
                        title: form.title,
                        author: form.author,
                        tags: form.tags
                              ? form.tags.split(",").map((tag) => tag.trim())
                              : [],
                        status: form.status
                  })
            });

            setForm({
                  title: "",
                  author: "",
                  tags: "",
                  status: "want_to_read"
            });

            refresh();
      };

      return (
            <div style={styles.wrapper}>
                  <h3 style={styles.heading}>Add New Book</h3>

                  <form onSubmit={handleSubmit} style={styles.form}>
                        <input
                              style={styles.input}
                              name="title"
                              placeholder="Book Title"
                              value={form.title}
                              onChange={handleChange}
                              required
                        />

                        <input
                              style={styles.input}
                              name="author"
                              placeholder="Author"
                              value={form.author}
                              onChange={handleChange}
                              required
                        />

                        <input
                              style={styles.input}
                              name="tags"
                              placeholder="Tags (comma separated)"
                              value={form.tags}
                              onChange={handleChange}
                        />

                        <select
                              style={styles.select}
                              name="status"
                              value={form.status}
                              onChange={handleChange}
                        >
                              <option value="want_to_read">Want to Read</option>
                              <option value="reading">Reading</option>
                              <option value="completed">Completed</option>
                        </select>

                        <button type="submit" style={styles.button}>
                              Add Book
                        </button>
                  </form>
            </div>
      );
}

const styles = {
      wrapper: {
            marginBottom: "40px",
            padding: "25px",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
      },
      heading: {
            marginBottom: "20px",
            fontSize: "18px",
            fontWeight: "600",
            color: "#111827"
      },
      form: {
            display: "flex",
            flexDirection: "column",
            gap: "14px"
      },
      input: {
            padding: "10px 12px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            fontSize: "14px",
            outline: "none"
      },
      select: {
            padding: "10px 12px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            fontSize: "14px",
            backgroundColor: "#ffffff",
            outline: "none"
      },
      button: {
            padding: "10px 14px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#2563eb",
            color: "white",
            fontWeight: "500",
            cursor: "pointer"
      }
};