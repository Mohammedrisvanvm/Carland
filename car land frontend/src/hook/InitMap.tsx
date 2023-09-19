import { Map } from 'mapbox-gl';

export const InitMap = (container: HTMLDivElement, coords: [number, number]) => {

    return new Map({
        container,
        style: 'mapbox://styles/mapbox/dark-v10',
        pitchWithRotate: false,
        center: coords,
        zoom: 15,
        accessToken: 'pk.eyJ1IjoicmlzdmFuIiwiYSI6ImNsbXB3d2E5czBibXUydG4yeW9lMHViNTkifQ.h-bVA-Aily8lv53fswbr7w',
        doubleClickZoom: false
    });

}