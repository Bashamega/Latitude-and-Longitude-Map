import { useMemo } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import MinimapBounds from './MinimapBounds';

interface Position {
  position?: 'bottomleft' | 'bottomright' | 'topleft' | 'topright';
}

interface Coordinates {
  lat: number;
  long: number;
}

interface MinimapControlProps extends Position {
  zoom?: number;
  coordinates: Coordinates;
}

export function MinimapControl({ position, zoom, coordinates }: MinimapControlProps) {
  const parentMap = useMap();
  const mapZoom = zoom || 0;

  const minimap = useMemo(
    () => (
      <MapContainer
        style={{ height: 80, width: 80 }}
        center={[coordinates.lat, coordinates.long]}
        zoom={mapZoom}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} coordinates={coordinates} />
      </MapContainer>
    ),
    [parentMap, mapZoom, coordinates],
  );

  const positionClass =
    (position &&
      (position === 'bottomleft'
        ? 'leaflet-bottom leaflet-left'
        : position === 'bottomright'
        ? 'leaflet-bottom leaflet-right'
        : position === 'topleft'
        ? 'leaflet-top leaflet-left'
        : 'leaflet-top leaflet-right')) ||
    'leaflet-top leaflet-right';

  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  );
}

export default MinimapControl;
