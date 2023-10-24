import React, { useEffect,useRef ,SetStateAction} from 'react';
import mapboxgl, { LngLat } from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoicmlzdmFuIiwiYSI6ImNsbXB3d2E5czBibXUydG4yeW9lMHViNTkifQ.h-bVA-Aily8lv53fswbr7w';

type Current = {
  latitude: number;
  longitude: number;
};

interface MapboxComponentProps {
    setLocation:React.Dispatch<SetStateAction<Current|null>>;
    setShowMap:React.Dispatch<SetStateAction<boolean>>;
}

const MapboxComponent: React.FC<MapboxComponentProps> = ({setLocation,setShowMap}) => {
  const mapRef = useRef<mapboxgl.Map>();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [76.2711, 10.8505],
      zoom: 8,
    });

    mapRef.current = map;

    map.on('click', (e: { lngLat: LngLat }) => {
      const { lng, lat } = e.lngLat;
      setLocation({latitude:lat,longitude:lng})
      alert(`Latitude: ${lat}, Longitude: ${lng}`);
      setShowMap(false)
    });

    return () => map.remove();
  }, []);

  return (
    <div className="flex flex-col items-center">
    <div id="map" className="w-80 h-80" style={{ width: '400px', height: '400px' }} />
  </div>);
};

export default MapboxComponent;