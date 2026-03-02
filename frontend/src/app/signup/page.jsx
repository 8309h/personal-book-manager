"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { ENDPOINTS } from "@/lib/endpoints";

export default function SignupPage() {
      const router = useRouter();

      const [form, setForm] = useState({
            name: "",
            email: "",
            password: ""
      });

      const [loading, setLoading] = useState(false);
      const [error, setError] = useState("");

      const handleChange = (e) => {
            setForm({ ...form, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError("");

            try {
                  const res = await apiFetch(ENDPOINTS.SIGNUP, {
                        method: "POST",
                        body: JSON.stringify(form)
                  });

                  if (res.success) {
                        router.push("/dashboard");
                  } else {
                        setError(res.message);
                  }
            } catch (err) {
                  setError("Something went wrong");
            }

            setLoading(false);
      };

      return (
            <div style={styles.container}>
                  <h2>Create Account</h2>

                  <form onSubmit={handleSubmit} style={styles.form}>
                        <input
                              type="text"
                              name="name"
                              placeholder="Name"
                              value={form.name}
                              onChange={handleChange}
                              required
                        />

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
                              {loading ? "Creating..." : "Sign Up"}
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