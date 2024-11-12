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
    const previewContent = entry.content.split(" ").slice(0, 20).join(" ") + "...";

    function handleDeleteClick(e) {
        e.stopPropagation();
        if (confirm("Are you sure you want to delete this entry?")) {
            onDelete(entry.id);
        }
    }

    return <div class="EntryPreview">
        <span class="header">{entry.date}</span>
        <h3>{entry.title}</h3>
        <button type="button" onClick={handleDeleteClick}>
            <span class="material-symbols-outlined">
                delete
            </span>
        </button>
        <p class="previewText">{previewContent}</p>

        <div className="mediaPreview">
            {entry.images && entry.images.length > 0 ? (
                <img src={entry.images[0]} alt="Entry Media" className="mediaThumbnail" />
            ) : entry.videos && entry.videos.length > 0 ? (
                <video src={entry.videos[0]} controls className="mediaThumbnail" />
            ) : (
                <p className="noMediaMessage">No media attached</p>
            )}
        </div>

        {entry.location && (
            <div className="tinyMapContainer">
                <MapContainer center={entry.location as LatLngExpression} zoom={13}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={entry.location as LatLngExpression} />
                </MapContainer>
            </div>
        )}
        <IconButton name="expand_content" text="" onClick={onExpand} />
    </div>
}