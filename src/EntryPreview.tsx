import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { EntryData } from "./EntryData";
import "./EntryPreview.less"
import { IconButton } from "./IconButton";
import { LatLngExpression } from "leaflet";

export type EntryPreviewProps = {
    entry: EntryData;
    onExpand: () => void;
    onDelete: (d: Date) => void;
}

export function EntryPreview({ entry, onExpand, onDelete }: EntryPreviewProps) {
    const previewContent = entry.content ? entry.content.split(" ").slice(0, 20).join(" ") + "..." : "";

    function handleDeleteClick(e) {
        e.stopPropagation();
        if (confirm("Are you sure you want to delete this entry?")) {
            onDelete(entry.id);
        }
    }

    return <div class="EntryPreview">
        <span class="header">{entry.date}</span>
        <button type="button" onClick={handleDeleteClick}>
            <span class="material-symbols-outlined">
                delete
            </span>
        </button>
        <div class="top">
            <h3>{entry.title ? entry.title : "Untitled entry"}</h3>
            <div class="previewText">
                <p>{previewContent}</p>
            </div>
        </div>
        <div class="bottom">
            <div class="mediaPreview">
                {entry.images && entry.images.length > 0 ? (
                    <img src={entry.images[0]} alt="Entry Media" class="mediaThumbnail" />
                ) : entry.videos && entry.videos.length > 0 ? (
                    <video src={entry.videos[0]} controls class="mediaThumbnail" />
                ) : (undefined
                    //<p class="noMediaMessage">No media attached</p>
                )}
            </div>

            {entry.location && (
                <div class="tinyMapContainer">
                    <MapContainer center={entry.location as LatLngExpression} zoom={7}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={entry.location as LatLngExpression} />
                    </MapContainer>
                </div>
            )}
        </div>
        <IconButton name="expand_content" text="" onClick={onExpand} />
    </div>
}