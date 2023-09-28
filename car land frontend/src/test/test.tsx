import React from 'react';
import ReactMapGL, { GeolocateControl, Marker, NavigationControl, useControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = "pk.eyJ1Ijoic2hpZmluIiwiYSI6ImNsaTh0M3RxdDN6Y3IzZW50djdlc2ltdnUifQ.hzwTjcEUnrCGzMT-6zY9Vw";

function LocationNew({ lat, setLat, lng, setLng, updatePlaceName }:any) {
  const Geocoder = () => {
    const ctrl = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      marker: false,
      collapsed: true,
    });
    useControl(() => ctrl);
    ctrl.on('result', (e) => {
      const coords = e.result.geometry.coordinates;
      setLng(coords[0]);
      setLat(coords[1]);
    });
    return null;
  };

  const getPlaceName = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      const desiredPlaceType = "postcode";

      // Find the feature with the desired place_type
      const desiredFeature = data.features.find((feature: { place_type: string | string[]; }) => feature.place_type.includes(desiredPlaceType));

      // Check if the feature was found and extract the place_name
      const placeName = desiredFeature ? desiredFeature.place_name : "Not found";

      console.log("Place Name:", placeName);
      updatePlaceName(placeName);
    } catch (error) {
      console.error('Error retrieving place name:', error);
    }
  };

  return (
    <ReactMapGL
      mapboxAccessToken={mapboxgl.accessToken}
      width="100%"
      height="400px"
      latitude={lat}
      longitude={lng}
      zoom={6}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      onViewportChange={(viewport: { latitude: any; longitude: any }):any => {
        setLat(viewport.latitude);
        setLng(viewport.longitude);
      }}
    >
      <Marker
        latitude={lat}
        longitude={lng}
        draggable
        onDragEnd={(e) => {
          console.log(e.lngLat.lat);
          console.log(e.lngLat.lng);
          setLat(e.lngLat.lat);
          setLng(e.lngLat.lng);
          getPlaceName(e.lngLat.lat, e.lngLat.lng);
        }}
      />
      <NavigationControl position="bottom-right" />
      <GeolocateControl
        position="top-left"
        trackUserLocation
        onGeolocate={(e) => {
          setLat(e.coords.latitude);
          setLng(e.coords.longitude);
          getPlaceName(e.coords.latitude, e.coords.longitude);
        }}
      />
      <Geocoder />
    </ReactMapGL>
  );
}

export default LocationNew;