import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Login from "./Login";

const socket = io("http://localhost:5000");

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
  socket.on("connect", () => {
    console.log("✅ Connected to server:", socket.id);
  });

  socket.on("receive_message", (data) => {
    setMessages((prev) => [...prev, data]);
  });

  // Clean up on unmount to prevent duplicate listeners
  return () => {
    socket.off("receive_message");
    socket.off("connect");
  };
}, []);


  const sendMessage = () => {
  if (message.trim()) {
    const newMessage = {
      username,
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    socket.emit("send_message", newMessage); // 👈 only emit
    setMessage(""); // clear input
  }
};


  if (!username) {
    return <Login onLogin={setUsername} />;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>💬 Welcome, {username}</h2>
      <div style={styles.chatBox}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              ...styles.messageBubble,
              alignSelf: msg.username === username ? "flex-end" : "flex-start",
              backgroundColor: msg.username === username ? "#4CAF50" : "#4a4a6a",
            }}
          >
            <strong>{msg.username}</strong>
            <div>{msg.text}</div>
            <div style={styles.time}>{msg.time}</div>
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} style={styles.button}>Send</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#1e1e2f",
    color: "#fff",
    height: "100vh",
    padding: 20,
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    marginBottom: 10,
  },
  chatBox: {
    backgroundColor: "#2c2c3e",
    width: "100%",
    maxWidth: 600,
    height: 400,
    borderRadius: 10,
    padding: 15,
    overflowY: "auto",
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  },
  messageBubble: {
    padding: 10,
    margin: "5px 0",
    borderRadius: 10,
    maxWidth: "80%",
    wordBreak: "break-word",
  },
  time: {
    fontSize: "0.75em",
    color: "#ccc",
    marginTop: 5,
    textAlign: "right",
  },
  inputContainer: {
    display: "flex",
    width: "100%",
    maxWidth: 600,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    border: "none",
    fontSize: 16,
    marginRight: 10,
    backgroundColor: "#333",
    color: "#fff",
  },
  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: 10,
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default App;
