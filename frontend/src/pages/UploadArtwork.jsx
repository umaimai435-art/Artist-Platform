import React, { useState, useRef } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/artworks";

const UploadArtwork = () => {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); 
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "Abstract", 
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { title, description, price, category } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setImagePreview(URL.createObjectURL(selectedFile)); 
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (!file) {
      setError("Please select an artwork image");
      setLoading(false);
      return;
    }

    if (!title.trim() || !description.trim() || !price) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in as seller. Token missing.");
        setLoading(false);
        return;
      }

      const data = new FormData();
      data.append("image", file); 
      data.append("title", title);
      data.append("description", description);
      data.append("price", price);
      data.append("category", category);

      await axios.post(API_URL, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Artwork uploaded successfully 🎉 Automatically linked to your portfolio!");

      setFormData({
        title: "",
        description: "",
        price: "",
        category: "Abstract",
      });

      setFile(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error("🔥 Detailed Upload Error Context:", err.response?.data);
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Artwork upload failed. Check file limits or credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "30px auto",
        padding: "30px",
        borderRadius: "12px",
        background: "#1a1a1a", 
        color: "#fff",
        boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
        fontFamily: "sans-serif"
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#a855f7", textAlign: "center" }}>
        Upload New Artwork
      </h2>

      {message && (
        <p style={{ color: "#4ade80", background: "rgba(74,222,128,0.1)", padding: "10px", borderRadius: "6px", textAlign: "center", fontWeight: "bold" }}>
          {message}
        </p>
      )}
      {error && (
        <p style={{ color: "#f87171", background: "rgba(248,113,113,0.1)", padding: "10px", borderRadius: "6px", textAlign: "center", fontWeight: "bold" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#ccc", fontSize: "14px" }}>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", background: "#2a2a2a", color: "#fff", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#ccc", fontSize: "14px" }}>Description</label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            required
            rows="4"
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", background: "#2a2a2a", color: "#fff", resize: "none", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#ccc", fontSize: "14px" }}>Price (Rs)</label>
            <input
              type="number"
              name="price"
              value={price}
              onChange={handleChange}
              required
              min="0"
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", background: "#2a2a2a", color: "#fff", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#ccc", fontSize: "14px" }}>Category</label>
            <select
              name="category"
              value={category}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", background: "#2a2a2a", color: "#fff", boxSizing: "border-box", height: "41px" }}
            >
              <option value="Abstract">Abstract</option>
              <option value="Landscape">Landscape</option>
              <option value="Portrait">Portrait</option>
              <option value="Modern">Modern</option>
              <option value="Islamic">Islamic</option>
              <option value="Calligraphy">Calligraphy</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#ccc", fontSize: "14px" }}>Artwork Image</label>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            required
            style={{ color: "#ccc" }}
          />
          
          {imagePreview && (
            <div style={{ marginTop: "15px", textAlign: "center" }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: "200px", borderRadius: "6px", border: "2px solid #a855f7", objectFit: "contain" }}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: "#a855f7", 
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => !loading && (e.target.style.background = "#9333ea")}
          onMouseOut={(e) => !loading && (e.target.style.background = "#a855f7")}
        >
          {loading ? "Uploading Masterpiece..." : "Upload Artwork"}
        </button>
      </form>
    </div>
  );
};

export default UploadArtwork;