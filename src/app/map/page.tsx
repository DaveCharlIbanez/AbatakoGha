"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function MapPage() {
	const mapContainer = useRef<HTMLDivElement>(null);
	const map = useRef<maplibregl.Map | null>(null);

	useEffect(() => {
		if (map.current) return; // stops map from initializing more than once

		if (mapContainer.current) {
			map.current = new maplibregl.Map({
				container: mapContainer.current,
				style: "https://tiles.openfreemap.org/styles/bright",
				center: [122.0175, 10.7883],
				zoom: 15,
			});
		}
	}, []);

	return <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />;
}
