import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Home.css";

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    // Mouse move parallax effect
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    // Scroll reveal animation
    const handleScroll = () => {
      const statsElement = statsRef.current;
      if (statsElement) {
        const statsPosition = statsElement.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (statsPosition < screenPosition) {
          statsElement.classList.add('stats-visible');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar />
      
      <div className="home-wrapper">
        {/* Animated Background Particles */}
        <div className="particle-background">
          {[...Array(50)].map((_, i) => (
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

        {/* Gradient Orbs */}
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>

        {/* Main Hero Section */}
        <section className="hero-section" ref={heroRef}>
          <div className="container-fluid m-4 mt-5">
            <div className="hero-grid">
              {/* Left Content */}
              <div className={`hero-content ${isVisible ? 'animate' : ''}`}>
                <div className="hero-badge">
                  <span className="badge-icon">✨</span>
                  <span className="badge-text">College Event Management System</span>
                </div>

                <h1 className="hero-title">
                  <span className="title-line">
                    <span className="gradient-text">Create Memories</span>
                  </span>
                  <span className="title-line">
                    <span>That Last Forever</span>
                   
                  </span>
                </h1>

                <p className="hero-description">
                  Discover, register, and participate in amazing college events. 
                  From cultural fests to technical workshops, we've got it all!
                </p>

                {/* Feature List */}
                <div className="feature-list">
                  <div className="feature-item">
                    <div className="feature-icon">🎯</div>
                    <div className="feature-text">Easy Registration</div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">🚀</div>
                    <div className="feature-text">Real-time Updates</div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">🎫</div>
                    <div className="feature-text">Digital Certificates</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="cta-group">
                  <Link to="/student-register" className="cta-primary">
                    <span>Get Started</span>
                    <svg className="arrow-icon" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>

                  <Link to="/student-events" className="cta-secondary">
                    <span>Explore Events</span>
                    <svg className="explore-icon" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </Link>
                </div>

                
              </div>

              {/* Right Content - Animated Illustration */}
              <div className="hero-visual">
                <div className="floating-card card-1" style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}>
                  <div className="card-icon">🎪</div>
                  <div className="card-info">
                    <h4>Cultural Fest</h4>
                    
                  </div>
                </div>

                <div className="floating-card card-2" style={{ transform: `translate(${-mousePosition.x * 0.5}px, ${-mousePosition.y * 0.5}px)` }}>
                  <div className="card-icon">💻</div>
                  <div className="card-info">
                    <h4>Hackathon 2024</h4>
                    
                  </div>
                </div>

                <div className="floating-card card-3" style={{ transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.8}px)` }}>
                  <div className="card-icon">🏆</div>
                  <div className="card-info">
                    <h4>Sports Meet</h4>
                    
                  </div>
                </div>

                <div className="pulse-circle"></div>
                <div className="pulse-circle delay-1"></div>
                <div className="pulse-circle delay-2"></div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="scroll-indicator">
            <div className="scroll-line"></div>
            <span>Scroll to explore</span>
          </div>
        </section>

      

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                Everything You Need in
                <span className="gradient-text"> One Platform</span>
              </h2>
              <p className="section-subtitle">
                Streamlined event management with powerful features for both students and organizers
              </p>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-card-icon">📅</div>
                <h3>Smart Scheduling</h3>
                <p>Intelligent event scheduling with conflict detection and calendar integration</p>
                <div className="feature-card-hover">
                  <span>Learn more →</span>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-card-icon">🤖</div>
                <h3>AI Chatbot Assistant</h3>
                <p>Get event tips, preparation guides, and instant answers 24/7</p>
                <div className="feature-card-hover">
                  <span>Learn more →</span>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-card-icon">📧</div>
                <h3>Automated Emails</h3>
                <p>Instant notifications and reminders for all your registered events</p>
                <div className="feature-card-hover">
                  <span>Learn more →</span>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-card-icon">🎫</div>
                <h3>Digital Certificates</h3>
                <p>Auto-generated certificates with QR verification for authenticity</p>
                <div className="feature-card-hover">
                  <span>Learn more →</span>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-card-icon">⏰</div>
                <h3>Smart Attendance</h3>
                <p>Time-based attendance tracking with automatic marking system</p>
                <div className="feature-card-hover">
                  <span>Learn more →</span>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-card-icon">📊</div>
                <h3>Analytics Dashboard</h3>
                <p>Real-time insights into event participation and engagement</p>
                <div className="feature-card-hover">
                  <span>Learn more →</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Make Your College Life Memorable?</h2>
              <p>Join thousands of students already participating in amazing events</p>
              <Link to="/student-register" className="cta-glow-button">
                <span>Get Started Now</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;