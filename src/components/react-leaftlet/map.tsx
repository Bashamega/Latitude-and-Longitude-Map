
import { TileLayer, Marker, Popup, useMap  } from "react-leaflet";
type Coordinates = {
    lat: number;
    long: number;
  }
  
type props = {
    cords: Coordinates;
    fly: boolean
}
export function ReactMarker({cords, fly}: props){
    const map = useMap()
    if(fly){
        map.flyTo([cords.lat, cords.long])
    }else{
        map.setView([cords.lat, cords.long])

    }
    return(
        <section>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[cords.lat, cords.long]}>
                <Popup>This is your current location</Popup>
            </Marker>
        </section>
    )
}