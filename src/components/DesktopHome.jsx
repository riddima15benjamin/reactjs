import React, { useState, useEffect } from "react";
import "./DesktopHome.css";
import { FaRegUserCircle } from "react-icons/fa"; // Font Awesome user icon
import { db } from "./firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export const DesktopHome = ({ className = "" }) => {
  const [email, setEmail] = useState("");

  const AwarenessCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slides = [
      {
        image: "/medg4.jpg",
        title: "Interactive Workshops",
        description: "Engaging educational sessions with students across Indore colleges"
      },
      {
        image: "/medg5.jpg", 
        title: "Awareness Campaigns",
        description: "Breaking taboos and spreading knowledge about sustainable menstrual health"
      },
      {
        image: "/medg6.jpg", 
        title: "Community Outreach",
        description: "Connecting with young women to promote eco-friendly solutions"
      }
    ];

    // Auto-play functionality
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
      
      return () => clearInterval(interval);
    }, [slides.length]);

    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
      setCurrentSlide(index);
    };

    return (
      <div className="awareness-carousel-container">
        <div className="carousel-wrapper">
          <div className="carousel-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((slide, index) => (
              <div key={index} className="carousel-slide">
                <img src={slide.image} alt={slide.title} />
                <div className="slide-overlay">
                  <h4>{slide.title}</h4>
                  <p>{slide.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="carousel-nav prev" onClick={prevSlide}>
            ‹
          </button>
          <button className="carousel-nav next" onClick={nextSlide}>
            ›
          </button>
          
          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const TreeCounter = () => {
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.6, // triggers when 60% visible
    });

    return (
      <div ref={ref} className="tree-counter-section">
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-number">
              {inView && <CountUp end={250} duration={3} />}K+
            </span>
            <div className="stat-label">Trees Planted</div>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {inView && <CountUp end={500} duration={3} />}T+
            </span>
            <div className="stat-label">Carbon Offset (Tons)</div>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {inView && <CountUp end={50} duration={3} />}K+
            </span>
            <div className="stat-label">Volunteers Reached</div>
          </div>
        </div>
      </div>
    );
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        await addDoc(collection(db, "newsletterSubscribers"), { email, timestamp: new Date() });
        alert("Thank you for subscribing! You will get all the latest updates directly in your inbox :)");
        setEmail("");
      } catch (error) {
        console.error("Error adding email: ", error);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Navigation handler for smooth scrolling
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const ClubNewsSection = () => {
  return (
    <>
      {/* Mobile-specific styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .news-section {
            padding: 8px 12px !important;
          }
          
          .news-container {
            max-width: 100% !important;
            margin: 0 !important;
          }
          
          .news-header h2 {
            font-size: 1.75rem !important;
            line-height: 1.2 !important;
            margin-bottom: 8px !important;
          }
          
          .news-header p {
            font-size: 0.9rem !important;
            padding: 0 8px !important;
          }
          
          .news-card {
            border-radius: 12px !important;
            padding: 12px !important;
            margin: 0 !important;
          }
          
          .news-image {
            border-radius: 8px !important;
            max-height: 400px !important;
          }
          
          .news-badge {
            bottom: 8px !important;
            left: 8px !important;
            padding: 4px 8px !important;
            font-size: 0.75rem !important;
          }
          
          .news-caption {
            margin-top: 12px !important;
            font-size: 0.8rem !important;
            padding: 0 4px !important;
            line-height: 1.4 !important;
          }
        }
        
        @media (max-width: 480px) {
          .news-section {
            padding: 6px 8px !important;
          }
          
          .news-header {
            margin-bottom: 16px !important;
          }
          
          .news-header h2 {
            font-size: 1.5rem !important;
          }
          
          .news-card {
            padding: 8px !important;
          }
          
          .news-image {
            max-height: 300px !important;
          }
          
          .news-badge {
            bottom: 6px !important;
            left: 6px !important;
            padding: 3px 6px !important;
            font-size: 0.7rem !important;
          }
        }
      `}</style>

      <section className="news-section bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div className="news-container max-w-6xl mx-auto">
          {/* Header */}
          <div className="news-header text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Club News & Updates
            </h2>
            <p className="text-gray-600">
              Latest news coverage of our club activities
            </p>
          </div>

          {/* News Image Display */}
          <div className="news-card bg-white rounded-2xl shadow-lg overflow-hidden p-6">
            <div className="relative">
              <img 
                src="C:\Users\Riddima\Documents\medgreen-website-temp\public\newspaper\news.png" 
                alt="Club News Coverage - Environmental Awareness Activities"
                className="news-image w-full h-auto rounded-lg shadow-md"
                style={{
                  maxHeight: '600px',
                  objectFit: 'contain'
                }}
              />
              <div className="news-badge absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                Press Coverage
              </div>
            </div>
            
            {/* Optional Caption */}
            <div className="news-caption mt-4 text-center">
              <p className="text-gray-600 text-sm">
                Recent newspaper coverage of our environmental awareness initiatives and community activities
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
  
  return (
    <div className={`desktop-home ${className}`}>
      {/* Navigation */}
      <nav className="navigation">
        <div className="nav-links">
          <img src="\medgreen logo.png" alt="User" className="user-image" />
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
          <a href="#discover" onClick={(e) => handleNavClick(e, 'discover')}>Discover</a>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About Us</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
        </div>
        <div className="nav-actions">
          <button className="button-danger-instance">Donate</button>
        <FaRegUserCircle
         className="user-icon"
         onClick={(e) => handleNavClick(e, 'newsletter')}
         title="Subscribe to Newsletter"
         style={{
         cursor: 'pointer',
         width: '40px',
         height: '40px', // this is what actually affects the SVG's visual size
         }}
        />
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {/* Home/Hero Section */}
        <section id="home" className="frame-1021 about-section">
          <div className="frame-1020">
            {/* Left side - Title */}
            <div className="hero-left">
              <h1 className="hero-title">
                MedGreen<br />
                Club<br />
                of Indore
              </h1>
            </div>
            
            {/* Right side - Content */}
            <div className="hero-content">
              <p>
                We are a dedicated environmental organization committed to creating a 
                sustainable future for Indore and beyond. Through community engagement, 
                tree plantation drives, and environmental awareness campaigns, we work 
                towards building a greener, healthier planet for future generations.
              </p>
              <a href="#discover">
               <button className="button">
               <span className="label">Discover Our Mission</span>
               </button>
              </a>
            </div>
          </div>
        </section>

        <footer className="image-credit">
          <p>
            <a 
              href="https://www.freepik.com/free-photo/close-up-picture-hand-holding-planting-sapling-plant_10992183.htm" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Image by jcomp on Freepik
            </a>
          </p>
        </footer>


        {/* Discover/Campaign Section */}
        <section id="discover" className="frame-1065 campaign-section">
          <div className="frame-1020">
            <h3>"Ek Ped Maa ke Naam" Campaign</h3>
            <p>
              We are proud to share that MedGreen Sanstha has been officially
              recognized for its active participation in the record-breaking
              "Apne Indore ke liye – Ek Ped Maa ke Naam" campaign, held on 14
              July 2024. This landmark event saw over{" "}
              <span className="campaign-highlight">12.41 lakh trees</span>{" "}
              planted in a single day, earning a place in the Guinness World
              Records.
              This historic achievement demonstrates the power of collective action 
              and our community's commitment to environmental conservation. Each tree 
              planted represents hope for a cleaner, greener future.
            </p>
          </div>
          <div className="campaign-image">
            <img src="/medgcert.jpg" alt="Tree Plantation Campaign" />
          </div>
          <div className="campaign-image">
            <img src="/medg2.jpg" alt="Tree Plantation Campaign" />
          </div>
          <div className="campaign-image">
            <img src="/medg3.jpg" alt="Tree Plantation Campaign" />
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="frame-1042">
          <h3>About Our Mission</h3>
          <div className="about-content">
            <p>
              The MedGreen Club of Indore was founded by doctors with a vision to transform 
              our city into a model of environmental sustainability. We believe 
              that every individual has the power to make a difference, and 
              together, we can create lasting positive change.
            </p>
            
                       <section className="frame-1065 awareness-section">
              <div className="awareness-content">
                <div className="frame-1020">
                  <h3>Spreading Awareness, One Campus at a Time</h3>
                  <p>
                    At MedGreen, our mission is to create a sustainable and informed future by advocating for
                    environmentally conscious menstrual practices. We actively visit schools and colleges across
                    Indore to engage with young girls and educate them about the benefits of using menstrual cups. 
                    By encouraging this eco-friendly and cost-effective alternative, we aim to reduce menstrual waste, 
                    break taboos surrounding menstruation, and empower girls to make informed choices for their health and the planet.
                  </p>
                </div>
                
                <AwarenessCarousel />
              </div>
            </section>
            <div className="mission-points">
              <div className="mission-point">
                <h4>Environmental Conservation</h4>
                <p>Protecting and restoring natural ecosystems through tree plantation drives and habitat preservation.</p>
              </div>
              <div className="mission-point">
                <h4>Community Education</h4>
                <p>Raising awareness about environmental issues in local schools and colleges and promoting sustainable practices.</p>
              </div>
              <div className="mission-point">
                <h4>Collaborative Action</h4>
                <p>Building partnerships with local communities, schools, and organizations to help reach our collective goal.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section id="newsletter" className="frame-1084 newsletter-section">
          <h3>Stay Connected</h3>
          <p>
            Get the latest updates on our initiatives, events, and stories of
            change, right in your inbox. Subscribe and stay connected with our
            mission to create a greener Indore.
          </p>
          <form className="email-subscription" onSubmit={handleSubscribe}>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email address"
              required
              aria-label="Email address for newsletter subscription"
            />
            <button type="submit" className="button">
              Subscribe
            </button>
          </form>
        </section>
                {/* Enhanced Tree Counter */}
        <TreeCounter />
        <ClubNewsSection />

      </main>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>MedGreen Club of Indore</h4>
            <p>Growing a greener tomorrow, one tree at a time.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a></li>
              <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About Us</a></li>
              <li><a href="#discover" onClick={(e) => handleNavClick(e, 'discover')}>Campaigns</a></li>
              <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>📧 medgreen.indore@gmail.com</p>
            <p>+91 9009703737</p>
            <p>Indore, Madhya Pradesh</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 MedGreen Club of Indore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DesktopHome;