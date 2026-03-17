"use client";

import { useState, useCallback } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import type { Property } from "@/data/properties";

interface MapPanelProps {
  onMarkerClick?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  properties?: Property[];
  mode?: "buy" | "rent";
}

const DUBAI_CENTER = { longitude: 55.2708, latitude: 25.2048, zoom: 11 };
const MAPBOX_TOKEN  = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function MapPanel({ onMarkerClick, onViewDetails, properties = [], mode = "buy" }: MapPanelProps) {
  const { theme } = useTheme();
  const [hoveredId,     setHoveredId]     = useState<string | null>(null);
  const [popupProperty, setPopupProperty] = useState<Property | null>(null);
  const [mapLoaded,     setMapLoaded]     = useState(false);
  const [mapError,      setMapError]      = useState(false);

  const mapStyle = theme === "dark"
    ? "mapbox://styles/mapbox/dark-v11"
    : "mapbox://styles/mapbox/streets-v12";

  const handleMarkerClick = useCallback((property: Property) => {
    setPopupProperty(property);
    onMarkerClick?.(property.id);
  }, [onMarkerClick]);

  const handleViewDetails = useCallback((id: string) => {
    setPopupProperty(null);
    onViewDetails?.(id);
  }, [onViewDetails]);

  if (!MAPBOX_TOKEN || mapError) {
    return <FallbackMap properties={properties} mode={mode} onMarkerClick={onMarkerClick} onViewDetails={onViewDetails} />;
  }

  return (
    <div className="map-container">
      {/* Loading skeleton */}
      {!mapLoaded && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{ background: theme === "dark" ? "#0B0F1A" : "#EDE8E0" }}
        >
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-8 h-8 rounded-full border-2 animate-spin"
              style={{ borderColor: "rgba(201,162,88,0.20)", borderTopColor: "#C9A258" }}
            />
            <span className="type-body-sm">Loading map…</span>
          </div>
        </div>
      )}

      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={DUBAI_CENTER}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle}
        reuseMaps
        onLoad={() => setMapLoaded(true)}
        onError={() => setMapError(true)}
      >
        <NavigationControl position="top-right" />

        {properties.map((property) => {
          const isHovered = hoveredId === property.id;
          return (
            <Marker
              key={`${property.id}-${mode}`}
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
                <div className={`map-pill ${mode === "buy" ? "" : "map-pill--rent"} ${isHovered ? "map-pill--hover" : ""}`}>
                  <span className="map-pill__price">{property.priceShort}</span>
                  <span className="map-pill__area">{property.area}</span>
                </div>
              </button>
            </Marker>
          );
        })}

        {/* Popup */}
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
              <p className="text-[15px] font-bold" style={{ color: mode === "buy" ? "var(--color-z3-accent)" : "var(--color-z3-mauve)" }}>
                {popupProperty.priceShort}
              </p>
              <p className="type-body-sm mt-1">
                {popupProperty.beds}bd · {popupProperty.baths}ba · {popupProperty.sqft}
              </p>
              <button
                onClick={() => handleViewDetails(popupProperty.id)}
                className="btn btn-primary"
                style={{ marginTop: 10, fontSize: 11, padding: "6px 12px", width: "100%" }}
              >
                View Full Details →
              </button>
            </div>
          </Popup>
        )}
      </Map>

      {/* Bottom info bar */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="map-info-bar pointer-events-auto">
          <MapPin className="w-3 h-3" style={{ color: "var(--color-z3-accent)" }} />
          Dubai, UAE
        </div>
        <div className="map-info-bar text-[10px]">
          {properties.length} properties visible
        </div>
      </div>
    </div>
  );
}

/* ── Fallback map (no Mapbox token or error) ── */
function FallbackMap({ properties, mode, onMarkerClick, onViewDetails }: {
  properties: Property[];
  mode: string;
  onMarkerClick?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [popupId, setPopupId] = useState<string | null>(null);

  const toPos = (lat: number, lng: number) => ({
    x: ((lng - 55.10) / 0.30) * 90 + 5,
    y: (1 - (lat - 25.00) / 0.25) * 90 + 5,
  });

  const popupProp = properties.find((p) => p.id === popupId) ?? null;

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
            onClick={() => setPopupId(property.id === popupId ? null : property.id)}
            onMouseEnter={() => setHoveredId(property.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            aria-label={`${property.title} — ${property.priceShort}`}
          >
            <div className={`map-pill ${mode === "buy" ? "" : "map-pill--rent"} ${isHovered ? "map-pill--hover" : ""}`}>
              <span className="map-pill__price">{property.priceShort}</span>
              <span className="map-pill__area">{property.area}</span>
            </div>
          </button>
        );
      })}

      {/* Popup */}
      {popupProp && (() => {
        const pos = toPos(popupProp.lat, popupProp.lng);
        return (
          <div
            className="absolute z-10"
            style={{ left: `${pos.x}%`, top: `calc(${pos.y}% - 8px)`, transform: "translate(-50%, -100%)" }}
          >
            <div className="map-popup">
              <p className="type-body-sm mb-1">{popupProp.area}</p>
              <p className="type-label mb-1" style={{ fontSize: 13, lineHeight: 1.3 }}>
                {popupProp.title.length > 40 ? popupProp.title.slice(0, 40) + "…" : popupProp.title}
              </p>
              <p className="text-[15px] font-bold" style={{ color: mode === "buy" ? "var(--color-z3-accent)" : "var(--color-z3-mauve)" }}>
                {popupProp.priceShort}
              </p>
              <p className="type-body-sm mt-1">
                {popupProp.beds}bd · {popupProp.baths}ba · {popupProp.sqft}
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); onMarkerClick?.(popupProp.id); onViewDetails?.(popupProp.id); setPopupId(null); }}
                className="btn btn-primary"
                style={{ marginTop: 10, fontSize: 11, padding: "6px 12px", width: "100%" }}
              >
                View Full Details →
              </button>
            </div>
          </div>
        );
      })()}

      {/* Bottom info bar */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <div className="map-info-bar">
          <MapPin className="w-3 h-3" style={{ color: "var(--color-z3-accent)" }} />
          Dubai, UAE
        </div>
        <div className="map-info-bar text-[10px]">
          {properties.length} properties visible
        </div>
      </div>
    </div>
  );
}
