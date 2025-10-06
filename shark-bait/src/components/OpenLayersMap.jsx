// // import { useEffect, useRef, useState } from 'react';
// // import 'ol/ol.css';
// // import Map from 'ol/Map';
// // import View from 'ol/View';
// // import TileLayer from 'ol/layer/Tile';
// // import OSM from 'ol/source/OSM';
// // import { fromLonLat } from 'ol/proj';
// // import { Feature } from 'ol';
// // import { Point } from 'ol/geom';
// // import VectorLayer from 'ol/layer/Vector';
// // import VectorSource from 'ol/source/Vector';
// // import { Style, Icon, Circle, Fill, Stroke } from 'ol/style';

// // export default function OpenLayersMap() {
// //   const mapRef = useRef(null);
// //   const mapInstanceRef = useRef(null);
// //   const [coordinates, setCoordinates] = useState([-95.3698, 29.7604]); // Houston
// //   const [zoom, setZoom] = useState(10);

// //   useEffect(() => {
// //     if (!mapRef.current) return;

// //     // Create marker feature
// //     const markerFeature = new Feature({
// //       geometry: new Point(fromLonLat(coordinates)),
// //       name: 'Houston, TX'
// //     });

// //     // Style for the marker
// //     const markerStyle = new Style({
// //       image: new Circle({
// //         radius: 8,
// //         fill: new Fill({ color: '#3b82f6' }),
// //         stroke: new Stroke({ color: '#1e40af', width: 2 })
// //       })
// //     });

// //     markerFeature.setStyle(markerStyle);

// //     // Create vector source and layer for markers
// //     const vectorSource = new VectorSource({
// //       features: [markerFeature]
// //     });

// //     const vectorLayer = new VectorLayer({
// //       source: vectorSource
// //     });

// //     // Initialize the map
// //     const map = new Map({
// //       target: mapRef.current,
// //       layers: [
// //         new TileLayer({
// //           source: new OSM()
// //         }),
// //         vectorLayer
// //       ],
// //       view: new View({
// //         center: fromLonLat(coordinates),
// //         zoom: zoom
// //       })
// //     });

// //     mapInstanceRef.current = map;

// //     // Click handler to get coordinates
// //     map.on('click', (event) => {
// //       const coords = map.getCoordinateAt(event.pixel);
// //       const lonLat = fromLonLat(coords);
// //       console.log('Clicked coordinates:', lonLat);
// //     });

// //     // Cleanup
// //     return () => {
// //       map.setTarget(null);
// //     };
// //   }, []);

// //   // Update map view when coordinates or zoom change
// //   useEffect(() => {
// //     if (mapInstanceRef.current) {
// //       const view = mapInstanceRef.current.getView();
// //       view.animate({
// //         center: fromLonLat(coordinates),
// //         zoom: zoom,
// //         duration: 500
// //       });
// //     }
// //   }, [coordinates, zoom]);

// //   const goToLocation = (lon, lat, name) => {
// //     setCoordinates([lon, lat]);
// //     setZoom(12);
// //   };

// //   return (
// //     <div style={styles.container}>
// //       {/* Header */}
// //       <div style={styles.header}>
// //         <h1 style={styles.title}>OpenLayers React Map</h1>
        
// //         {/* Quick Location Buttons */}
// //         <div style={styles.buttonContainer}>
// //           <button
// //             onClick={() => goToLocation(-95.3698, 29.7604, 'Houston')}
// //             style={styles.button}
// //           >
// //             Houston
// //           </button>
// //           <button
// //             onClick={() => goToLocation(-74.0060, 40.7128, 'New York')}
// //             style={styles.button}
// //           >
// //             New York
// //           </button>
// //           <button
// //             onClick={() => goToLocation(-118.2437, 34.0522, 'Los Angeles')}
// //             style={styles.button}
// //           >
// //             Los Angeles
// //           </button>
// //           <button
// //             onClick={() => goToLocation(-0.1276, 51.5074, 'London')}
// //             style={styles.button}
// //           >
// //             London
// //           </button>
// //         </div>

// //         {/* Zoom Controls */}
// //         <div style={styles.zoomContainer}>
// //           <span style={styles.zoomLabel}>Zoom: {zoom}</span>
// //           <button
// //             onClick={() => setZoom(Math.min(zoom + 1, 20))}
// //             style={styles.zoomButton}
// //           >
// //             +
// //           </button>
// //           <button
// //             onClick={() => setZoom(Math.max(zoom - 1, 1))}
// //             style={styles.zoomButton}
// //           >
// //             -
// //           </button>
// //         </div>
// //       </div>

// //       {/* Map Container */}
// //       <div style={styles.mapWrapper}>
// //         <div ref={mapRef} style={styles.map} />
// //       </div>

// //       {/* Info Panel */}
// //       <div style={styles.footer}>
// //         <p style={styles.footerText}>
// //           <strong>Tip:</strong> Click on the map to log coordinates to the console
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // const styles = {
// //   container: {
// //     display: 'flex',
// //     flexDirection: 'column',
// //     height: '100vh',
// //     backgroundColor: '#f3f4f6',
// //     fontFamily: 'Arial, sans-serif'
// //   },
// //   header: {
// //     backgroundColor: '#ffffff',
// //     boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
// //     padding: '16px'
// //   },
// //   title: {
// //     fontSize: '24px',
// //     fontWeight: 'bold',
// //     color: '#1f2937',
// //     marginBottom: '16px',
// //     marginTop: 0
// //   },
// //   buttonContainer: {
// //     display: 'flex',
// //     flexWrap: 'wrap',
// //     gap: '8px'
// //   },
// //   button: {
// //     padding: '8px 16px',
// //     backgroundColor: '#3b82f6',
// //     color: '#ffffff',
// //     border: 'none',
// //     borderRadius: '4px',
// //     cursor: 'pointer',
// //     fontSize: '14px',
// //     transition: 'background-color 0.2s'
// //   },
// //   zoomContainer: {
// //     marginTop: '16px',
// //     display: 'flex',
// //     alignItems: 'center',
// //     gap: '16px'
// //   },
// //   zoomLabel: {
// //     fontSize: '14px',
// //     fontWeight: '500',
// //     color: '#374151'
// //   },
// //   zoomButton: {
// //     padding: '4px 12px',
// //     backgroundColor: '#e5e7eb',
// //     border: 'none',
// //     borderRadius: '4px',
// //     cursor: 'pointer',
// //     fontSize: '16px',
// //     transition: 'background-color 0.2s'
// //   },
// //   mapWrapper: {
// //     flex: 1,
// //     position: 'relative'
// //   },
// //   map: {
// //     position: 'absolute',
// //     top: 0,
// //     left: 0,
// //     right: 0,
// //     bottom: 0
// //   },
// //   footer: {
// //     backgroundColor: '#ffffff',
// //     padding: '16px',
// //     boxShadow: '0 -2px 4px rgba(0,0,0,0.1)'
// //   },
// //   footerText: {
// //     fontSize: '14px',
// //     color: '#6b7280',
// //     margin: 0
// //   }
// // };

// import { useEffect, useRef, useState } from 'react';
// import 'ol/ol.css';
// import Map from 'ol/Map';
// import View from 'ol/View';
// import TileLayer from 'ol/layer/Tile';
// import OSM from 'ol/source/OSM';
// import { fromLonLat } from 'ol/proj';
// import { Feature } from 'ol';
// import { Point } from 'ol/geom';
// import VectorLayer from 'ol/layer/Vector';
// import VectorSource from 'ol/source/Vector'
// import { Style, Circle, Fill, Stroke } from 'ol/style';

// export default function SharkTrackingMap() {
//   const mapRef = useRef(null);
//   const mapInstanceRef = useRef(null);
//   const [selectedShark, setSelectedShark] = useState(null);
//   const [zoom, setZoom] = useState(2);

  // // Shark tracking data
  // const sharkData = [
  //   {dataset: "ACT.BKTIP", species: "blacktip shark", scientific: "Carcharhinus limbatus", lat: 37.11138, lon: -75.702383},
  //   {dataset: "ACT.BKTIP", species: "blacktip shark", scientific: "Carcharhinus limbatus", lat: 33.88375, lon: -77.99878},
  //   {dataset: "ACT.BKTIP", species: "blacktip shark", scientific: "Carcharhinus limbatus", lat: 36.67747, lon: -75.89253},
  //   {dataset: "ACT.BULLS", species: "bull shark", scientific: "Carcharhinus leucas", lat: 32.4354, lon: -80.3879},
  //   {dataset: "ACT.BULLS", species: "bull shark", scientific: "Carcharhinus leucas", lat: 35.40852, lon: -76.0107},
  //   {dataset: "ACT.BULLS", species: "bull shark", scientific: "Carcharhinus leucas", lat: 32.4354, lon: -80.3879},
  //   {dataset: "ACT.BULLS", species: "bull shark", scientific: "Carcharhinus leucas", lat: 35.6017, lon: -75.865},
  //   {dataset: "SAF.POZS", species: "bull shark / Zambezi shark", scientific: "Carcharhinus leucas", lat: 32.9, lon: -26.84},
  //   {dataset: "SAF.POZS", species: "bull shark / Zambezi shark", scientific: "Carcharhinus leucas", lat: 32.93627778, lon: -26.75558333},
  //   {dataset: "SAF.POZS", species: "bull shark / Zambezi shark", scientific: "Carcharhinus leucas", lat: 32.93784, lon: -26.75198},
  //   {dataset: "SAF.POZS", species: "bull shark / Zambezi shark", scientific: "Carcharhinus leucas", lat: 30.82757, lon: -30.24398},
  //   {dataset: "SAF.POZS", species: "tiger shark", scientific: "Galeocerdo cuvier", lat: 32.9, lon: -26.84},
  //   {dataset: "SAF.POZS", species: "tiger shark", scientific: "Galeocerdo cuvier", lat: 32.83314, lon: -27.15556},
  //   {dataset: "SAF.POZS", species: "tiger shark", scientific: "Galeocerdo cuvier", lat: 32.93784, lon: -26.75198},
  //   {dataset: "SAF.POZS", species: "tiger shark", scientific: "Galeocerdo cuvier", lat: 32.93627778, lon: -26.75558333},
  //   {dataset: "SAF.POZS", species: "tiger shark", scientific: "Galeocerdo cuvier", lat: 32.9297, lon: -26.78906},
  //   {dataset: "SAF.SSST", species: "white shark", scientific: "Carcharodon carcharias", lat: 20.05003, lon: -34.77177},
  //   {dataset: "SAF.SSST", species: "white shark", scientific: "Carcharodon carcharias", lat: 18.57027, lon: -34.12312},
  //   {dataset: "SAF.SSST", species: "white shark", scientific: "Carcharodon carcharias", lat: 19.41861, lon: -34.62888},
  //   {dataset: "SAF.SSST", species: "white shark", scientific: "Carcharodon carcharias", lat: 18.623945, lon: -34.079114},
  //   {dataset: "SAF.SSST", species: "white shark", scientific: "Carcharodon carcharias", lat: 18.589669, lon: -34.132669},
  //   {dataset: "SAF.SSST", species: "smoothhound shark", scientific: "Mustelus mustelus", lat: 18.68783, lon: -34.07671},
  //   {dataset: "SAF.SSST", species: "sevengill shark", scientific: "Notorynchus cepedianus", lat: 18.397383, lon: -33.82125},
  //   {dataset: "SAF.SSST", species: "sevengill shark", scientific: "Notorynchus cepedianus", lat: 18.57027, lon: -34.12312},
  //   {dataset: "SAF.SSST", species: "sevengill shark", scientific: "Notorynchus cepedianus", lat: 18.518072, lon: -34.349615}
  // ];

//   // Color mapping by species
//   const getColorForSpecies = (species) => {
//     const lower = species.toLowerCase();
//     if (lower.includes('white')) return '#ff4444';
//     if (lower.includes('tiger')) return '#ff8800';
//     if (lower.includes('bull') || lower.includes('zambezi')) return '#4444ff';
//     if (lower.includes('blacktip')) return '#00aa00';
//     if (lower.includes('sevengill')) return '#aa00aa';
//     return '#888888';
//   };

//   useEffect(() => {
//     if (!mapRef.current) return;

//     // Create features from shark data
//     const features = sharkData.map((shark, idx) => {
//       const feature = new Feature({
//         geometry: new Point(fromLonLat([shark.lon, shark.lat])),
//         species: shark.species,
//         scientific: shark.scientific,
//         dataset: shark.dataset,
//         latitude: shark.lat,
//         longitude: shark.lon,
//         id: idx
//       });

//       const color = getColorForSpecies(shark.species);
      
//       feature.setStyle(new Style({
//         image: new Circle({
//           radius: 7,
//           fill: new Fill({ color: color }),
//           stroke: new Stroke({ color: '#ffffff', width: 2 })
//         })
//       }));

//       return feature;
//     });

//     // Create vector source and layer for markers
//     const vectorSource = new VectorSource({
//       features: features
//     });

//     const vectorLayer = new VectorLayer({
//       source: vectorSource
//     });

//     // Initialize the map
//     const map = new Map({
//       target: mapRef.current,
//       layers: [
//         new TileLayer({
//           source: new OSM()
//         }),
//         vectorLayer
//       ],
//       view: new View({
//         center: fromLonLat([0, 0]),
//         zoom: zoom
//       })
//     });

//     // Fit map to show all markers
//     const extent = vectorSource.getExtent();
//     map.getView().fit(extent, { padding: [50, 50, 50, 50], maxZoom: 10 });

//     mapInstanceRef.current = map;

//     // Click handler to show shark details
//     map.on('click', (event) => {
//       const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => feature);
      
//       if (feature) {
//         setSelectedShark({
//           species: feature.get('species'),
//           scientific: feature.get('scientific'),
//           dataset: feature.get('dataset'),
//           latitude: feature.get('latitude'),
//           longitude: feature.get('longitude')
//         });
//       } else {
//         setSelectedShark(null);
//       }
//     });

//     // Change cursor on hover
//     map.on('pointermove', (event) => {
//       const pixel = map.getEventPixel(event.originalEvent);
//       const hit = map.hasFeatureAtPixel(pixel);
//       map.getTarget().style.cursor = hit ? 'pointer' : '';
//     });

//     // Cleanup
//     return () => {
//       map.setTarget(null);
//     };
//   }, []);

//   // Update map view when zoom changes
//   useEffect(() => {
//     if (mapInstanceRef.current) {
//       const view = mapInstanceRef.current.getView();
//       view.animate({
//         zoom: zoom,
//         duration: 500
//       });
//     }
//   }, [zoom]);

//   const goToShark = (shark) => {
//     if (mapInstanceRef.current) {
//       const view = mapInstanceRef.current.getView();
//       view.animate({
//         center: fromLonLat([shark.lon, shark.lat]),
//         zoom: 8,
//         duration: 1000
//       });
//       setSelectedShark({
//         species: shark.species,
//         scientific: shark.scientific,
//         dataset: shark.dataset,
//         latitude: shark.lat,
//         longitude: shark.lon
//       });
//     }
//   };

//   const resetView = () => {
//     if (mapInstanceRef.current) {
//       const vectorSource = mapInstanceRef.current.getLayers().getArray()[1].getSource();
//       const extent = vectorSource.getExtent();
//       mapInstanceRef.current.getView().fit(extent, { padding: [50, 50, 50, 50], maxZoom: 10, duration: 1000 });
//       setSelectedShark(null);
//     }
//   };

//   // Get unique species for quick access buttons
//   const uniqueSpecies = [...new Set(sharkData.map(s => s.species))];

//   return (
//     <div style={styles.container}>
//       {/* Header */}
//       <div style={styles.header}>
//         <h1 style={styles.title}>Shark Tracking Map</h1>
        
//         {/* Quick Species Buttons */}
//         <div style={styles.buttonContainer}>
//           <button onClick={resetView} style={styles.resetButton}>
//             Show All
//           </button>
//           {uniqueSpecies.slice(0, 5).map((species) => {
//             const firstShark = sharkData.find(s => s.species === species);
//             return (
//               <button
//                 key={species}
//                 onClick={() => goToShark(firstShark)}
//                 style={{...styles.button, backgroundColor: getColorForSpecies(species)}}
//               >
//                 {species}
//               </button>
//             );
//           })}
//         </div>

//         {/* Zoom Controls */}
//         <div style={styles.zoomContainer}>
//           <span style={styles.zoomLabel}>Zoom: {zoom}</span>
//           <button
//             onClick={() => setZoom(Math.min(zoom + 1, 20))}
//             style={styles.zoomButton}
//           >
//             +
//           </button>
//           <button
//             onClick={() => setZoom(Math.max(zoom - 1, 1))}
//             style={styles.zoomButton}
//           >
//             -
//           </button>
//         </div>
//       </div>

//       {/* Map Container */}
//       <div style={styles.mapWrapper}>
//         <div ref={mapRef} style={styles.map} />
        
//         {/* Legend */}
//         <div style={styles.legend}>
//           <div style={styles.legendTitle}>Species Legend</div>
//           {uniqueSpecies.map(species => (
//             <div key={species} style={styles.legendItem}>
//               <div style={{...styles.legendColor, backgroundColor: getColorForSpecies(species)}} />
//               <span style={styles.legendText}>{species}</span>
//             </div>
//           ))}
//         </div>

//         {/* Selected Shark Info Panel */}
//         {selectedShark && (
//           <div style={styles.infoPanel}>
//             <button onClick={() => setSelectedShark(null)} style={styles.closeButton}>×</button>
//             <div style={styles.infoSpecies}>{selectedShark.species}</div>
//             <div style={styles.infoScientific}>{selectedShark.scientific}</div>
//             <div style={styles.infoCoords}>
//               <strong>Location:</strong><br />
//               Lat: {selectedShark.latitude.toFixed(4)}°<br />
//               Lon: {selectedShark.longitude.toFixed(4)}°
//             </div>
//             <div style={styles.infoDataset}>
//               <strong>Dataset:</strong> {selectedShark.dataset}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Info Footer */}
//       <div style={styles.footer}>
//         <p style={styles.footerText}>
//           <strong>Tip:</strong> Click on any marker to view shark tracking details. {sharkData.length} total tracking points displayed.
//         </p>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     height: '100vh',
//     backgroundColor: '#f3f4f6',
//     fontFamily: 'Arial, sans-serif'
//   },
//   header: {
//     backgroundColor: '#ffffff',
//     boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//     padding: '16px'
//   },
//   title: {
//     fontSize: '24px',
//     fontWeight: 'bold',
//     color: '#1f2937',
//     marginBottom: '16px',
//     marginTop: 0
//   },
//   buttonContainer: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     gap: '8px'
//   },
//   button: {
//     padding: '8px 16px',
//     color: '#ffffff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     fontSize: '14px',
//     transition: 'background-color 0.2s',
//     fontWeight: '500'
//   },
//   resetButton: {
//     padding: '8px 16px',
//     backgroundColor: '#6b7280',
//     color: '#ffffff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     fontSize: '14px',
//     transition: 'background-color 0.2s',
//     fontWeight: '500'
//   },
//   zoomContainer: {
//     marginTop: '16px',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '16px'
//   },
//   zoomLabel: {
//     fontSize: '14px',
//     fontWeight: '500',
//     color: '#374151'
//   },
//   zoomButton: {
//     padding: '4px 12px',
//     backgroundColor: '#e5e7eb',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     fontSize: '16px',
//     transition: 'background-color 0.2s'
//   },
//   mapWrapper: {
//     flex: 1,
//     position: 'relative'
//   },
//   map: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0
//   },
//   legend: {
//     position: 'absolute',
//     top: '16px',
//     right: '16px',
//     backgroundColor: 'rgba(255, 255, 255, 0.95)',
//     padding: '12px',
//     borderRadius: '8px',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
//     maxWidth: '200px',
//     fontSize: '13px'
//   },
//   legendTitle: {
//     fontWeight: 'bold',
//     marginBottom: '8px',
//     fontSize: '14px',
//     color: '#1f2937'
//   },
//   legendItem: {
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: '6px'
//   },
//   legendColor: {
//     width: '12px',
//     height: '12px',
//     borderRadius: '50%',
//     marginRight: '8px',
//     border: '2px solid white',
//     boxShadow: '0 0 2px rgba(0,0,0,0.3)'
//   },
//   legendText: {
//     fontSize: '12px',
//     color: '#374151'
//   },
//   infoPanel: {
//     position: 'absolute',
//     bottom: '16px',
//     left: '16px',
//     backgroundColor: 'rgba(255, 255, 255, 0.98)',
//     padding: '16px',
//     borderRadius: '8px',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
//     maxWidth: '300px',
//     minWidth: '250px'
//   },
//   closeButton: {
//     position: 'absolute',
//     top: '8px',
//     right: '8px',
//     background: 'none',
//     border: 'none',
//     fontSize: '24px',
//     cursor: 'pointer',
//     color: '#6b7280',
//     lineHeight: '1',
//     padding: '0',
//     width: '24px',
//     height: '24px'
//   },
//   infoSpecies: {
//     fontSize: '18px',
//     fontWeight: 'bold',
//     color: '#0066cc',
//     marginBottom: '4px'
//   },
//   infoScientific: {
//     fontStyle: 'italic',
//     color: '#666',
//     fontSize: '14px',
//     marginBottom: '12px'
//   },
//   infoCoords: {
//     fontSize: '13px',
//     color: '#374151',
//     marginBottom: '8px',
//     lineHeight: '1.5'
//   },
//   infoDataset: {
//     fontSize: '12px',
//     color: '#6b7280',
//     paddingTop: '8px',
//     borderTop: '1px solid #e5e7eb'
//   },
//   footer: {
//     backgroundColor: '#ffffff',
//     padding: '16px',
//     boxShadow: '0 -2px 4px rgba(0,0,0,0.1)'
//   },
//   footerText: {
//     fontSize: '14px',
//     color: '#6b7280',
//     margin: 0
//   }
// };