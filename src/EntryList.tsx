import "./EntryList.less"
import { EntryPreview } from "./EntryPreview"

export function EntryList({ entries }) {
    return <div class="EntryList">
        {entries.map((entry) => (
            <EntryPreview key={entry.id} entry={entry} />
        ))}
    </div>
}