import { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Icon, Circle, Fill, Stroke } from 'ol/style';

export default function OpenLayersMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [coordinates, setCoordinates] = useState([-95.3698, 29.7604]); // Houston
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    if (!mapRef.current) return;

    // Create marker feature
    const markerFeature = new Feature({
      geometry: new Point(fromLonLat(coordinates)),
      name: 'Houston, TX'
    });

    // Style for the marker
    const markerStyle = new Style({
      image: new Circle({
        radius: 8,
        fill: new Fill({ color: '#3b82f6' }),
        stroke: new Stroke({ color: '#1e40af', width: 2 })
      })
    });

    markerFeature.setStyle(markerStyle);

    // Create vector source and layer for markers
    const vectorSource = new VectorSource({
      features: [markerFeature]
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    // Initialize the map
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      view: new View({
        center: fromLonLat(coordinates),
        zoom: zoom
      })
    });

    mapInstanceRef.current = map;

    // Click handler to get coordinates
    map.on('click', (event) => {
      const coords = map.getCoordinateAt(event.pixel);
      const lonLat = fromLonLat(coords);
      console.log('Clicked coordinates:', lonLat);
    });

    // Cleanup
    return () => {
      map.setTarget(null);
    };
  }, []);

  // Update map view when coordinates or zoom change
  useEffect(() => {
    if (mapInstanceRef.current) {
      const view = mapInstanceRef.current.getView();
      view.animate({
        center: fromLonLat(coordinates),
        zoom: zoom,
        duration: 500
      });
    }
  }, [coordinates, zoom]);

  const goToLocation = (lon, lat, name) => {
    setCoordinates([lon, lat]);
    setZoom(12);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>OpenLayers React Map</h1>
        
        {/* Quick Location Buttons */}
        <div style={styles.buttonContainer}>
          <button
            onClick={() => goToLocation(-95.3698, 29.7604, 'Houston')}
            style={styles.button}
          >
            Houston
          </button>
          <button
            onClick={() => goToLocation(-74.0060, 40.7128, 'New York')}
            style={styles.button}
          >
            New York
          </button>
          <button
            onClick={() => goToLocation(-118.2437, 34.0522, 'Los Angeles')}
            style={styles.button}
          >
            Los Angeles
          </button>
          <button
            onClick={() => goToLocation(-0.1276, 51.5074, 'London')}
            style={styles.button}
          >
            London
          </button>
        </div>

        {/* Zoom Controls */}
        <div style={styles.zoomContainer}>
          <span style={styles.zoomLabel}>Zoom: {zoom}</span>
          <button
            onClick={() => setZoom(Math.min(zoom + 1, 20))}
            style={styles.zoomButton}
          >
            +
          </button>
          <button
            onClick={() => setZoom(Math.max(zoom - 1, 1))}
            style={styles.zoomButton}
          >
            -
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div style={styles.mapWrapper}>
        <div ref={mapRef} style={styles.map} />
      </div>

      {/* Info Panel */}
      <div style={styles.footer}>
        <p style={styles.footerText}>
          <strong>Tip:</strong> Click on the map to log coordinates to the console
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f3f4f6',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '16px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '16px',
    marginTop: 0
  },
  buttonContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s'
  },
  zoomContainer: {
    marginTop: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  zoomLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151'
  },
  zoomButton: {
    padding: '4px 12px',
    backgroundColor: '#e5e7eb',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.2s'
  },
  mapWrapper: {
    flex: 1,
    position: 'relative'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  footer: {
    backgroundColor: '#ffffff',
    padding: '16px',
    boxShadow: '0 -2px 4px rgba(0,0,0,0.1)'
  },
  footerText: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0
  }
};