import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import "./About.css";

const About = () => {
  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    // Observe elements
    document.querySelectorAll(
      ".about-fade-up, .mission-card, .feature-card, .stats-card, .timeline-item, .team-card"
    ).forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page">
      <Navbar />

      {/* Hero Section with Parallax */}
      <section className="about-hero">
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 20}s`
              }}
            />
          ))}
        </div>
        
        <div className="hero-gradient"></div>
        
        {/* Fixed overlay with proper z-index and background */}
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">✨</span>
              <span>Welcome to EventManager</span>
            </div>
            
            <h1 className="hero-title">
              <span className="title-line">Revolutionizing</span>
              <span className="title-line gradient-text">College Events</span>
            </h1>
            
            <p className="hero-subtitle">
              Discover a seamless platform for managing, organizing, and participating 
              in college events like never before.
            </p>

            
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="mouse"></div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="about-mission-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Our Purpose</span>
            <h2 className="section-title">Driving Event Excellence</h2>
          </div>

          <div className="mission-grid">
            <div className="mission-card about-fade-up">
              <div className="mission-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>To simplify event management in educational institutions by providing an intuitive, automated platform that connects organizers with participants seamlessly.</p>
              <div className="mission-stats">
                
              </div>
            </div>

            <div className="mission-card about-fade-up" style={{animationDelay: '0.2s'}}>
              <div className="mission-icon">👁️</div>
              <h3>Our Vision</h3>
              <p>To become the leading event management solution for colleges worldwide, fostering a vibrant community of engaged students and organized events.</p>
              <div className="mission-stats">
                
              </div>
            </div>

            <div className="mission-card about-fade-up" style={{animationDelay: '0.4s'}}>
              <div className="mission-icon">💡</div>
              <h3>Our Approach</h3>
              <p>Combining cutting-edge technology with user-centric design to create an experience that's both powerful and easy to use.</p>
              <div className="mission-stats">
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="about-features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">What We Offer</span>
            <h2 className="section-title">Powerful Features</h2>
            <p className="section-description">
              Everything you need to manage college events effectively
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card about-fade-up">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">📅</div>
                <div className="feature-icon-bg"></div>
              </div>
              <h3>Smart Scheduling</h3>
              <p>Intelligent event scheduling with conflict detection and calendar integration</p>
              <div className="feature-hover-effect"></div>
            </div>

            <div className="feature-card about-fade-up" style={{animationDelay: '0.1s'}}>
              <div className="feature-icon-wrapper">
                <div className="feature-icon">🤖</div>
                <div className="feature-icon-bg"></div>
              </div>
              <h3>AI Assistant</h3>
              <p>Get instant help and event recommendations from our intelligent chatbot</p>
              <div className="feature-hover-effect"></div>
            </div>

            <div className="feature-card about-fade-up" style={{animationDelay: '0.2s'}}>
              <div className="feature-icon-wrapper">
                <div className="feature-icon">📊</div>
                <div className="feature-icon-bg"></div>
              </div>
              <h3>Analytics Dashboard</h3>
              <p>Real-time insights into event participation and engagement metrics</p>
              <div className="feature-hover-effect"></div>
            </div>

            <div className="feature-card about-fade-up" style={{animationDelay: '0.3s'}}>
              <div className="feature-icon-wrapper">
                <div className="feature-icon">🎫</div>
                <div className="feature-icon-bg"></div>
              </div>
              <h3>Digital Certificates</h3>
              <p>Auto-generated certificates with QR verification for authenticity</p>
              <div className="feature-hover-effect"></div>
            </div>

            <div className="feature-card about-fade-up" style={{animationDelay: '0.4s'}}>
              <div className="feature-icon-wrapper">
                <div className="feature-icon">📧</div>
                <div className="feature-icon-bg"></div>
              </div>
              <h3>Email Automation</h3>
              <p>Automated notifications and reminders for all registered events</p>
              <div className="feature-hover-effect"></div>
            </div>

            <div className="feature-card about-fade-up" style={{animationDelay: '0.5s'}}>
              <div className="feature-icon-wrapper">
                <div className="feature-icon">⏰</div>
                <div className="feature-icon-bg"></div>
              </div>
              <h3>Smart Attendance</h3>
              <p>Time-based attendance tracking with automatic marking system</p>
              <div className="feature-hover-effect"></div>
            </div>
          </div>
        </div>
      </section>

      


      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your College Events?</h2>
            <p>Join thousands of students and organizers already using our platform</p>
            <div className="cta-buttons">
              <a href="/student-register" className="cta-button primary">
                <span>Get Started Now</span>
                <span className="button-icon">→</span>
              </a>
              <a href="/student-events" className="cta-button secondary">
                <span>Explore Events</span>
                <span className="button-icon">🔍</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;