import React, { useEffect, useRef, useState } from "react";
import "./WorldWind.css";

/**
 * WorldWindGlobe
 * A React wrapper around the NASA WorldWind JavaScript library with data layer controls.
 * Includes controls for various oceanic data layers and shark activity prediction.
 */

export default function WorldWindGlobe({
	initialLatitude = 0,
	initialLongitude = 0,
	initialRange = 5e7,
	markers = [],
	style = {},
}) {
	const canvasRef = useRef(null);
	const wwdRef = useRef(null);
	
	// Define layers configuration
	const layerConfig = {
		sst: { name: "Sea Surface Temperature", layer: null, defaultChecked: false, nasaSourced: true, disable: false },
		salinity: { name: "Sea Salinity", layer: null, defaultChecked: false, nasaSourced: true, disable: false  },
		bathymetry: { name: "Bathymetry", layer: null, defaultChecked: false, nasaSourced: true, disable: false  },
		chlorophyll: { name: "Chlorophyll Concentration", layer: null, defaultChecked: false, nasaSourced: true, disable: false  },
		sharks: { name: "Shark Locations", layer: null, defaultChecked: false, nasaSourced: false, disable: false  },
		hotspots: { name: "Predicted Hotspots", layer: null, defaultedChecked: false, nasaSourced: false, disable: true  }
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

					const wwdInst = wwdRef.current;
					const layers = wwdInst.layers ? Array.from(wwdInst.layers) : [];
					layers.forEach((l) => {
						try {
							wwdInst.removeLayer(l);
						} catch (e) {
						}
					});
				}
			} catch (e) {
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
				<div className="layer-panel" style={{display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
					<div className="panel-header">
						<div className="header-content">
							<span className="header-title">Data Layers</span>
						</div>
					</div>
					<div style={{display: "flex", flexDirection: "column"}}>
						{Object.entries(layerConfig).map(([id, layer]) => (
							<div key={id} className="layer-control">
								<label>
									{ layer.name !== "Predicted Hotspots" ?
										(<input
											type="checkbox"
											data-layer-id={id}
											defaultChecked={layer.defaultChecked}
											onChange={handleLayerToggle}
											id={`layer-${id}`}
										/>) : null
									}
									<span>{ layer.name !== "Predicted Hotspots" && layer.name }{ layer.nasaSourced && <span style={{color: "red"}}> *</span> }</span>
								</label>
							</div>
						))}
					</div>
				</div>
				<div className="globe-container">
					<div className="globe-backdrop">
						<canvas
							ref={canvasRef}
							aria-label="WorldWind globe canvas"
							className="globe-canvas"
						/>
					</div>
					<div className="data-layer-sources worldwind">
						<a
							href="https://github.com/NASAWorldWind/WebWorldWind"
							target="_blank"
							rel="noopener noreferrer"
							className="sources-link"
						>
							3D Visuals produced using NASA WorldWind
						</a>
					</div>
					<div className="data-layer-sources neo">
						<a
							href="https://neo.gsfc.nasa.gov/view.php?datasetId=MYD28M"
							target="_blank"
							rel="noopener noreferrer"
							className="sources-link"
						>
							* Data sourced from NASA Earth Observations (NEO)
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
