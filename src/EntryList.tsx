import "./EntryList.less"
import { EntryPreview } from "./EntryPreview"

export function EntryList({ entries, onPreviewClick, onDelete }) {
    return <div class="EntryList">
        {entries.map((entry) => (
            <EntryPreview
                key={entry.id}
                entry={entry}
                onClick={() => onPreviewClick(entry)}
                onDelete={onDelete}
            />
        ))}
    </div>
}