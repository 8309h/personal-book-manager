"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { ENDPOINTS } from "@/lib/endpoints";
import BookCard from "@/components/BookCard";
import BookForm from "@/components/BookForm";

export default function DashboardPage() {
      const router = useRouter();

      const [books, setBooks] = useState([]);
      const [loading, setLoading] = useState(true);
      const [statusFilter, setStatusFilter] = useState("");
      const [tagFilter, setTagFilter] = useState("");

      const fetchBooks = useCallback(async () => {
            setLoading(true);

            let query = "";

            if (statusFilter) {
                  query += `status=${statusFilter}`;
            }

            if (tagFilter) {
                  query += query ? `&tag=${tagFilter}` : `tag=${tagFilter}`;
            }

            const endpoint = query
                  ? `${ENDPOINTS.BOOKS}?${query}`
                  : ENDPOINTS.BOOKS;

            const res = await apiFetch(endpoint);

            if (!res.success) {
                  router.replace("/login");
                  return;
            }

            setBooks(res.data);
            setLoading(false);
      }, [statusFilter, tagFilter, router]);

      useEffect(() => {
            fetchBooks();
      }, [fetchBooks]);

      const handleLogout = async () => {
            await apiFetch(ENDPOINTS.LOGOUT, {
                  method: "POST"
            });

            router.replace("/login");
      };

      return (
            <div style={styles.container}>
                  <div style={styles.topBar}>
                        <h2 style={styles.heading}>My Books Dashboard</h2>
                        <button style={styles.logoutBtn} onClick={handleLogout}>
                              Logout
                        </button>
                  </div>

                  {/* ADD BOOK FORM */}
                  <BookForm refresh={fetchBooks} />

                  {/* FILTER SECTION */}
                  <div style={styles.filters}>
                        <select
                              value={statusFilter}
                              onChange={(e) => setStatusFilter(e.target.value)}
                        >
                              <option value="">All Status</option>
                              <option value="want_to_read">Want to Read</option>
                              <option value="reading">Reading</option>
                              <option value="completed">Completed</option>
                        </select>

                        <input
                              type="text"
                              placeholder="Filter by tag..."
                              value={tagFilter}
                              onChange={(e) => setTagFilter(e.target.value)}
                        />
                  </div>

                  {/* STATS */}
                  <div style={styles.stats}>
                        <strong>Total Books:</strong> {books.length}
                  </div>

                  {loading ? (
                        <p>Loading...</p>
                  ) : books.length === 0 ? (
                        <p>No books found.</p>
                  ) : (
                        books.map((book) => (
                              <BookCard
                                    key={book._id}
                                    book={book}
                                    refresh={fetchBooks}
                              />
                        ))
                  )}
            </div>
      );
}

const styles = {
      container: {
            maxWidth: "750px",
            margin: "50px auto",
            padding: "0 15px"
      },
      heading: {
            marginBottom: "20px"
      },
      filters: {
            display: "flex",
            gap: "12px",
            marginBottom: "20px"
      },
      stats: {
            marginBottom: "20px",
            color: "#4b5563"
      },
      topBar: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px"
      },
      logoutBtn: {
            padding: "8px 14px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#dc2626",
            color: "white",
            cursor: "pointer",
            fontWeight: "500"
      },
};