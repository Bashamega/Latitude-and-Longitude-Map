import { useCallback, useEffect, useState } from 'react';
import { Rectangle, useMap, useMapEvent } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';

interface Coordinates {
  lat: number;
  long: number;
}

interface MinimapBoundsProps {
  parentMap: any;
  zoom: number;
  coordinates: Coordinates;
}

function MinimapBounds({ parentMap, zoom, coordinates }: MinimapBoundsProps) {
  const minimap = useMap();

  const onClick = useCallback(
    (e: any) => {
      parentMap.setView(e.latlng, parentMap.getZoom());
    },
    [parentMap],
  );
  useMapEvent('click', onClick);

  const [bounds, setBounds] = useState<LatLngBounds>(parentMap.getBounds());
  
  useEffect(() => {
    setBounds(parentMap.getBounds());
    minimap.setView(parentMap.getCenter(), zoom);
  }, [minimap, parentMap, zoom, coordinates]);

  return <Rectangle bounds={bounds} />;
}

export default MinimapBounds;
