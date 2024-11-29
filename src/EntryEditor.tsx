import { useState } from "preact/hooks";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./EntryEditor.less";
import { IconButton } from "./IconButton";
import { EntryData } from "./EntryData";
import { JSX } from "preact";
import { LeafletMapContainer } from "./LeafletMapContainer";

/**
 * Props for EntryEditor
 * onSave saves the entry, onCancel exits the editor
 */
export type EntryEditorProps = {
    onSave: (entry: EntryData) => void;
    onCancel: () => void;
}

/**
 * The editor form responsible for creating and saving a new entry
 * Includes inputs for title and content, a date picker, a location picker map using react-leaflet,
 * and two media file upload inputs
 *
 * @export
 * @param {EntryEditorProps} {onSave, onCancel}
 * @return TSX entry editor form element
 */
export function EntryEditor({ onSave, onCancel }: EntryEditorProps): any {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
    const [images, setImages] = useState<string[]>([]);
    const [videos, setVideos] = useState<string[]>([]);

    /**
     * The method responsible for asking the user their location
     *
     */
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

    /**
     * Function to convert files into Base64 strings
     *
     * @param {File} file
     * @param {(base64: string) => void} callback
     */
    function convertFileToBase64(file: File, callback: (base64: string) => void) {
        const reader = new FileReader();
        reader.onloadend = () => {
            callback(reader.result as string);
        };
        reader.readAsDataURL(file);
    }

    /**
     * The method responsible for converting images into Base64
     * We iterate over the the parameter's files and convert them
     *
     * @param {JSX.TargetedEvent<HTMLInputElement, Event>} event
     */
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

    /**
     * The method responsible for converting videos into Base64
     * We iterate over the the parameter's files and convert them
     *
     * @param {JSX.TargetedEvent<HTMLInputElement, Event>} event
     */
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


    /**
     * The method responsible for saving the new entry
     * Creates an entry object, calls the onSave function and resets the inputs
     *
     */
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

    /**
     * The method responsible for handling the map click event
     * Returns the location the user manually chose on the map
     *
     * @return location
     */
    function LocationMarker() {
        useMapEvents({
            click(e) {
                setLocation(e.latlng);
            },
        });

        // return location;
        return location ? <Marker position={location as LatLngExpression} /> : null;
    }

    /**
     *
     *
     * @param {*} latlng
     */
    function handleMapClick(latlng) {
        setLocation(latlng);
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
                    {/* <MapContainer center={location as LatLngExpression} zoom={13}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker />
                    </MapContainer> */}
                    <LeafletMapContainer
                        center={location as LatLngExpression}
                        zoom={7}
                        marker={location as LatLngExpression}
                        onMapClick={setLocation}
                    />
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
