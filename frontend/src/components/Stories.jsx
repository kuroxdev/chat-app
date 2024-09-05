import React, { useState } from "react";
import axios from "axios";

const Stories = ({ stories, createStory }) => {
  const [newStory, setNewStory] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewStory(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleCreateStory = async () => {
    if (newStory) {
      const formData = new FormData();
      formData.append("file", newStory);
      formData.append("upload_preset", "ml_default");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dokdea3xl/image/upload`,
          formData
        );
        const imageUrl = response.data.secure_url;
        await createStory({ imageUrl });
        setNewStory(null);
        setPreviewUrl("");
      } catch (error) {
        console.error("Error creating story:", error);
      }
    }
  };

  return (
    <div className="stories-wrapper">
      <div className="stories">
        {stories.map((story, index) => (
          <div key={index} className="story">
            <img src={story.Content} alt="Story" className="story__image" />
          </div>
        ))}
      </div>
      <div className="story-creator">
        <label htmlFor="file-upload" className="upload-btn">
          +
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
        {previewUrl && (
          <img src={previewUrl} alt="Preview" className="story__preview" />
        )}
        {newStory && (
          <button onClick={handleCreateStory} className="upload-btn">
            Post
          </button>
        )}
      </div>
    </div>
  );
};

export default Stories;
