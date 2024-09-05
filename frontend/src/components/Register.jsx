import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    Bio: "",
    ProfilePicture: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dokdea3xl/image/upload`,
        formData
      );
      setFormData((prevState) => ({
        ...prevState,
        ProfilePicture: response.data.secure_url,
      }));
      setImagePreview(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/auth/signup", formData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Bio">Bio:</label>
          <input
            type="text"
            id="Bio"
            name="Bio"
            value={formData.Bio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ProfilePicture">Profile Picture:</label>
          <input
            type="file"
            id="ProfilePicture"
            name="ProfilePicture"
            onChange={handleImageUpload}
            accept="image/*"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Profile Preview"
              className="image-preview"
            />
          )}
        </div>
        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
