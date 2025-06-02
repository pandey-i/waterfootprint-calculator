import React, { useState } from 'react';
import './NewsAndArticles.css';

const NewsAndArticles = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'research', name: 'Research' },
    { id: 'tips', name: 'Tips & Guides' },
    { id: 'global', name: 'Global Impact' },
    { id: 'technology', name: 'Technology' }
  ];

  const articles = [
    {
      id: 1,
      title: "The Hidden Water Footprint of Everyday Products",
      category: "research",
      date: "March 15, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      excerpt: "Discover how much water goes into producing the items we use daily, from smartphones to clothing.",
      author: "Dr. Sarah Johnson"
    },
    {
      id: 2,
      title: "10 Simple Ways to Reduce Your Water Footprint",
      category: "tips",
      date: "March 12, 2024",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      excerpt: "Practical tips and strategies to minimize your water consumption at home and in daily life.",
      author: "Water Conservation Expert"
    },
    {
      id: 3,
      title: "Global Water Crisis: A Call to Action",
      category: "global",
      date: "March 10, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1581092334247-ddef2a41f3b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      excerpt: "An in-depth look at the worldwide water scarcity challenges and potential solutions.",
      author: "Environmental Journalist"
    },
    {
      id: 4,
      title: "Smart Water Management Technologies",
      category: "technology",
      date: "March 8, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      excerpt: "Exploring innovative technologies that are revolutionizing water conservation and management.",
      author: "Tech Innovation Writer"
    }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  return (
    <div className="news-articles-page">
      <div className="hero-section">
        <h1>Water Footprint News & Articles</h1>
        <p>Stay informed about water conservation, sustainability, and environmental impact.</p>
      </div>

      <div className="content-section">
        <div className="categories-bar">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="articles-grid">
          {filteredArticles.map(article => (
            <div key={article.id} className="article-card">
              <div className="article-image">
                <img src={article.image} alt={article.title} />
                <div className="article-category">{article.category}</div>
              </div>
              <div className="article-content">
                <div className="article-meta">
                  <span className="date">{article.date}</span>
                  <span className="read-time">{article.readTime}</span>
                </div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <div className="article-footer">
                  <span className="author">By {article.author}</span>
                  <button className="read-more">Read More</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="newsletter-section">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for the latest water conservation news and tips.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email address" />
            <button className="subscribe-button">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsAndArticles; 