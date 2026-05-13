import React, { useState, useRef } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/artworks";

const UploadArtwork = () => {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "Abstract", // must match backend enum
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { title, description, price, category } = formData;

  // ---------------------------
  // Handle input change
  // ---------------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ---------------------------
  // Handle image selection
  // ---------------------------
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // ---------------------------
  // Submit form
  // ---------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    // Basic validation
    if (!file) {
      setError("Please select an artwork image");
      setLoading(false);
      return;
    }

    if (!title || !description || !price) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in as seller");
        setLoading(false);
        return;
      }

      // Prepare FormData
      const data = new FormData();
      data.append("image", file); // must match upload.single("image")
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

      setMessage("Artwork uploaded successfully 🎉");

      // Reset form
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "Abstract",
      });

      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Artwork upload failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "520px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        background: "#fff",
      }}
    >
      <h2 style={{ marginBottom: "15px" }}>Upload New Artwork</h2>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div style={{ marginBottom: "10px" }}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: "10px" }}>
          <label>Description</label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            required
            rows="4"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Price */}
        <div style={{ marginBottom: "10px" }}>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={handleChange}
            required
            min="0"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Category */}
        <div style={{ marginBottom: "10px" }}>
          <label>Category</label>
          <select
            name="category"
            value={category}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
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

        {/* Image */}
        <div style={{ marginBottom: "15px" }}>
          <label>Artwork Image</label>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            background: "#000",
            color: "#fff",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Uploading..." : "Upload Artwork"}
        </button>
      </form>
    </div>
  );
};

export default UploadArtwork;