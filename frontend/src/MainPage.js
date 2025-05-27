import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from 'framer-motion';

function MainPage() {
  const [image, setImage] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [history, setHistory] = useState([]);
  const [username, setUsername] = useState(""); // state for username
  const [selectedImage, setSelectedImage] = useState(null);
  const email = localStorage.getItem("email");

  // Fetch username based on email
  useEffect(() => {
    if (!email) return;
    axios
      .get("http://127.0.0.1:5001/get-username", { params: { email } })
      .then((res) => setUsername(res.data.username || ""))
      .catch(() => setUsername(""));
  }, [email]);

  // Fetch recommendation history
  useEffect(() => {
    if (!email) return;
    axios
      .get("http://127.0.0.1:5001/history", { params: { email } })
      .then((res) => {
        setHistory(res.data);
      })
      .catch(() => setHistory([]));
  }, [email]);

  const getRandomHistory = () => {
    if (history.length <= 10) return history;
    const shuffled = [...history].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  };

  const handleRecommend = () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }
    const formData = new FormData();
    formData.append("email", email);
    formData.append("image", image);
    axios
      .post("http://127.0.0.1:5001/recommend", formData)
      .then((res) => {
        setRecommendations(res.data);
        setHistory((prev) => [...res.data, ...prev]);
      })
      .catch(() => alert("Failed to get recommendations"));
  };

  const handleImageClick = (item) => {
    setSelectedImage(item);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // Styles
  const containerStyle = {
    maxWidth: "900px",
    margin: "40px auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: "relative",
    minHeight: "100vh",
  };

  const headerStyle = {
    backgroundColor: "#4a90e2",
    color: "white",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "24px",
    fontWeight: "bold",
    borderRadius: "8px",
    position: "relative",
    overflow: "hidden",
  };

  const userSectionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    fontSize: "16px",
  };

  const logoutButtonStyle = {
    backgroundColor: "#e94e77",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const uploadSectionStyle = {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "8px",
    boxShadow: "0 0 12px rgba(0,0,0,0.1)",
    textAlign: "center",
    marginTop: "30px",
    position: "relative",
    overflow: "hidden",
  };

  const bigBoxStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    marginTop: "40px",
    position: "relative",
    overflow: "hidden",
  };

  const previousBoxStyle = {
    ...bigBoxStyle,
    border: "2px solid #f39c12",
  };

  const uploadBoxStyle = {
    ...bigBoxStyle,
    border: "2px solid #2980b9",
  };

  const imagesContainerStyle = {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  const imageBoxStyle = {
    width: "120px",
    height: "150px",
    borderRadius: "6px",
    boxShadow: "0 0 8px rgba(0,0,0,0.1)",
    overflow: "hidden",
    cursor: "pointer",
    textAlign: "center",
    padding: "10px",
    backgroundColor: "#fafafa",
  };

  const imageStyle = {
    width: "100%",
    height: "100px",
    objectFit: "contain",
  };

  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backdropFilter: "blur(5px)",
  };

  const modalContentStyle = {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "30px",
    maxWidth: "500px",
    width: "90%",
    maxHeight: "80vh",
    overflow: "auto",
    position: "relative",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "15px",
    right: "20px",
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "#666",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const modalImageStyle = {
    width: "100%",
    maxHeight: "400px",
    objectFit: "contain",
    borderRadius: "8px",
    marginBottom: "20px",
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  return (
    <div style={containerStyle}>
      {/* Background Animation Elements */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          opacity: 0.03,
          zIndex: -1,
        }}
        animate={{
          background: [
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating Geometric Shapes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "fixed",
            width: `${30 + Math.random() * 40}px`,
            height: `${30 + Math.random() * 40}px`,
            background: "linear-gradient(45deg, #4a90e2, #74b9ff)",
            opacity: 0.05,
            borderRadius: Math.random() > 0.5 ? "50%" : "8px",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            zIndex: -1,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-15, 15, -15],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      <motion.header
        style={headerStyle}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header Background Animation */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
            zIndex: 0,
          }}
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        <motion.div
          style={{ position: "relative", zIndex: 1 }}
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Product Recommendation App
        </motion.div>
        
        <motion.div
          style={{ ...userSectionStyle, position: "relative", zIndex: 1 }}
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Welcome, {username ? username : "User"}
          </motion.span>
          <motion.button
            style={logoutButtonStyle}
            onClick={handleLogout}
            whileHover={{ 
              backgroundColor: "#d63384",
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
        </motion.div>
      </motion.header>

      <motion.section
        style={uploadSectionStyle}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        whileHover={{ boxShadow: "0 0 20px rgba(0,0,0,0.15)" }}
      >
        {/* Section Background Animation */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(90deg, transparent, rgba(74, 144, 226, 0.05), transparent)",
            zIndex: 0,
          }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.h3
          style={{ position: "relative", zIndex: 1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Upload an Image to Get Recommendations
        </motion.h3>
        
        <motion.input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ margin: "15px 0", position: "relative", zIndex: 1 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
        />
        <br />
        <motion.button
          onClick={handleRecommend}
          style={{ padding: "10px 20px", fontSize: "16px", position: "relative", zIndex: 1 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          whileHover={{
            backgroundColor: "#357abd",
            scale: 1.05,
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          Recommend
        </motion.button>
      </motion.section>

      {recommendations.length > 0 && (
        <motion.section
          style={uploadBoxStyle}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ boxShadow: "0 0 25px rgba(0,0,0,0.15)" }}
        >
          {/* Section Background Animation */}
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(45deg, transparent, rgba(41, 128, 185, 0.03), transparent)",
              zIndex: 0,
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          <motion.h3
            style={{ textAlign: "center", position: "relative", zIndex: 1 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Recommendations from Your Upload
          </motion.h3>
          
          <div style={{ ...imagesContainerStyle, position: "relative", zIndex: 1 }}>
            {recommendations.map((item, index) => (
              <motion.div
                key={index}
                style={imageBoxStyle}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
                  y: -5,
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleImageClick(item)}
              >
                <motion.img
                  src={item.image_url}
                  alt={item.product_name}
                  style={imageStyle}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                >
                  {item.product_name}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      <motion.section
        style={previousBoxStyle}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        whileHover={{ boxShadow: "0 0 25px rgba(0,0,0,0.15)" }}
      >
        {/* Section Background Animation */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, transparent, rgba(243, 156, 18, 0.03), transparent)",
            zIndex: 0,
          }}
          animate={{
            scale: [1, 1.02, 1],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.h3
          style={{ textAlign: "center", position: "relative", zIndex: 1 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Your Previous Recommendations
        </motion.h3>
        
        {getRandomHistory().length === 0 ? (
          <motion.p
            style={{ textAlign: "center", position: "relative", zIndex: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            No history found. Upload images to get recommendations.
          </motion.p>
        ) : (
          <div style={{ ...imagesContainerStyle, position: "relative", zIndex: 1 }}>
            {getRandomHistory().map((item, index) => (
              <motion.div
                key={index}
                style={imageBoxStyle}
                initial={{ opacity: 0, x: -30, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  delay: 0.8 + index * 0.05,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                  y: -8,
                  rotate: Math.random() > 0.5 ? 2 : -2,
                }}
                whileTap={{ scale: 0.92 }}
                onClick={() => handleImageClick(item)}
              >
                <motion.img
                  src={item.image_url}
                  alt={item.product_name}
                  style={imageStyle}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.05, duration: 0.4 }}
                />
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.05, duration: 0.4 }}
                >
                  {item.product_name}
                </motion.p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Image Popup Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            style={modalOverlayStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <motion.div
              style={modalContentStyle}
              initial={{ scale: 0.7, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                style={closeButtonStyle}
                onClick={closeModal}
                whileHover={{ 
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                  scale: 1.1 
                }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
              
              <motion.img
                src={selectedImage.image_url}
                alt={selectedImage.product_name}
                style={modalImageStyle}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <h2 style={{ 
                  margin: "0 0 15px 0", 
                  color: "#333",
                  fontSize: "24px",
                  fontWeight: "bold"
                }}>
                  {selectedImage.product_name}
                </h2>
                
                <p style={{ 
                  color: "#666", 
                  lineHeight: "1.6",
                  fontSize: "16px"
                }}>
                  Click outside or press the × button to close this preview.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MainPage;