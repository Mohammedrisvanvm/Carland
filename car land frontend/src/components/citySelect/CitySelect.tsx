import axios from "axios";
import mapboxgl, { Map, MapboxEvent } from "mapbox-gl";
import React, { useState ,ChangeEvent} from "react";
import { useNavigate } from "react-router";
import mapboxAPI from "../../services/mapbox/mapbox";

const API_ENDPOINTS = `https://api.openweathermap.org/data/3.0/onecall?`;
const API_KEY = `c74d5b78ec373a800f3a214adba28c0a`;
const getlocation = async(search:string) => {
  const response = await mapboxAPI.get(`/geocoding/v5/mapbox.places/${encodeURIComponent(search)}.json`);
 
 
};

export const CitySelect = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [search, setSearch] = useState<string>('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const Navigate = useNavigate();

  const handlesubmit=(e:ChangeEvent<HTMLFormElement>)=>{
    e.preventDefault()
    getlocation(search)
  }
 
    

 


  const handleSelectChange = (e: any) => {
    setSelectedLocation(e.target.value);
    Navigate(`/rentcars${selectedLocation}`);
  };

  return (
    <>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <img src="/rentacar.jpg" alt="" />
          <h6 className=" flex justify-center max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto capitalize">
            Select a Location
          </h6>
          <label htmlFor="underline_select" className="sr-only">
            Underline select
          </label>
          <div
            onClick={() =>
              navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                // getlocation();
            
              })
            }
          >
            hello
          </div>
          <form onSubmit={handlesubmit}>
          <input type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setSearch(e.target.value)} />
          <button  type="submit">sub</button>
          </form>
          <select
            id="underline_select"
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            value={selectedLocation}
            onChange={handleSelectChange}
          >
            <option disabled value="">
              Choose a Location
            </option>
            <option>current location</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default CitySelect;
