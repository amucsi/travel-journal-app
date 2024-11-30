import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { EntryData } from "./EntryData";
import "./EntryPreview.less"
import { IconButton } from "./IconButton";
import { LatLngExpression } from "leaflet";
import { LeafletMapContainer } from "./LeafletMapContainer";

export type EntryPreviewProps = {
    entry: EntryData;
    onExpand: () => void;
    onDelete: (d: Date) => void;
}

/**
 * The EntryPreview element shows a preview of an entry in a card format
 * It shows the title, content (shortened to 20 words), location and media of an entry
 * It contains a button to delete an entry and expand it into fullscreen view
 *
 * @export
 * @param {EntryPreviewProps} { entry, onExpand, onDelete }
 * @return JSX EntryPreview card styled component
 */
export function EntryPreview({ entry, onExpand, onDelete }: EntryPreviewProps) {
    const previewContent = entry.content ? entry.content.split(" ").slice(0, 20).join(" ") + "..." : "";

    /**
     * Shows a pop-up alert asking to confirm deletion
     *
     * @param e - click event
     */
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
                    <video src={entry.videos[0]} controls autoplay class="mediaThumbnail" />
                ) : (undefined
                    //<p class="noMediaMessage">No media attached</p>
                )}
            </div>

            {entry.location && (
                <div class="tinyMapContainer">
                    <LeafletMapContainer
                        center={entry.location as LatLngExpression}
                        zoom={7}
                        marker={entry.location as LatLngExpression}
                    />
                </div>
            )}
        </div>
        <IconButton name="expand_content" text="" onClick={onExpand} />
    </div>
}