import React, { useState, useEffect } from "react";
import axios from "axios";

function MainPage() {
  const [image, setImage] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [history, setHistory] = useState([]);
  const [username, setUsername] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedPredefinedImage, setSelectedPredefinedImage] = useState(null);
  const email = localStorage.getItem("email");

  // Predefined images for selection
  const predefinedImages = [
    {
      id: 1,
      name: "Citizen Men Black Dial Watch",
      url: "http://assets.myntassets.com/v1/images/style/properties/e2002eef270ba0d84bc9d13be4f9b1c7_images.jpg",
    },
    {
      id: 2,
      name: "Puma Men Black Leaping Cat T-shirt",
      url: "http://assets.myntassets.com/v1/images/style/properties/c1fb30361762f0d1e5d553422eb718e8_images.jpg",
    },
    {
      id: 3,
      name: "Puma Men's Ballistic Spike White Green Shoe",
      url: "http://assets.myntassets.com/v1/images/style/properties/f64b458800bc9aff9805bb53ea1d01e3_images.jpg",
    },
    {
      id: 4,
      name: "Reid & Taylor Men Black & Brown Reversible Belt",
      url: "http://assets.myntassets.com/v1/images/style/properties/Reid---Taylor-Men-Black-Belt_e459acf988f643e09a5c4cf66734700e_images.jpg",
    },
    {
      id: 5,
      name: "United Colors of Benetton Men Sunglass",
      url: "http://assets.myntassets.com/v1/images/style/properties/United-Colors-of-Benetton-Men-White-Sunglass_544ab95d576fe6dbaccf8c1a8e1a02ce_images.jpg",
    },
    {
      id: 6,
      name: "Park Avenue Men Blue Tie",
      url: "http://assets.myntassets.com/v1/images/style/properties/b71f314942e7843e73ddd6b6261d399c_images.jpg",
    },
    {
      id: 7,
      name: "Fabindia Maroon Printed Ajrakh Dhonekhali Saree",
      url: "http://assets.myntassets.com/v1/images/style/properties/Fabindia-Women-Red-Sari_7c4c4327b8861d1d590ffb3057f960f6_images.jpg",
    },
    {
      id: 8,
      name: "Raymond Men Navy Socks",
      url: "http://assets.myntassets.com/v1/images/style/properties/Raymond-Men-Raymond-socks-Blue-Socks_c9d1cabb5c64e5576f1e32eda759918b_images.jpg",
    },
    {
      id: 9,
      name: "New Hide Men Black Wallet",
      url: "http://assets.myntassets.com/v1/images/style/properties/cbec813195b8a9df7c7600c2c78e965f_images.jpg",
    },
    {
      id: 10,
      name: "Myntra Men Lavender Striped Shirt",
      url: "http://assets.myntassets.com/v1/images/style/properties/e241bc9e3c46d6120c7db729456463cf_images.jpg",
    },
    {
      id: 11,
      name: "Kiara Women Orange Handbag",
      url: "http://assets.myntassets.com/v1/images/style/properties/02aaa50b166e580eaa95a11db37b6eb3_images.jpg",
    },
    {
      id: 12,
      name: "Highlander Men Charcoal Chinos",
      url: "http://assets.myntassets.com/v1/images/style/properties/Highlander-Men-Charcoal-Chinos_1ce8ae7175a6e69fd554611f5cb390bb_images.jpg",
    },
    {
      id: 13,
      name: "Royal Diadem Gold & Pink Earrings",
      url: "http://assets.myntassets.com/v1/images/style/properties/a16a6a41ad7a6477157e1bdff8657e9f_images.jpg",
    },
    {
      id: 14,
      name: "Fabindia Women White Printed Kurta",
      url: "http://assets.myntassets.com/v1/images/style/properties/5204e16b91b575917a5c5685bc7fa80a_images.jpg",
    },
    {
      id: 15,
      name: "Allen Solly Woman Khaki Trousers",
      url: "http://assets.myntassets.com/v1/images/style/properties/87adc16694f6d4ee2c28a1233c57d5c9_images.jpg",
    },
  ];

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

  const handlePredefinedImageRecommend = async () => {
    if (!selectedPredefinedImage) {
      alert("Please select a predefined image first.");
      return;
    }

    try {
      // Convert image URL to blob and then to file
      const response = await fetch(selectedPredefinedImage.url);
      const blob = await response.blob();
      const file = new File([blob], `${selectedPredefinedImage.name}.jpg`, {
        type: "image/jpeg",
      });

      const formData = new FormData();
      formData.append("email", email);
      formData.append("image", file);

      const recommendResponse = await axios.post(
        "http://127.0.0.1:5001/recommend",
        formData
      );
      setRecommendations(recommendResponse.data);
      setHistory((prev) => [...recommendResponse.data, ...prev]);
    } catch (error) {
      alert("Failed to get recommendations for predefined image");
    }
  };

  const handleImageClick = (item) => {
    setSelectedImage(item);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleHistoryClick = () => {
    setShowHistoryModal(true);
    setShowDropdown(false);
  };

  const closeHistoryModal = () => {
    setShowHistoryModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  const handlePredefinedImageSelect = (predefinedImage) => {
    setSelectedPredefinedImage(predefinedImage);
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
  };

  const userIconContainerStyle = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  };

  const userIconStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#357abd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "bold",
    border: "2px solid white",
  };

  const dropdownStyle = {
    position: "absolute",
    top: "50px",
    right: "0",
    backgroundColor: "white",
    color: "#333",
    borderRadius: "8px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
    padding: "15px",
    minWidth: "200px",
    zIndex: 1000,
  };

  const dropdownItemStyle = {
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "5px",
    marginBottom: "5px",
    transition: "background-color 0.2s",
  };

  const sectionStyle = {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "8px",
    boxShadow: "0 0 12px rgba(0,0,0,0.1)",
    textAlign: "center",
    marginTop: "30px",
  };

  const bigBoxStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    marginTop: "40px",
  };

  const previousBoxStyle = {
    ...bigBoxStyle,
    border: "2px solid #f39c12",
  };

  const uploadBoxStyle = {
    ...bigBoxStyle,
    border: "2px solid #2980b9",
  };

  const predefinedBoxStyle = {
    ...bigBoxStyle,
    border: "2px solid #27ae60",
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

  const predefinedImageBoxStyle = {
    ...imageBoxStyle,
    border:
      selectedPredefinedImage?.id === undefined
        ? "2px solid transparent"
        : "2px solid transparent",
  };

  const selectedPredefinedImageBoxStyle = {
    ...predefinedImageBoxStyle,
    border: "2px solid #27ae60",
    backgroundColor: "#f0f8f0",
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

  const historyModalContentStyle = {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "30px",
    maxWidth: "800px",
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

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4a90e2",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10px 5px",
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <div>Product Recommendation App</div>
        <div
          style={userIconContainerStyle}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div style={userIconStyle}>
            {username ? username.charAt(0).toUpperCase() : "U"}
          </div>

          {showDropdown && (
            <div style={dropdownStyle}>
              <div
                style={{
                  marginBottom: "15px",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Welcome, {username || "User"}
              </div>
              <div
                style={dropdownItemStyle}
                onClick={handleHistoryClick}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#f0f0f0")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                View History
              </div>
              <div
                style={{ ...dropdownItemStyle, color: "#e94e77" }}
                onClick={handleLogout}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#fee")}
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Predefined Images Section */}
      <section style={predefinedBoxStyle}>
        <h3 style={{ textAlign: "center", color: "#27ae60" }}>
          Choose from Predefined Images
        </h3>
        <div style={imagesContainerStyle}>
          {predefinedImages.map((predefinedImage) => (
            <div
              key={predefinedImage.id}
              style={
                selectedPredefinedImage?.id === predefinedImage.id
                  ? selectedPredefinedImageBoxStyle
                  : predefinedImageBoxStyle
              }
              onClick={() => handlePredefinedImageSelect(predefinedImage)}
            >
              <img
                src={predefinedImage.url}
                alt={predefinedImage.name}
                style={imageStyle}
              />
              <p style={{ fontSize: "12px", margin: "5px 0" }}>
                {predefinedImage.name}
              </p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button onClick={handlePredefinedImageRecommend} style={buttonStyle}>
            Get Recommendations
          </button>
          {selectedPredefinedImage && (
            <p style={{ color: "#27ae60", marginTop: "10px" }}>
              Selected: {selectedPredefinedImage.name}
            </p>
          )}
        </div>

        <section style={sectionStyle}>
          <h3>Or Upload an Image to Get Recommendations</h3>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ margin: "15px 0" }}
          />
          <br />
          <button onClick={handleRecommend} style={buttonStyle}>
            Recommend from Upload
          </button>
        </section>
      </section>

      {/* Upload Section */}
      {/* <section style={sectionStyle}>
        <h3>Or Upload an Image to Get Recommendations</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ margin: "15px 0" }}
        />
        <br />
        <button onClick={handleRecommend} style={buttonStyle}>
          Recommend from Upload
        </button>
      </section> */}

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <section style={uploadBoxStyle}>
          <h3 style={{ textAlign: "center" }}>Recommendations</h3>
          <div style={imagesContainerStyle}>
            {recommendations.map((item, index) => (
              <div
                key={index}
                style={imageBoxStyle}
                onClick={() => handleImageClick(item)}
              >
                <img
                  src={item.image_url}
                  alt={item.product_name}
                  style={imageStyle}
                />
                <p>{item.product_name}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Previous Recommendations Section */}
      <section style={previousBoxStyle}>
        <h3 style={{ textAlign: "center" }}>Your Previous Recommendations</h3>
        {getRandomHistory().length === 0 ? (
          <p style={{ textAlign: "center" }}>
            No history found. Upload images to get recommendations.
          </p>
        ) : (
          <div style={imagesContainerStyle}>
            {getRandomHistory().map((item, index) => (
              <div
                key={index}
                style={imageBoxStyle}
                onClick={() => handleImageClick(item)}
              >
                <img
                  src={item.image_url}
                  alt={item.product_name}
                  style={imageStyle}
                />
                <p>{item.product_name}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* History Modal */}
      {showHistoryModal && (
        <div style={modalOverlayStyle} onClick={closeHistoryModal}>
          <div
            style={historyModalContentStyle}
            onClick={(e) => e.stopPropagation()}
          >
            <button style={closeButtonStyle} onClick={closeHistoryModal}>
              ×
            </button>
            <h2 style={{ marginBottom: "20px", color: "#333" }}>
              Complete History
            </h2>
            {history.length === 0 ? (
              <p style={{ textAlign: "center", color: "#666" }}>
                No history found. Upload images to get recommendations.
              </p>
            ) : (
              <div style={imagesContainerStyle}>
                {history.map((item, index) => (
                  <div
                    key={index}
                    style={imageBoxStyle}
                    onClick={() => handleImageClick(item)}
                  >
                    <img
                      src={item.image_url}
                      alt={item.product_name}
                      style={imageStyle}
                    />
                    <p>{item.product_name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Image Popup Modal */}
      {selectedImage && (
        <div style={modalOverlayStyle} onClick={closeModal}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <button style={closeButtonStyle} onClick={closeModal}>
              ×
            </button>
            <img
              src={selectedImage.image_url}
              alt={selectedImage.product_name}
              style={modalImageStyle}
            />
            <div>
              <h2
                style={{
                  margin: "0 0 15px 0",
                  color: "#333",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                {selectedImage.product_name}
              </h2>
              <p style={{ color: "#666", lineHeight: "1.6", fontSize: "16px" }}>
                Click outside or press the × button to close this preview.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;