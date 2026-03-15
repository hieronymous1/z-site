"use client";

import { useState, useCallback } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin, Layers } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import type { Property } from "@/data/properties";

interface MapPanelProps {
  onMarkerClick?: (id: string) => void;
  properties?: Property[];
  mode?: "buy" | "rent";
}

const DUBAI_CENTER = { longitude: 55.2708, latitude: 25.2048, zoom: 11 };
const MAPBOX_TOKEN  = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function MapPanel({ onMarkerClick, properties = [], mode = "buy" }: MapPanelProps) {
  const { theme } = useTheme();
  const [hoveredId,      setHoveredId]      = useState<string | null>(null);
  const [popupProperty,  setPopupProperty]  = useState<Property | null>(null);

  const mapStyle = theme === "dark"
    ? "mapbox://styles/mapbox/dark-v11"
    : "mapbox://styles/mapbox/light-v11";

  const handleMarkerClick = useCallback((property: Property) => {
    setPopupProperty(property);
    onMarkerClick?.(property.id);
  }, [onMarkerClick]);

  if (!MAPBOX_TOKEN) {
    return <FallbackMap properties={properties} mode={mode} onMarkerClick={onMarkerClick} />;
  }

  const bubbleModeClass = mode === "buy" ? "map-bubble--buy" : "map-bubble--rent";

  return (
    <div className="map-container">
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={DUBAI_CENTER}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle}
        reuseMaps
      >
        <NavigationControl position="top-right" />

        {properties.map((property) => {
          const isHovered = hoveredId === property.id;
          return (
            <Marker
              key={property.id}
              longitude={property.lng}
              latitude={property.lat}
              anchor="bottom"
            >
              <button
                onMouseEnter={() => setHoveredId(property.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleMarkerClick(property)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                aria-label={`${property.title} — ${property.priceShort}`}
              >
                {/* Glow halo */}
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    inset: isHovered ? "-14px" : "-6px",
                    background: isHovered
                      ? `radial-gradient(circle, ${mode === "buy" ? "rgba(165,255,214,0.55)" : "rgba(169,109,163,0.55)"} 0%, transparent 70%)`
                      : `radial-gradient(circle, ${mode === "buy" ? "rgba(165,255,214,0.18)" : "rgba(169,109,163,0.18)"} 0%, transparent 70%)`,
                    transition: "all 0.25s ease",
                  }}
                />

                {/* Marker bubble */}
                <div
                  className={`map-bubble ${bubbleModeClass} ${property.highlighted ? "map-bubble--highlighted" : ""}`}
                  style={{
                    width:     isHovered ? 44 : 36,
                    height:    isHovered ? 44 : 36,
                    transform: isHovered ? "scale(1.15)" : "scale(1)",
                    borderColor: isHovered ? "rgba(238,229,233,0.3)" : "rgba(238,229,233,0.12)",
                  }}
                >
                  {property.beds}bd
                </div>
              </button>
            </Marker>
          );
        })}

        {/* ── Popup ── */}
        {popupProperty && (
          <Popup
            longitude={popupProperty.lng}
            latitude={popupProperty.lat}
            anchor="bottom"
            offset={50}
            closeOnClick={false}
            onClose={() => setPopupProperty(null)}
            style={{ zIndex: 10 }}
          >
            <div className="map-popup">
              <p className="type-body-sm mb-1">{popupProperty.area}</p>
              <p className="type-label mb-1" style={{ fontSize: 13, lineHeight: 1.3 }}>
                {popupProperty.title.length > 40 ? popupProperty.title.slice(0, 40) + "…" : popupProperty.title}
              </p>
              <p className="text-[15px] font-bold" style={{ color: mode === "buy" ? "#A5FFD6" : "#A96DA3" }}>
                {popupProperty.priceShort}
              </p>
              <p className="type-body-sm mt-1">
                {popupProperty.beds}bd · {popupProperty.baths}ba · {popupProperty.sqft}
              </p>
            </div>
          </Popup>
        )}
      </Map>

      {/* ── Bottom info bar ── */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="map-info-bar pointer-events-auto">
          <MapPin className="w-3 h-3" style={{ color: "#A5FFD6" }} />
          Dubai, UAE
        </div>
        <div className="map-info-bar text-[10px]">
          {properties.length} properties visible
        </div>
      </div>
    </div>
  );
}

/* ── Fallback map (no Mapbox token) ── */
function FallbackMap({ properties, mode, onMarkerClick }: {
  properties: Property[];
  mode: string;
  onMarkerClick?: (id: string) => void;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const bubbleModeClass = mode === "buy" ? "map-bubble--buy" : "map-bubble--rent";

  // Map Dubai coords to SVG viewport — lng 55.10→55.40, lat 25.00→25.25
  const toPos = (lat: number, lng: number) => ({
    x: ((lng - 55.10) / 0.30) * 90 + 5,
    y: (1 - (lat - 25.00) / 0.25) * 90 + 5,
  });

  return (
    <div className="map-container map-dark">
      {/* Faint grid */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.025 }} aria-hidden="true">
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Ambient glow */}
      <div
        className="absolute top-0 right-0 w-2/3 h-2/3 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 80% 10%, rgba(201,163,94,0.07) 0%, transparent 60%)" }}
        aria-hidden="true"
      />

      {/* Property markers */}
      {properties.map((property) => {
        const pos       = toPos(property.lat, property.lng);
        const isHovered = hoveredId === property.id;
        return (
          <button
            key={property.id}
            onClick={() => onMarkerClick?.(property.id)}
            onMouseEnter={() => setHoveredId(property.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            aria-label={`${property.title} — ${property.priceShort}`}
          >
            {/* Ping ring on highlighted */}
            {property.highlighted && (
              <div
                className="absolute rounded-full animate-ping"
                style={{
                  inset: "-8px",
                  background: mode === "buy" ? "rgba(165,255,214,0.12)" : "rgba(169,109,163,0.12)",
                  border: `1px solid ${mode === "buy" ? "rgba(165,255,214,0.25)" : "rgba(169,109,163,0.25)"}`,
                }}
              />
            )}

            {/* Hover glow halo */}
            <div
              className="absolute rounded-full transition-all duration-300 pointer-events-none"
              style={{
                inset: isHovered ? "-12px" : "-5px",
                background: isHovered
                  ? `radial-gradient(circle, ${mode === "buy" ? "rgba(165,255,214,0.32)" : "rgba(169,109,163,0.32)"} 0%, transparent 70%)`
                  : `radial-gradient(circle, ${mode === "buy" ? "rgba(165,255,214,0.14)" : "rgba(169,109,163,0.14)"} 0%, transparent 70%)`,
              }}
            />

            {/* Bubble */}
            <div
              className={`map-bubble ${bubbleModeClass} ${property.highlighted ? "map-bubble--highlighted" : ""} ${isHovered ? "scale-125" : ""} transition-all duration-200`}
            >
              {property.beds}bd
            </div>

            {/* Hover tooltip */}
            {isHovered && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 whitespace-nowrap z-10">
                <div className="map-popup py-2 px-3 text-xs">
                  <span className="font-semibold text-z3-text">{property.area}</span>
                  <span className="text-z3-text-muted ml-1.5">{property.priceShort}</span>
                </div>
              </div>
            )}
          </button>
        );
      })}

      {/* No-token notice */}
      <div className="absolute top-4 left-4">
        <div className="map-info-bar text-[10px]">
          <Layers className="w-3 h-3" />
          Add NEXT_PUBLIC_MAPBOX_TOKEN for live map
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <div className="map-info-bar">
          <MapPin className="w-3 h-3" style={{ color: "#A5FFD6" }} />
          Dubai, UAE
        </div>
        <div className="map-info-bar text-[10px]">
          {properties.length} properties visible
        </div>
      </div>
    </div>
  );
}
