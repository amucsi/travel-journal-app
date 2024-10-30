import { useState } from "preact/hooks";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./EntryEditor.less";
import { IconButton } from "./IconButton";

export function EntryEditor({ onSave, onCancel }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);

    // Automatically ask for user location
    function handleAutoLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    alert("Unable to retrieve your location.");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    }

    // Save entry
    function handleSave() {
        const newEntry = {
            id: Date.now(),
            title,
            content,
            location,
            date,
            username: sessionStorage.getItem("loggedInUser"),
        };
        onSave(newEntry);
        setTitle("");
        setContent("");
        setLocation(null);
    }

    // Map click event for manually choosing a location
    function LocationMarker() {
        useMapEvents({
            click(e) {
                setLocation(e.latlng);
            },
        });

        return location ? <Marker position={location} /> : null;
    }

    return (
        <div class="EntryEditor">
            <span class="span1">Write New Entry</span>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent((e.target as HTMLTextAreaElement).value)}
            />
            <span class="span2">Select Date</span>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate((e.target as HTMLInputElement).value)}
            />
            <span class="span2">Add a Location</span>
            <div class="buttons">
                <IconButton name="location_on" text="Use My Location" onClick={handleAutoLocation} />
                <IconButton name="map" text="Pick on Map" onClick={() => setLocation({ lat: 51.505, lng: -0.09 })} />
            </div>
            {location && (
                <div class="mapContainer">
                    <MapContainer center={location as LatLngExpression} zoom={13}  style={{ height: "300px", width: "100%" }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <LocationMarker />
                    </MapContainer>
                </div>
            )}
            <div class="buttons">
                <IconButton name="check" text="Save Entry" onClick={handleSave} />
                <IconButton name="close" text="Cancel" onClick={onCancel} />
            </div>
        </div>
    );
}
