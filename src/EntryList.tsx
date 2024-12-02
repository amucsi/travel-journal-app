import { EntryData } from "./EntryData";
import "./EntryList.less"
import { EntryPreview } from "./EntryPreview"


/**
 * Props for EntryList
 * entries are the users' entries, onPreviewClick display the full entry
 * onDelete deletes the specific entry
 */
export type EntryListProps = {
    entries: EntryData[];
    onPreviewClick: (e: EntryData) => void;
    onDelete: (id: Date) => void;
}

/**
 * The scrollable list element containing the EntryPreview components
 * Converts the array of entries into EntryPreviews
 *
 * @export
 * @param {EntryListProps} { entries, onPreviewClick, onDelete }
 * @return TSX EntryList element containing EntryPreviews
 */
export function EntryList({ entries, onPreviewClick, onDelete }: EntryListProps) {
    return <div class="EntryList">
        {entries.map((entry: EntryData) => (
            <EntryPreview
                key={entry.id}
                entry={entry}
                onExpand={() => onPreviewClick(entry)}
                onDelete={onDelete}
            />
        ))}
    </div>
}