import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BuoyPNG from './assets/Buoy.png';
import SharkLinkPNG from './assets/SharkLink.png';
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
      case 'shark-link':
        return <SharkLink />
      case 'tracker':
        return <TrackerPage />
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
              <li className={currentPage === 'shark-link' ? 'active' : ''}>
                <a onClick={() => setCurrentPage('shark-link')}>Shark Link</a>
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
        <h1 className="hero-title">🦈 Shark Bait</h1>
        <p className="hero-subtitle">
          Protecting apex predators end-to-end through NASA satellite data
        </p>
        <button 
          className="cta-button"
          onClick={() => setCurrentPage('tracker')}
        >
          Launch Visual Tool →
        </button>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🛰️</div>
          <h3>NASA Data Integration</h3>
          <p>Utilizing SWOT and PACE mission data to identify suitable shark habitats</p>
          <div className="feature-badge">Satellite Data</div>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔬</div>
          <h3>An alternative framework for analyzing shark movement</h3>
          <p>Using network theory to model and analyze the interconnectivity of shark movement through hotspots such as eddy currents</p>
          <div className="feature-badge">Advanced Analytics</div>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🌍</div>
          <h3>Conservation Impact</h3>
          <p>Helping support shark conservation through Shark Link—a less invasive method for tracking shark movement</p>
          <div className="feature-badge">Global Scale</div>
        </div>
      </div>

      <div className="mission-banner" style={{marginBottom: "4rem"}}>
        <h2>🌊 Our Conservation Mission</h2>
        <p>
          Sharks play a vital role in maintaining healthy ocean ecosystems. By combining cutting-edge 
          NASA satellite technology with marine biology, our aim is to innovate with creative ideas to support shark conservation efforts.
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
          <h2>NASA Space Apps Challenge</h2>
          <p>
            The NASA Space Apps Challenge—apart of the NASA International Space Apps Challenge—is an open hackathon bringing people off different backgrounds, ages, and skill sets to collaborate on a weekend long project solving real-world problems. Our team attended the local event in Houston, TX, on October 4-5, 2025 with over 30 teams participating. The best projects will be nominated to be judged by space agency experts.
          </p>
          <a 
            href="https://www.spaceappschallenge.org/about/"
            target="_blank"
            rel="noopener noreferrer"
            className="source-link"
          >
            Learn more
          </a>
        </section>

        {/* <section className="about-section challenge-section">
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
        </section> */}

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
              <span className="tech-icon">🐍</span>
              <span>Python</span>
            </div>
            <div className="tech-item">
              <span className="tech-icon">⚙️</span>
              <span>AWS</span>
            </div>
          </div>
        </section>

        <section className="about-section impact-section">
          <h2>Ecological Impact</h2>
          <p>
            By understanding shark habitats and behavior, we can assess the ecological 
            consequences of their movements and protect the critical habitats they depend on. 
            Our solution explored ways to improve research and support shark conservation efforts through end-to-end solutions: Shark Link for data collection and Shark Bait for analysis.
          </p>
        </section>

        <section className="about-section contact-section">
          <h2>Get Involved</h2>
          <p>
            While we try to innovate on tagging technology and shark behavior analysis, there are shark conservation efforts that are putting the latest research into practice <i>right now</i>. We encourage you to explore these organizations.
          </p>
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
        </section>
      </div>
    </div>
  )
}

function TrackerPage() {

  const [activeLayer, setActiveLayer] = useState('sst');

  const layerInfo = {
    sst: {
      name: "Sea Surface Temperature",
      description: "Sea surface temperature (SST) plays a crucial role in shark habitability. Sharks can be cold-blooded or warm-blooded, and they will dive, surface, or migrate to regulate their body temperature. Increasing ocean temperatures may affect their movement patterns, and these effects can cascade throughout other ocean species.",
      source: "Data sourced from NOAA Fisheries",
      sourceUrl: "https://www.fisheries.noaa.gov/topic/marine-life-viewing-guidelines"
    },
    salinity: {
      name: "Sea Salinity",
      description: "A shark's biology makes it challenging to stay afloat in freshwaters. Researchers have found that sharks lack a swim bladder, a gas-filled room that would help make them more buoyant. Regions with preferred salinity levels can help estimate shark-inhabitable locations.",
      source: "Data sourced from Smithsonian Magazine",
      sourceUrl: "https://www.smithsonianmag.com/smart-news/heres-why-sharks-prefer-salt-water-180953985/"
    },
    bathymetry: {
      name: "Bathymetry",
      description: "Ocean depth can impact food availability, which is considered the primary reason some sharks gather in specific locations. After deep diving for a period of time, they may float up to shallower areas such as reefs to warm up.",
      source: "Information gathered from research by Copping JP and colleagues at PeerJ",
      sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5995094/"
    },
    chlorophyll: {
      name: "Chlorophyll Concentration",
      description: "Chlorophyll levels indicate the presence of phytoplankton abundance, which are the bedrock of marine life. Without accurate measures of prey availability, it's often used as a proxy to indicate their presence. Sites with high chlorophyll concentrations correlate with the presence of sharks.",
      source: "Information gathered by NASA Earth Observatory",
      sourceUrl: "https://earthobservatory.nasa.gov/features/Phytoplankton"
    }
  };

  // const sharkData = [
  //   {dataset: "ACT.BKTIP", species: "blacktip shark", scientific: "Carcharhinus limbatus", lat: 37.11138, lon: -75.702383},
  //   {dataset: "ACT.BKTIP", species: "blacktip shark", scientific: "Carcharhinus limbatus", lat: 33.88375, lon: -77.99878},
  //   {dataset: "ACT.BKTIP", species: "blacktip shark", scientific: "Carcharhinus limbatus", lat: 36.67747, lon: -75.89253},
  //   // ...more shark data...
  // ];

  return (
    <div className="tracker-page">
      {/* <div className="tracker-header">
        <h1>Shark Habitat Tracker</h1>
        <p>Explore shark locations and oceanic data in real-time</p>
      </div> */}
      <div className="tracker-container">
        <WorldWindGlobe 
          initialLatitude={20} 
          initialLongitude={0} 
          initialRange={2e7} 
          markers={sharkData}
        />
      </div>
      <div className="">
        <div className="layer-header">Diving into Characteristics of Shark Habitats</div>
        <div className="layer-info-container" style={{marginBottom: "4rem"}}>
          <nav className="layer-nav">
            {Object.entries(layerInfo).map(([key, layer]) => (
              <div
                key={key}
                className={`layer-nav-item ${activeLayer === key ? 'active' : ''}`}
                onClick={() => setActiveLayer(key)}
              >
                {layer.name}
              </div>
            ))}
          </nav>
          <div className="layer-content">
            <p className="layer-description">
              {layerInfo[activeLayer].description}
            </p>
              <a 
                href={layerInfo[activeLayer].sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="source-link"
              >
                {layerInfo[activeLayer].source}
              </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function SharkLink() {
  return (
    <div className="sharklink-page">
      <div className="" style={{maxWidth: "1200px", margin: "0 auto"}}>
        <div className="sharklink-hero">
          <h1>Shark Link</h1>
          <p className="hero-subtitle">
            Innovating in shark tagging technology with minimally invasive technology
          </p>
        </div>
        <div className="sharklink-container">
          <section className="concept-section">
            <h2>The Concept</h2>
            <p style={{paddingBottom: "1rem"}}>
              We developed a new conceptual model for a shark tracking tag that minimizes human 
              intervention and harm for the sharks while maximizing data intake and reusability. 
              While NASA satellites capture valuable environmental data, accurate field measurements 
              remain crucial for tracking sharks effectively.
            </p>
            <div className="concept-image">
              <img src={SharkLinkPNG} alt="" height={200} width={200} style={{marginTop: "1rem", borderRadius: "0.75rem"}}></img>
              {/* <div className="image-placeholder">Concept Image of Shark Link Capsule</div> */}
            </div>
          </section>

          <section className="features-section">
            <h2>Key Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <span className="feature-icon">📍</span>
                <h3>Location</h3>
                <p>Precise tracking of shark movements and migration patterns</p>
              </div>
              <div className="feature-card">
                <span className="feature-icon">🌡️</span>
                <h3>Temperature</h3>
                <p>Monitors environmental conditions and confirms proper placement</p>
              </div>
              <div className="feature-card">
                <span className="feature-icon">📊</span>
                <h3>Depth</h3>
                <p>Tracks vertical movement and diving patterns</p>
              </div>
              <div className="feature-card">
                <span className="feature-icon">🍽️</span>
                <h3>Eating Habits</h3>
                <p>Analyzes food composition and feeding patterns</p>
              </div>
            </div>
          </section>

          <section className="process-section">
            <h2>How It Works</h2>
            <div className="process-steps">
              <div className="step">
                <h3>1. Ingestion</h3>
                <p>The capsule-shaped tag is consumed by sharks naturally</p>
              </div>
              <div className="step">
                <h3>2. Data Collection</h3>
                <p>Temperature changes confirm proper placement in the shark's stomach, enabling food composition analysis</p>
              </div>
              <div className="step">
                <h3>3. Monitoring</h3>
                <p>Collects depth and movement data over several days</p>
              </div>
              <div className="step">
                <h3>4. Data Relay</h3>
                <p>Information is transmitted to surface buoys or rigs, then relayed to satellites</p>
              </div>
              <div className="step">
                <h3>5. Reusability</h3>
                <p>The tag naturally passes through the shark and floats up for reuse</p>
              </div>
            </div>
          </section>

          <section className="benefits-section">
            <h2>Benefits</h2>
            <ul className="benefits-list">
              <li>Minimally invasive tracking method</li>
              <li>Real-time data updates, even from beneath the surface</li>
              <li>Reusable design reduces environmental impact</li>
              <li>Comprehensive data collection for research</li>
              <li>Enhanced understanding of shark behavior and movements</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App