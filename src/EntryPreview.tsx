import { useState } from "preact/hooks";
import "./EntryPreview.less"

export function EntryPreview({ entry }) {
    const [showFull, setShowFull] = useState(false);
    const previewContent = entry.content.split(" ").slice(0, 20).join(" ") + "...";

    return <div class="EntryPreview" onClick={() => setShowFull(!showFull)}>
        <h3>{entry.title}</h3>
        <p class="previewText">{previewContent}</p>
    </div>
}