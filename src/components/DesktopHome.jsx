import React, { useState } from "react";
import "./DesktopHome.css";
import { FaRegUserCircle } from "react-icons/fa"; // Font Awesome user icon
import { db } from "./firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export const DesktopHome = ({ className = "" }) => {
  const [email, setEmail] = useState("");

  // Enhanced Tree Counter Component with Multiple Stats
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
              The MedGreen Club of Indore was founded by doctors of Indore with a vision to transform 
              our city into a model of environmental sustainability. We believe 
              that every individual has the power to make a difference, and 
              together, we can create lasting positive change.
            </p>
            
            <section id="discover" className="frame-1065 campaign-section">
          <div className="frame-1020">
            <h3>"name here"</h3>
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
          <p>&copy; 2024 MedGreen Club of Indore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DesktopHome;