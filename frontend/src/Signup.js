import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    axios
      .post("http://127.0.0.1:5001/signup", { email, password, username })
      .then(() => {
        alert("Signup successful");
        navigate("/");
      })
      .catch((err) => {
        console.error(err.response?.data || err.message);
        alert("Signup failed");
      });
  };

  // Styles
  const containerStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f7fa",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: "relative",
    overflow: "hidden",
  };

  const boxStyle = {
    backgroundColor: "white",
    padding: "40px 50px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    width: "320px",
    textAlign: "center",
    position: "relative",
    zIndex: 2,
  };

  const headerStyle = {
    color: "#4a90e2",
    marginBottom: "30px",
    fontSize: "28px",
    fontWeight: "bold",
  };

  const labelStyle = {
    display: "block",
    textAlign: "left",
    marginBottom: "6px",
    fontWeight: "600",
    fontSize: "14px",
    color: "#333",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    marginBottom: "20px",
    borderRadius: "6px",
    border: "1.5px solid #ccc",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    backgroundColor: "#4a90e2",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "6px",
    width: "100%",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  };

  const linkStyle = {
    color: "#4a90e2",
    textDecoration: "none",
    fontWeight: "600",
  };

  return (
    <div style={containerStyle}>
      {/* Animated Background Elements */}
      <motion.div
        style={{
          position: "absolute",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "linear-gradient(45deg, #fd79a8, #fdcb6e)",
          opacity: 0.1,
          top: "10%",
          left: "10%",
        }}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #00b894, #00cec9)",
          opacity: 0.12,
          bottom: "20%",
          right: "15%",
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          rotate: [0, 270, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: "linear-gradient(90deg, #e17055, #fab1a0)",
          opacity: 0.08,
          top: "60%",
          left: "5%",
        }}
        animate={{
          y: [-30, 30, -30],
          x: [-15, 15, -15],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Geometric Background Elements */}
      <motion.div
        style={{
          position: "absolute",
          width: "60px",
          height: "60px",
          background: "linear-gradient(45deg, #6c5ce7, #a29bfe)",
          opacity: 0.1,
          top: "20%",
          right: "20%",
          borderRadius: "8px",
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "#4a90e2",
            opacity: 0.4,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-30, -80, -30],
            x: [-10, 10, -10],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        style={boxStyle}
        initial={{ opacity: 0, y: 60, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.9,
          ease: "easeOut",
        }}
        whileHover={{
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          scale: 1.02,
        }}
      >
        <motion.h2
          style={headerStyle}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Signup
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <label style={labelStyle} htmlFor="username">Username</label>
          <motion.input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
            whileFocus={{
              borderColor: "#4a90e2",
              boxShadow: "0 0 0 3px rgba(74, 144, 226, 0.1)",
              scale: 1.02,
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <label style={labelStyle} htmlFor="email">Email</label>
          <motion.input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            whileFocus={{
              borderColor: "#4a90e2",
              boxShadow: "0 0 0 3px rgba(74, 144, 226, 0.1)",
              scale: 1.02,
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <label style={labelStyle} htmlFor="password">Password</label>
          <motion.input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            whileFocus={{
              borderColor: "#4a90e2",
              boxShadow: "0 0 0 3px rgba(74, 144, 226, 0.1)",
              scale: 1.02,
            }}
          />
        </motion.div>

        <motion.button
          onClick={handleSignup}
          style={buttonStyle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          whileHover={{
            backgroundColor: "#357abd",
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
        >
          Signup
        </motion.button>

        <motion.p
          style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Already have an account?{" "}
          <motion.a
            href="/"
            style={linkStyle}
            whileHover={{ 
              color: "#357abd",
              scale: 1.05,
            }}
          >
            Login
          </motion.a>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Signup;