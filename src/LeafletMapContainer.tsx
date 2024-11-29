import { LatLngExpression } from "leaflet"
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

export type LeafletMapContainerProps = {
    center: LatLngExpression;
    zoom: number;
    marker?: LatLngExpression;
    onMapClick?: (latlng) => void;
}

/**
 * This dummy function handles the clicking of the map
 * It returns null since leaflet requires the hook to be used inside a leaflet component
 *
 * @param {{onMapClick: (latlng) => void}} {onMapClick}
 * @return null since we only to use the hook
 */
function LocationMarker({onMapClick}: {onMapClick: (latlng) => void}) {
    useMapEvents({
        click(e) {
            if (onMapClick) {
                onMapClick(e.latlng)
            }
        },
    });
    return null;
}

export function LeafletMapContainer({center, zoom, marker, onMapClick}: LeafletMapContainerProps) {
    return <div>
        <MapContainer center={center} zoom={zoom}>
            <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {marker && <Marker position={marker}/>}
            <LocationMarker onMapClick={onMapClick}/>
        </MapContainer>
    </div>
}