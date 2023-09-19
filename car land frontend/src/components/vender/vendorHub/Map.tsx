import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';


mapboxgl.accessToken = 'pk.eyJ1IjoicmlzdmFuIiwiYSI6ImNsbXB3d2E5czBibXUydG4yeW9lMHViNTkifQ.h-bVA-Aily8lv53fswbr7w';

const MapboxComponent=()=> {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map', 
      style: 'mapbox://styles/mapbox/streets-v11',
            center: [76.2711, 10.8505],
      zoom: 8, 
    });

const Marker=new mapboxgl.Marker()
Marker.setLngLat([76.2711, 10.8505]).addTo(map)
map.on('click', (e) => {
    const { lng, lat } = e.lngLat;
    alert(`Latitude: ${lat}, Longitude: ${lng}`);
  });
    return () => map.remove();
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
  );
}

export default MapboxComponent;