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

			// Create a DOM element for the marker
			const el = document.createElement("div");
			el.style.width = "15px";
			el.style.height = "15px";
			el.style.backgroundColor = "#4285F4";
			el.style.borderRadius = "50%";
			el.style.border = "2px solid white";
			el.style.boxShadow = "0 0 5px rgba(0,0,0,0.3)";

			const userMarker = new maplibregl.Marker({ element: el })
				.setLngLat([0, 0]) // Initial position, will be updated
				.addTo(map.current);

			// Watch user location
			if ("geolocation" in navigator) {
				navigator.geolocation.watchPosition(
					(position) => {
						const { longitude, latitude } = position.coords;
						userMarker.setLngLat([longitude, latitude]);

						// Optional: Fly to user location on first fix or if needed
						map.current?.flyTo({ center: [longitude, latitude], zoom: 15 });
					},
					(error) => {
						console.error("Error getting location:", error);
					},
					{
						enableHighAccuracy: true,
						timeout: 5000,
						maximumAge: 0,
					},
				);
			}
		}
	}, []);

	return <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />;
}
