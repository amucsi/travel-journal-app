import "./AddEntryButton.less";
import { IconButton } from "./IconButton";

export function AddEntryButton({ onAddEntry }) {
    return <div class="AddEntryButton">
        <IconButton name="add" text="Write new Entry" onClick={onAddEntry} />
    </div>
}