import "./EntryView.less"
import { IconButton } from "./IconButton"

export function EntryView({ entry, onClose }) {
    return <div class="EntryView">
        <IconButton name="close" text="Close" onClick={onClose} />
        <h1>{entry.title}</h1>
        <p class="date">{entry.date}</p>
        <p>{entry.content}</p>
        <div class="media-container">
            {entry.images?.length > 0 &&
                entry.images.map((image, index) => (
                    <img key={index} src={image} alt={`Image ${index + 1}`} />
                ))}
            {entry.videos?.length > 0 &&
                entry.videos.map((video, index) => (
                    <video key={index} src={video} controls />
                ))}
            {entry.images?.length === 0 && entry.videos?.length === 0 && (
                <p>No media attached</p>
            )}
        </div>
    </div>
}