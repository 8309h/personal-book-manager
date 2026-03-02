"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { ENDPOINTS } from "@/lib/endpoints";
import StatusBadge from "./StatusBadge";

export default function BookCard({ book, refresh }) {
      const [editing, setEditing] = useState(false);
      const [editTitle, setEditTitle] = useState(book.title);
      const [editAuthor, setEditAuthor] = useState(book.author);

      const changeStatus = async (newStatus) => {
            await apiFetch(`${ENDPOINTS.BOOKS}/${book._id}`, {
                  method: "PATCH",
                  body: JSON.stringify({ status: newStatus })
            });
            refresh();
      };

      const deleteBook = async () => {
            const confirmDelete = window.confirm(
                  `Are you sure you want to delete "${book.title}"?`
            );

            if (!confirmDelete) return;

            await apiFetch(`${ENDPOINTS.BOOKS}/${book._id}`, {
                  method: "DELETE"
            });

            refresh();
      };

      const saveEdit = async () => {
            await apiFetch(`${ENDPOINTS.BOOKS}/${book._id}`, {
                  method: "PATCH",
                  body: JSON.stringify({
                        title: editTitle,
                        author: editAuthor
                  })
            });

            setEditing(false);
            refresh();
      };

      return (
            <div style={styles.card}>
                  {editing ? (
                        <>
                              <input
                                    style={styles.input}
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                              />
                              <input
                                    style={styles.input}
                                    value={editAuthor}
                                    onChange={(e) => setEditAuthor(e.target.value)}
                              />
                              <button style={styles.primaryBtn} onClick={saveEdit}>
                                    Save
                              </button>
                        </>
                  ) : (
                        <>
                              <div style={styles.header}>
                                    <h3>{book.title}</h3>
                                    <StatusBadge status={book.status} />
                              </div>

                              <p style={styles.author}>{book.author}</p>

                              <div style={styles.actions}>
                                    <button
                                          style={styles.primaryBtn}
                                          onClick={() => changeStatus("want_to_read")}
                                    >
                                          Want to Read
                                    </button>

                                    <button
                                          style={styles.primaryBtn}
                                          onClick={() => changeStatus("reading")}
                                    >
                                          Reading
                                    </button>

                                    <button
                                          style={styles.primaryBtn}
                                          onClick={() => changeStatus("completed")}
                                    >
                                          Completed
                                    </button>
                                    <button
                                          style={styles.grayBtn}
                                          onClick={() => setEditing(true)}
                                    >
                                          Edit
                                    </button>

                                    <button
                                          style={styles.deleteBtn}
                                          onClick={deleteBook}
                                    >
                                          Delete
                                    </button>


                              </div>
                        </>
                  )}
            </div>
      );
}

const styles = {
      card: {
            border: "1px solid #e5e7eb",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "20px",
            background: "#ffffff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      },
      header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
      },
      author: {
            color: "#6b7280",
            marginTop: "5px"
      },
      actions: {
            marginTop: "15px",
            display: "flex",
            gap: "8px",
            flexWrap: "wrap"
      },
      input: {
            padding: "8px 10px",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            marginBottom: "8px"
      },
      primaryBtn: {
            padding: "6px 12px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            color: "black"
      },
      grayBtn: {
            padding: "6px 12px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            backgroundColor: "#4b5563",
            color: "white"
      },
      deleteBtn: {
            padding: "6px 12px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            backgroundColor: "#dc2626",
            color: "white"
      }
};