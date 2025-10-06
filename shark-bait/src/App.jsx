import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import OpenLayersMap from './components/OpenLayersMap'
import WorldWindGlobe from './components/WorldWind';
import CesiumGlobe from './components/CesiumGlobe'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [darkMode, setDarkMode] = useState(true)

  const markers = [
    { id: 'nyc', latitude: 40.7128, longitude: -74.0060, label: 'New York' },
  ];

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} darkMode={darkMode} />
      case 'tracker':
        return <WorldWindGlobe initialLatitude={20} initialLongitude={0} initialRange={2e7} markers={markers} />
        // return <CesiumGlobe></CesiumGlobe>
      case 'about':
        return <AboutPage darkMode={darkMode} />
      default:
        return <HomePage setCurrentPage={setCurrentPage} darkMode={darkMode} />
    }
  }

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">🦈</span>
            <span className="logo-text">Shark Bait</span>
          </div>
          <div className="nav-right">
            <ul className="nav-menu">
              <li className={currentPage === 'home' ? 'active' : ''}>
                <a onClick={() => setCurrentPage('home')}>Home</a>
              </li>
              <li className={currentPage === 'tracker' ? 'active' : ''}>
                <a onClick={() => setCurrentPage('tracker')}>Tracker</a>
              </li>
              <li className={currentPage === 'about' ? 'active' : ''}>
                <a onClick={() => setCurrentPage('about')}>About</a>
              </li>
            </ul>
            <button className="theme-toggle" onClick={toggleTheme} title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>
      <div className="page-content">
        {renderPage()}
      </div>
      {/* {darkMode && <div className="underwater-effect"></div>} */}
    </div>
  )
}

function HomePage({ setCurrentPage, darkMode }) {
  return (
    <div className="home-page">
      {/* {darkMode && (
        <>
          <div className="ocean-waves">
            <div className="wave wave1"></div>
            <div className="wave wave2"></div>
            <div className="wave wave3"></div>
          </div>
          <div className="light-rays">
            <div className="ray ray1"></div>
            <div className="ray ray2"></div>
            <div className="ray ray3"></div>
            <div className="ray ray4"></div>
          </div>
          <div className="bubbles">
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
          </div>
        </>
      )} */}
      
      <div className="hero-section">
        <h1 className="hero-title">🦈 Shark Habitat Tracker</h1>
        <p className="hero-subtitle">
          Protecting apex predators through NASA satellite data
        </p>
        <button 
          className="cta-button"
          onClick={() => setCurrentPage('tracker')}
        >
          Launch Visual Tool →
        </button>
        
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number">4</div>
            <div className="stat-label">Tracked Locations</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">2</div>
            <div className="stat-label">NASA Missions</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Real-Time Data</div>
          </div>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🛰️</div>
          <h3>NASA Data Integration</h3>
          <p>Utilizing SWOT and PACE mission data to track ocean eddies and phytoplankton communities</p>
          <div className="feature-badge">Satellite Data</div>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🌊</div>
          <h3>Foraging Hotspots</h3>
          <p>Identify critical shark feeding areas and predict habitat use patterns in real-time</p>
          <div className="feature-badge">AI Powered</div>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔬</div>
          <h3>Predictive Modeling</h3>
          <p>Using network theory to model and analyze the interconnectedness of shark movement through hotspots such as eddy currents</p>
          <div className="feature-badge">Advanced Analytics</div>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🌍</div>
          <h3>Conservation Impact</h3>
          <p>Support marine ecosystem health by protecting crucial shark habitats worldwide</p>
          <div className="feature-badge">Global Scale</div>
        </div>
      </div>

      <div className="mission-banner">
        <h2>🌊 Our Conservation Mission</h2>
        <p>
          Sharks play a vital role in maintaining healthy ocean ecosystems. By combining cutting-edge 
          NASA satellite technology with marine biology, we're proposing alternative mathematical frameworks for helping these magnificent 
          apex predators for future generations.
        </p>
        <button className="secondary-cta" onClick={() => setCurrentPage('about')}>
          Learn More About Our Work
        </button>
      </div>
    </div>
  )
}

function AboutPage({ darkMode }) {
  return (
    <div className="about-page">
      {/* {darkMode && (
        <>
          <div className="light-rays">
            <div className="ray ray1"></div>
            <div className="ray ray2"></div>
            <div className="ray ray3"></div>
          </div>
          <div className="bubbles">
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
          </div>
        </>
      )} */}
      <div className="about-container">
        {/* <div className="about-hero">
          <h1>🦈 Shark Habitat Tracker</h1>
          <p className="about-tagline">
            Protecting apex predators through NASA satellite data and predictive modeling
          </p>
        </div> */}
        
        <section className="about-section mission-section">
          <h2>Our Mission</h2>
          <p>
            Earth's ocean is one of the most powerful habitats in our universe, supporting a range 
            of life that sustains ecosystems and habitability across the globe. Sharks are important 
            apex predators, regulating prey levels and ensuring species diversity needed for healthy 
            ecosystems. However, sharks are facing unprecedented fishing pressure.
          </p>
          <p>
            Our mission is to create a mathematical framework for identifying sharks and predicting 
            their foraging habitats using NASA satellite data, enabling the protection of crucial 
            shark habitats and supporting marine conservation efforts worldwide.
          </p>
        </section>

        <section className="about-section challenge-section">
          <h2>The Challenge</h2>
          <p>
            While it is common to measure photosynthetic activity in the ocean from space, it is 
            far more challenging to track top predators. Our platform addresses this by:
          </p>
          <ul className="about-list">
            <li>Identifying foraging hotspots using satellite data</li>
            <li>Quantifying ecological links between physical oceanographic features and predator movements</li>
            <li>Tracking phytoplankton communities and their relationship to shark behavior</li>
            <li>Developing predictive models for shark habitat protection</li>
          </ul>
        </section>

        <section className="about-section data-section">
          <h2>NASA Data Integration</h2>
          <div className="data-sources">
            <div className="data-card">
              <div className="data-icon">🛰️</div>
              <h3>SWOT Mission</h3>
              <p>Surface Water and Ocean Topography data helps us track ocean eddies where sharks may choose to live</p>
            </div>
            <div className="data-card">
              <div className="data-icon">🌊</div>
              <h3>PACE Mission</h3>
              <p>Plankton, Aerosols, Clouds, and Ecosystems mission provides crucial phytoplankton tracking</p>
            </div>
          </div>
        </section>

        <section className="about-section science-section">
          <h2>The Science</h2>
          <p>
            There are several trophic steps (steps in the food chain) between phytoplankton 
            and sharks. Our mathematical model accounts for:
          </p>
          <div className="science-factors">
            <div className="factor-item">
              <span className="factor-icon">🌡️</span>
              <div>
                <strong>Temperature Effects</strong>
                <p>Understanding how water temperature influences shark behavior and habitat selection</p>
              </div>
            </div>
            <div className="factor-item">
              <span className="factor-icon">📊</span>
              <div>
                <strong>Depth Patterns</strong>
                <p>Modeling when sharks are at the surface versus deeper in the ocean</p>
              </div>
            </div>
            <div className="factor-item">
              <span className="factor-icon">🔬</span>
              <div>
                <strong>Trophic Links</strong>
                <p>Connecting phytoplankton data to apex predator foraging behavior</p>
              </div>
            </div>
            <div className="factor-item">
              <span className="factor-icon">🌀</span>
              <div>
                <strong>Ocean Eddies</strong>
                <p>Identifying circular currents that concentrate prey and attract sharks</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section innovation-section">
          <h2>Next-Generation Tagging</h2>
          <p>
            We're developing a conceptual model for advanced shark tags that measure not only 
            where sharks are, but also what they are eating, transmitting real-time data to 
            enable development of predictive models for conservation.
          </p>
        </section>

        <section className="about-section tech-section">
          <h2>Technology Stack</h2>
          <div className="tech-stack">
            <div className="tech-item">
              <span className="tech-icon">⚛️</span>
              <span>React</span>
            </div>
            <div className="tech-item">
              <span className="tech-icon">🗺️</span>
              <span>OpenLayers</span>
            </div>
            <div className="tech-item">
              <span className="tech-icon">🛰️</span>
              <span>NASA SWOT</span>
            </div>
            <div className="tech-item">
              <span className="tech-icon">🌊</span>
              <span>NASA PACE</span>
            </div>
          </div>
        </section>

        <section className="about-section impact-section">
          <h2>Ecological Impact</h2>
          <p>
            By understanding shark locations and behavior, we can assess the ecological 
            consequences of their movements and protect the critical habitats they depend on. 
            This work is essential for maintaining healthy marine ecosystems and ensuring 
            species diversity for future generations.
          </p>
        </section>

        <section className="about-section contact-section">
          <h2>Get Involved</h2>
          <p>
            Ready to explore shark habitats? Head to the Tracker page to view real-time data 
            and predictive models. Together, we can protect these magnificent apex predators 
            and the ecosystems they support.
          </p>
          
          <div className="conservation-links">
            <h3>Support Shark Conservation</h3>
            <div className="org-grid">
              <a href="https://www.sharks.org/" target="_blank" rel="noopener noreferrer" className="org-link">
                <span className="org-icon">🦈</span>
                <div className="org-info">
                  <h4>Shark Research Institute</h4>
                  <p>Global shark research and conservation programs</p>
                </div>
              </a>
              <a href="https://www.projectaware.org/" target="_blank" rel="noopener noreferrer" className="org-link">
                <span className="org-icon">🌊</span>
                <div className="org-info">
                  <h4>Project AWARE</h4>
                  <p>Ocean conservation through diver community action</p>
                </div>
              </a>
              <a href="https://www.sharkstewards.org/" target="_blank" rel="noopener noreferrer" className="org-link">
                <span className="org-icon">🛡️</span>
                <div className="org-info">
                  <h4>Shark Stewards</h4>
                  <p>Protecting sharks through science and advocacy</p>
                </div>
              </a>
              <a href="https://www.sharktrust.org/" target="_blank" rel="noopener noreferrer" className="org-link">
                <span className="org-icon">🔬</span>
                <div className="org-info">
                  <h4>Shark Trust</h4>
                  <p>Scientific research and shark conservation initiatives</p>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App