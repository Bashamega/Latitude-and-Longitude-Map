import { LayersControl, LayerGroup, Circle } from "react-leaflet"
type Coordinates = {
    lat: number;
    long: number;
}
type MapProps = {
    cords: Coordinates;
}
export function Layers({cords}: MapProps){
    const center:any = [cords.lat, cords.long]

    return(
        <LayersControl position="bottomright">
            <LayersControl.Overlay name="Layer group with circles">
                <LayerGroup>
                    <Circle
                        center={center}
                        pathOptions={{ fillColor: 'blue' }}
                        radius={200}
                    />
                    <Circle
                        center={center}
                        pathOptions={{ fillColor: 'red' }}
                        radius={100}
                        stroke={false}
                    />
                    <LayerGroup>
                        <Circle
                        center={center}
                        pathOptions={{ color: 'green', fillColor: 'green' }}
                        radius={100}
                        />
                    </LayerGroup>
                </LayerGroup>
            </LayersControl.Overlay>
            
        </LayersControl>
    )
}