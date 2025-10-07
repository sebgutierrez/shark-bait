import React, { useEffect, useRef, useState } from "react";
import "./WorldWind.css";

// Shark tracking data
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

// Color mapping by species
// const getColorForSpecies = (species) => {
//   const lower = species.toLowerCase();
//   if (lower.includes('white')) return '#ff4444';
//   if (lower.includes('tiger')) return '#ff8800';
//   if (lower.includes('bull') || lower.includes('zambezi')) return '#4444ff';
//   if (lower.includes('blacktip')) return '#00aa00';
//   if (lower.includes('sevengill')) return '#aa00aa';
//   return '#888888';
// };

/**
 * WorldWindGlobe
 * A React wrapper around the NASA WorldWind JavaScript library with data layer controls.
 * Includes controls for various oceanic data layers and shark activity prediction.
 */
export default function WorldWindGlobe({
	initialLatitude = 0,
	initialLongitude = 0,
	initialRange = 4e7,
	markers = [],
	style = {},
}) {
	const [showHelp, setShowHelp] = useState(false);
	const canvasRef = useRef(null);
	const wwdRef = useRef(null);
	
	// Define layers configuration
	const layerConfig = {
		sst: { name: "Sea Surface Temperature", layer: null, defaultChecked: false },
		salinity: { name: "Sea Salinity", layer: null, defaultChecked: false },
		bathymetry: { name: "Bathymetry", layer: null, defaultChecked: false },
		chlorophyll: { name: "Chlorophyll Concentration", layer: null, defaultChecked: false },
		sharks: { name: "Shark Locations", layer: null, defaultChecked: true },
		hotspots: { name: "Predicted Hotspots", layer: null, defaultedChecked: false }
	};
	const [isPredicting, setIsPredicting] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return undefined; // SSR guard

		let mounted = true;
		let WorldWind;
		let wwd;
		let placemarkLayer;

		(async () => {
			// dynamic import keeps SSR from failing and allows bundlers to code-split
			const mod = await import("worldwindjs");
			WorldWind = mod.default || mod;

			// create the WorldWindow on the canvas
			wwd = new WorldWind.WorldWindow(canvasRef.current);
			wwdRef.current = wwd;

			// common base layers
			const baseLayers = [
				{ layer: new WorldWind.BMNGLayer(), enabled: true },
				{ layer: new WorldWind.BMNGLandsatLayer(), enabled: false },
				{ layer: new WorldWind.AtmosphereLayer(), enabled: true },
				{ layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true },
				{ layer: new WorldWind.ViewControlsLayer(wwd), enabled: true },
			];

			baseLayers.forEach((entry) => {
				entry.layer.enabled = !!entry.enabled;
				wwd.addLayer(entry.layer);
			});

			// // Create shark placemark layer
			// placemarkLayer = new WorldWind.RenderableLayer("Shark Locations");
			// wwd.addLayer(placemarkLayer);
			// placemarkLayer.enabled = true;

			// // Create placemarks for each shark
			// sharkData.forEach((shark) => {
			// 	const placemark = new WorldWind.Placemark(
			// 		new WorldWind.Position(shark.lat, shark.lon, 0)
			// 	);

			// 	// Create placemark attributes
			// 	const placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
			// 	const color = getColorForSpecies(shark.species);

			// 	// Set up the common placemark attributes
			// 	placemarkAttributes.imageScale = 0.5;
			// 	placemarkAttributes.imageColor = new WorldWind.Color(
			// 		parseInt(color.slice(1, 3), 16) / 255,
			// 		parseInt(color.slice(3, 5), 16) / 255,
			// 		parseInt(color.slice(5, 7), 16) / 255,
			// 		1
			// 	);
			// 	placemarkAttributes.imageOffset = new WorldWind.Offset(
			// 		WorldWind.OFFSET_FRACTION, 0.5,
			// 		WorldWind.OFFSET_FRACTION, 0.5
			// 	);
			// 	placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
			// 		WorldWind.OFFSET_FRACTION, 0.5,
			// 		WorldWind.OFFSET_FRACTION, 1.5
			// 	);

			// 	// Set up the placemark's tooltip
			// 	placemark.label = `${shark.species}\n${shark.scientific}\n${shark.dataset}`;
			// 	placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
			// 	placemark.attributes = placemarkAttributes;

			// 	// Add placemark to the layer
			// 	placemarkLayer.addRenderable(placemark);
			// });

			// // Store reference to shark layer
			// layerConfig.sharks.layer = placemarkLayer;

			// redraw on window resize
			const handleResize = () => {
				wwd.redraw();
			};
			window.addEventListener("resize", handleResize);

			// only keep things running while mounted
			if (!mounted) return;
		})();

		return () => {
			mounted = false;
			try {
				if (wwdRef.current) {
					// remove layers and stop rendering
					const wwdInst = wwdRef.current;
					const layers = wwdInst.layers ? Array.from(wwdInst.layers) : [];
					layers.forEach((l) => {
						try {
							wwdInst.removeLayer(l);
						} catch (e) {
							/* ignore */
						}
					});
				}
			} catch (e) {
				// ignore cleanup errors
			}
			wwdRef.current = null;
			window.removeEventListener("resize", () => {});
		};
	}, [initialLatitude, initialLongitude, initialRange, markers]);

	const handleLayerToggle = (event) => {
		const layerId = event.target.dataset.layerId;
		if (layerConfig[layerId].layer) {
			layerConfig[layerId].layer.enabled = event.target.checked;
			wwdRef.current.redraw();
		}
		console.log(`Layer ${layerId} is now ${event.target.checked ? 'enabled' : 'disabled'}`);
	};

	const handlePredictClick = async () => {
		// setIsPredicting(true);
		// try {
		// 	// TODO: Implement prediction logic
		// 	await new Promise(resolve => setTimeout(resolve, 2000)); // Simulation
			
		// 	// Add heatmap or highlight layer for predicted hotspots
		// 	if (wwdRef.current) {
		// 		// Example: Add highlight areas
		// 		// This would be replaced with actual prediction data
		// 		const sampleHotspots = [
		// 			{ lat: 25.7617, lon: -80.1918, probability: 0.8 }, // Miami
		// 			{ lat: -33.8688, lon: 151.2093, probability: 0.9 }, // Sydney
		// 		];
				
		// 		// Visualization logic would go here
		// 	}
		// } finally {
		// 	setIsPredicting(false);
		// }
	};

	const containerStyle = {
		width: "100%",
		height: "100%",
		display: "flex",
		...style,
	};

	return (
		<div className="">
			<div style={containerStyle} className="worldwind-container">
				<div className="layer-panel" style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
					<div className="panel-header">
						<div className="header-content">
							<span className="header-title">Data Layers</span>
							<button 
								className="help-button"
								onClick={() => setShowHelp(!showHelp)}
								aria-label="Toggle help guide"
							>
								?
							</button>
						</div>
						{showHelp && (
							<div className="help-popup">
								<div className="" style={{display: "flex", width: "100%", justifyContent: "flex-end"}}>
									<button 
										className="close-help"
										onClick={() => setShowHelp(false)}
										aria-label="Close help guide"
									>
										×
									</button>
								</div>
								<h3>Layer Guide</h3>
								<ul>
									<li>Use checkboxes to toggle data layers on/off</li>
									<li>Sea Surface Temperature shows water temperature variations</li>
									<li>Sea Salinity displays salt content levels</li>
									<li>Bathymetry reveals ocean depth data</li>
									<li>Chlorophyll indicates marine life activity areas</li>
									<li>Shark Locations shows tracked shark positions</li>
									<li>Click the Discover button to view the model's shark hotspot predictions and play with the toggles to see how they influenced the predictions</li>
								</ul>
							</div>
						)}
					</div>
					<div style={{display: "flex", flexDirection: "column"}}>
						{Object.entries(layerConfig).map(([id, layer]) => (
							<div key={id} className="layer-control">
								<label>
									<input
										type="checkbox"
										data-layer-id={id}
										defaultChecked={layer.defaultChecked}
										onChange={handleLayerToggle}
										id={`layer-${id}`}
									/>
									<span>{layer.name}</span>
								</label>
							</div>
						))}
					</div>
					<button className="discover-button" onClick={() => {}}>
						Discover
					</button>
				</div>
				<div className="globe-container">
					<div className="globe-backdrop">
						<canvas
							ref={canvasRef}
							aria-label="WorldWind globe canvas"
							className="globe-canvas"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}