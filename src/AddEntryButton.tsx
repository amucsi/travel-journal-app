import { useState } from "preact/hooks";
import "./AddEntryButton.less";
import { IconButton } from "./IconButton";

export function AddEntryButton({ onAddEntry }) {
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    function handleAddEntry() {
        const newEntry = {
            id: Date.now(),
            title,
            content,
            username: sessionStorage.getItem("loggedInUser"),
        };
        onAddEntry(newEntry);
        setShowForm(false);
        setTitle("");
        setContent("");
    }

    function handleInputChange(event: Event, setValue: React.Dispatch<React.SetStateAction<string>>) {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement;
        setValue(target.value);
    }

    return <>
        <IconButton name="add" text="" onClick={() => setShowForm(true)} />
        {showForm && (
            <div class="entryForm">
                <input type="text" placeholder="Title" value={title} onChange={(e) => handleInputChange(e, setTitle)} />
                <textarea placeholder="Content" value={content} onChange={(e) => handleInputChange(e, setContent)} />
                <button onClick={handleAddEntry}>Add Entry</button>
            </div>
        )}
    </>
}