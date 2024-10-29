import "./EntryPreview.less"
import { IconButton } from "./IconButton";

export function EntryPreview({ entry, onClick, onDelete }) {
    const previewContent = entry.content.split(" ").slice(0, 20).join(" ") + "...";

    function handleDeleteClick(e) {
        e.stopPropagation();
        if (confirm("Are you sure you want to delete this entry?")) {
            onDelete(entry.id);
        }
    }

    return <div class="EntryPreview">
        <span class="date">{entry.date}</span>
        <h3>{entry.title}</h3>
        <button type="button" onClick={handleDeleteClick}>
            <span class="material-symbols-outlined">
                delete
            </span>
        </button>
        <p class="previewText">{previewContent}</p>
        <IconButton name="expand_content" text="" onClick={onClick} />
    </div>
}