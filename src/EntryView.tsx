import "./EntryView.less"
import { IconButton } from "./IconButton"

export function EntryView({ entry, onClose }) {
    return <div class="EntryView">
        <IconButton name="close" text="Close" onClick={onClose} />
        <h1>{entry.title}</h1>
        <p>{entry.content}</p>
    </div>
}