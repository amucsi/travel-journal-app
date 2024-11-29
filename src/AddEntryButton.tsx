import "./AddEntryButton.less";
import { IconButton } from "./IconButton";

/**
 * The button responsible for adding a new entry to the journal
 * It's floating above all other content in the Main component
 *
 * @export
 * @param {{ onAddEntry: () => void }} { onAddEntry }
 * @return TSX IconButton component with special styling
 */
export function AddEntryButton({ onAddEntry }: { onAddEntry: () => void }) {
    return <div class="AddEntryButton">
        <IconButton name="add" text="Write new Entry" onClick={onAddEntry} />
    </div>
}