import React, { useEffect, useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import * as Cesium from '@cesium/engine';

export default function CesiumGlobe() {
  const viewerRef = useRef(null);
  const cesiumContainerRef = useRef(null);
  const [loadedLayers, setLoadedLayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cesiumReady, setCesiumReady] = useState(false);

  useEffect(() => {
    if (cesiumContainerRef.current && !viewerRef.current) {
      // Set Cesium Ion access token (using default token)
      Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWE1OWUxNy1mMWZiLTQzYjYtYTQ0OS1kMWFjYmFkNjc5YzciLCJpZCI6NTc3MzMsImlhdCI6MTYyNzg0NTE4Mn0.XcKpgANiY19MC4bdFUXMVEBToBmqS8kuYpUlxJHYZxk';

      viewerRef.current = new Cesium.Viewer(cesiumContainerRef.current, {
        terrainProvider: Cesium.Terrain.fromWorldTerrain(),
        baseLayerPicker: true,
        geocoder: false,
        homeButton: true,
        sceneModePicker: true,
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
      });
      
      setCesiumReady(true);
    }

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.kmz') && !file.name.toLowerCase().endsWith('.kml')) {
      setError('Please upload a KMZ or KML file');
      return;
    }

    if (!cesiumReady || !window.Cesium || !viewerRef.current) {
      setError('Globe is still loading. Please wait a moment and try again.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const blob = new Blob([arrayBuffer]);
      const url = URL.createObjectURL(blob);

      const dataSource = await window.Cesium.KmlDataSource.load(url, {
        camera: viewerRef.current.scene.camera,
        canvas: viewerRef.current.scene.canvas,
        clampToGround: true
      });

      await viewerRef.current.dataSources.add(dataSource);
      await viewerRef.current.zoomTo(dataSource);

      setLoadedLayers(prev => [...prev, {
        name: file.name,
        dataSource: dataSource,
        url: url
      }]);

      setLoading(false);
    } catch (err) {
      setError(`Failed to load file: ${err.message}`);
      setLoading(false);
    }

    e.target.value = '';
  };

  const removeLayer = (index) => {
    const layer = loadedLayers[index];
    if (viewerRef.current && layer.dataSource) {
      viewerRef.current.dataSources.remove(layer.dataSource);
      URL.revokeObjectURL(layer.url);
    }
    setLoadedLayers(prev => prev.filter((_, i) => i !== index));
  };

  const styles = {
    container: {
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#111827',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    header: {
      backgroundColor: '#1f2937',
      padding: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
      zIndex: 10
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'white',
      margin: 0
    },
    uploadLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      backgroundColor: loading ? '#4b5563' : '#2563eb',
      color: loading ? '#9ca3af' : 'white',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500'
    },
    uploadLabelHover: {
      backgroundColor: '#1d4ed8'
    },
    fileInput: {
      display: 'none'
    },
    errorBox: {
      marginTop: '12px',
      padding: '12px',
      backgroundColor: 'rgba(127, 29, 29, 0.5)',
      border: '1px solid #991b1b',
      borderRadius: '8px',
      color: '#fecaca',
      fontSize: '14px'
    },
    layersSection: {
      marginTop: '12px'
    },
    layersTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#d1d5db',
      marginBottom: '8px'
    },
    layersContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px'
    },
    layerChip: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: '#374151',
      padding: '6px 12px',
      borderRadius: '9999px',
      fontSize: '14px',
      color: 'white'
    },
    layerName: {
      maxWidth: '300px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    removeButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '2px',
      borderRadius: '9999px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 0.2s',
      color: 'white'
    },
    removeButtonHover: {
      backgroundColor: '#4b5563'
    },
    cesiumContainer: {
      flex: 1,
      width: '100%'
    },
    instructions: {
      position: 'absolute',
      bottom: '32px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(31, 41, 55, 0.9)',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '8px',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(8px)',
      fontSize: '14px'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>3D Globe Viewer</h1>
          <div>
            <label 
              htmlFor="kmz-upload" 
              style={{
                ...styles.uploadLabel,
                backgroundColor: (!cesiumReady || loading) ? '#4b5563' : '#2563eb',
                color: (!cesiumReady || loading) ? '#9ca3af' : 'white',
                cursor: (!cesiumReady || loading) ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={(e) => {
                if (cesiumReady && !loading) e.currentTarget.style.backgroundColor = styles.uploadLabelHover.backgroundColor;
              }}
              onMouseLeave={(e) => {
                if (cesiumReady && !loading) e.currentTarget.style.backgroundColor = styles.uploadLabel.backgroundColor;
              }}
            >
              <Upload size={20} />
              <span>{!cesiumReady ? 'Loading Globe...' : loading ? 'Loading...' : 'Load KMZ/KML'}</span>
              <input
                id="kmz-upload"
                type="file"
                accept=".kmz,.kml"
                onChange={handleFileUpload}
                disabled={!cesiumReady || loading}
                style={styles.fileInput}
              />
            </label>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div style={styles.errorBox}>
            {error}
          </div>
        )}

        {/* Loaded layers */}
        {loadedLayers.length > 0 && (
          <div style={styles.layersSection}>
            <h3 style={styles.layersTitle}>Loaded Layers:</h3>
            <div style={styles.layersContainer}>
              {loadedLayers.map((layer, index) => (
                <div key={index} style={styles.layerChip}>
                  <span style={styles.layerName}>{layer.name}</span>
                  <button
                    onClick={() => removeLayer(index)}
                    style={styles.removeButton}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = styles.removeButtonHover.backgroundColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    title="Remove layer"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cesium Container */}
      <div ref={cesiumContainerRef} style={styles.cesiumContainer} />

      {/* Instructions */}
      {loadedLayers.length === 0 && !loading && (
        <div style={styles.instructions}>
          <p style={{margin: 0}}>Click "Load KMZ/KML" to add a data layer to the globe</p>
        </div>
      )}
    </div>
  );
}