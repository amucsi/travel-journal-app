import { useState } from "preact/hooks";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./EntryEditor.less";
import { IconButton } from "./IconButton";
import { EntryData } from "./EntryData";
import { JSX } from "preact";

export function EntryEditor({ onSave, onCancel }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
    const [images, setImages] = useState<string[]>([]);
    const [videos, setVideos] = useState<string[]>([]);

    //auto ask for user location
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

    // Helper function to convert file to base64
    function convertFileToBase64(file: File, callback: (base64: string) => void) {
        const reader = new FileReader();
        reader.onloadend = () => {
            callback(reader.result as string);
        };
        reader.readAsDataURL(file);
    }

    // Handle image upload
    function handleImageUpload(event: JSX.TargetedEvent<HTMLInputElement, Event>) {
        const files = event.currentTarget.files;
        if (files) {
            Array.from(files).forEach((file) =>
                convertFileToBase64(file, (base64) => {
                    setImages((prevImages) => [...prevImages, base64]);
                })
            );
        }
    }

    // Handle video upload
    function handleVideoUpload(event: JSX.TargetedEvent<HTMLInputElement, Event>) {
        const files = event.currentTarget.files;
        if (files) {
            Array.from(files).forEach((file) =>
                convertFileToBase64(file, (base64) => {
                    setVideos((prevVideos) => [...prevVideos, base64]);
                })
            );
        }
    }

    // Save entry
    function handleSave() {
        const newEntry: EntryData = {
            id: new Date(),
            title,
            content,
            location,
            date,
            username: sessionStorage.getItem("loggedInUser"),
            images,
            videos
        };
        onSave(newEntry);
        setTitle("");
        setContent("");
        setLocation(null);
        setImages([]);
        setVideos([]);
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
                <IconButton name="map" text="Pick on Map" onClick={() => setLocation({ lat: 47.497, lng: 19.04 })} />
            </div>
            {location && (
                <div class="mapContainer">
                    <MapContainer center={location as LatLngExpression} zoom={13}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker />
                    </MapContainer>
                </div>
            )}
            <span class="span2">Attach Media</span>
            <label for="imageUpload">Images:</label>
            <input name="imageUpload" type="file" accept="image/*" multiple onChange={handleImageUpload} />
            <label for="videoUpload">Videos:</label>
            <input name="videoUpload" type="file" accept="video/*" multiple onChange={handleVideoUpload} />
            <div class="buttons">
                <IconButton name="check" text="Save Entry" onClick={handleSave} />
                <IconButton name="close" text="Cancel" onClick={onCancel} />
            </div>
        </div>
    );
}
