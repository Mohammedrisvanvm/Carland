import React, { useEffect, useRef, SetStateAction } from "react";
import mapboxgl, { LngLat } from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoicmlzdmFuIiwiYSI6ImNsbXB3d2E5czBibXUydG4yeW9lMHViNTkifQ.h-bVA-Aily8lv53fswbr7w";

interface MapboxComponentProps {
  setLocation: React.Dispatch<SetStateAction<object>>;
  setShowMap: React.Dispatch<SetStateAction<boolean>>;
}

const MapboxComponent: React.FC<MapboxComponentProps> = ({
  setLocation,
  setShowMap,
}) => {
  const mapRef = useRef<mapboxgl.Map>();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [76.2711, 10.8505],
      zoom: 8,
    });

    mapRef.current = map;

    map.on("click", (e: { lngLat: LngLat }) => {
      const { lng, lat } = e.lngLat;
      setLocation(e.lngLat);
     
      setShowMap(false);
    });

    return () => map.remove();
  }, []);

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
};

export default MapboxComponent;
