import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("http://127.0.0.1:5000/login", { email, password })
      .then((res) => {
        localStorage.setItem("email", email);
        navigate("/main");
      })
      .catch((err) => {
        alert("Login failed");
      });
  };

  // Styles (same as Signup for consistency)
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
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "linear-gradient(45deg, #4a90e2, #74b9ff)",
          opacity: 0.1,
          top: "-100px",
          left: "-100px",
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #6c5ce7, #a29bfe)",
          opacity: 0.1,
          bottom: "-50px",
          right: "-50px",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "linear-gradient(90deg, #00cec9, #55efc4)",
          opacity: 0.08,
          top: "50%",
          right: "10%",
        }}
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#4a90e2",
            opacity: 0.3,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -60, -20],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        style={boxStyle}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        whileHover={{
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          scale: 1.02,
        }}
      >
        <motion.h2
          style={headerStyle}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Login
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
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
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
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
            }}
          />
        </motion.div>

        <motion.button
          onClick={handleLogin}
          style={buttonStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{
            backgroundColor: "#357abd",
            scale: 1.02,
          }}
          whileTap={{ scale: 0.98 }}
        >
          Login
        </motion.button>

        <motion.p
          style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Don't have an account?{" "}
          <motion.a
            href="/signup"
            style={linkStyle}
            whileHover={{ color: "#357abd" }}
          >
            Signup
          </motion.a>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Login;