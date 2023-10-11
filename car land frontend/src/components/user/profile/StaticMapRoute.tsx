import React,{FC} from "react";

import mapboxgl from "mapbox-gl";

interface MapboxComponentProps {
    latitude:number;
    longitude:number;
}

const StaticMapRoute:FC<MapboxComponentProps> = ({latitude,longitude}) => {

    React.useEffect(()=>{
        const map=new mapboxgl.Map({
            container:"map",
            style:'mapbox://styles/mapbox/streets-v11',
            zoom:8,
            center: [76.2711, 10.8505],
           
        })
        
      new mapboxgl.Marker().setLngLat([76.2711, 10.8505]).addTo(map)
     return ()=>map.remove();
    },[])
   
     
  return (
    <div>
       <div className="flex flex-col items-center">
    <div id="map" className="w-full h-44" />
  </div>
    </div>
  )
}

export default StaticMapRoute
