"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { ENDPOINTS } from "@/lib/endpoints";

export default function LoginPage() {
      const router = useRouter();

      const [form, setForm] = useState({
            email: "",
            password: ""
      });

      const [loading, setLoading] = useState(false);
      const [checkingAuth, setCheckingAuth] = useState(true);
      const [error, setError] = useState("");

      // 🔐 Check if already logged in
      useEffect(() => {
            const checkAuth = async () => {
                  try {
                        const res = await apiFetch(ENDPOINTS.BOOKS);
                        if (res.success) {
                              router.replace("/dashboard");
                        } else {
                              setCheckingAuth(false);
                        }
                  } catch {
                        setCheckingAuth(false);
                  }
            };

            checkAuth();
      }, [router]);

      const handleChange = (e) => {
            setForm({ ...form, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError("");

            try {
                  const res = await apiFetch(ENDPOINTS.LOGIN, {
                        method: "POST",
                        body: JSON.stringify(form)
                  });

                  if (res.success) {
                        router.replace("/dashboard"); // replace is better
                  } else {
                        setError(res.message || "Login failed");
                  }
            } catch (err) {
                  setError("Something went wrong");
            }

            setLoading(false);
      };

      if (checkingAuth) {
            return <p style={{ textAlign: "center" }}>Checking authentication...</p>;
      }

      return (
            <div style={styles.container}>
                  <h2>Login</h2>

                  <form onSubmit={handleSubmit} style={styles.form}>
                        <input
                              type="email"
                              name="email"
                              placeholder="Email"
                              value={form.email}
                              onChange={handleChange}
                              required
                        />

                        <input
                              type="password"
                              name="password"
                              placeholder="Password"
                              value={form.password}
                              onChange={handleChange}
                              required
                        />

                        <button type="submit" disabled={loading}>
                              {loading ? "Logging in..." : "Login"}
                        </button>
                  </form>

                  {error && <p style={styles.error}>{error}</p>}
            </div>
      );
}

const styles = {
      container: {
            maxWidth: "400px",
            margin: "80px auto",
            padding: "20px",
            textAlign: "center",
            border: "1px solid #eee",
            borderRadius: "8px"
      },
      form: {
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "20px"
      },
      error: {
            color: "red",
            marginTop: "10px"
      }
};