import axios from 'axios';

const mapboxAPI = axios.create({
  baseURL: 'https://api.mapbox.com',
  params: {
    access_token: import.meta.env.VITE_MAPBOXTOKEN
  }
});

export default mapboxAPI;