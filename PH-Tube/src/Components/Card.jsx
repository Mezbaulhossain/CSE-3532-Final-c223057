// File: src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Card.css";

const Card = () => {
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("1000");

  // Fetch categories
  useEffect(() => {
    axios
      .get("https://openapi.programming-hero.com/api/videos/categories")
      .then((response) => setCategories(response.data.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Fetch videos by category
  useEffect(() => {
    axios
      .get(`https://openapi.programming-hero.com/api/videos/category/${selectedCategory}`)
      .then((response) => setVideos(response.data.data))
      .catch((error) => console.error("Error fetching videos:", error));
  }, [selectedCategory]);

  return (
    <div className="App">
       <header className="navbar">
      <div className="logo">
      
        <span className="logo-icon"><img src="/src/img/Logo.png" alt="" /></span> 
      </div>
      <div className="sort">
        <button className="sort-button">Sort by view</button>
      </div>
      <div className="blog">
        <button className="blog-button">Blog</button>
      </div>
    </header>

      <div className="categories">
        <button
          className={`category ${selectedCategory === "all" ? "active" : ""}`}
          onClick={() => setSelectedCategory("all")}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category ${selectedCategory === category.id ? "active" : ""}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="video-grid">
        {videos.map((video) => (
          <div className="video-card" key={video.id}>
            <img src={video.thumbnail} alt={video.title} className="thumbnail" />
            <h3 className="video-title">{video.title}</h3>
            <p className="channel-name">{video.author_name}</p>
            <p className="views">{video.views} views</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
