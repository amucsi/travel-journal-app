import { EntryData } from "./EntryData";
import "./EntryList.less"
import { EntryPreview } from "./EntryPreview"

export type EntryListProps = {
    entries: EntryData[];
    onPreviewClick: (e: EntryData) => void;
    onDelete: (id: Date) => void;
}

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