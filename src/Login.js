// Login.js
import React, { useState } from "react";

function Login({ onLogin }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🚀 Welcome to Chat App</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Join Chat</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#1e1e2f",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#2c2c3e",
    padding: 40,
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    textAlign: "center",
    width: 300,
  },
  title: {
    color: "#fff",
    marginBottom: 20,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderRadius: 8,
    border: "none",
    outline: "none",
    backgroundColor: "#444",
    color: "#fff",
  },
  button: {
    padding: 10,
    fontSize: 16,
    borderRadius: 8,
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Login;
