import { useEffect, useState } from "preact/hooks";
import { BottomBar } from "./BottomBar";
import { EntryList } from "./EntryList";
import "./Main.less"
import { TopBar } from "./TopBar";
import { AddEntryButton } from "./AddEntryButton";
import { Entry } from "./Entry";
import { EntryEditor } from "./EntryEditor";

export function Main() {
    let [entries, setEntries] = useState([]);
    let [selectedEntry, setSelectedEntry] = useState(null);
    let [isAddingEntry, setIsAddingEntry] = useState(false);
    let loggedInUser = sessionStorage.getItem("loggedInUser");

    useEffect(() => {
        let allEntries = JSON.parse(localStorage.getItem("entries") || "[]");
        setEntries(allEntries.filter(entry => entry.username === loggedInUser));
    }, [loggedInUser]);

    function addEntry(newEntry) {
        let updatedEntries = [...entries, newEntry];
        setEntries(updatedEntries);
        localStorage.setItem("entries", JSON.stringify([...JSON.parse(localStorage.getItem("entries") || "[]"), newEntry]));
        setIsAddingEntry(false);
    }

    function deleteEntry(id) {
        let updatedEntries = entries.filter(entry => entry.id !== id);
        setEntries(updatedEntries);
        localStorage.setItem("entries", JSON.stringify(updatedEntries));
    }

    return <div class="Main">
        <TopBar username={loggedInUser} />
        {/* <AddEntryButton onAddEntry={addEntry} /> */}
        {!isAddingEntry && <AddEntryButton onAddEntry={() => setIsAddingEntry(true)} />}
        <div class="contentWrapper">
            {selectedEntry ? <Entry entry={selectedEntry} onClose={()=> setSelectedEntry(null)}/>
                            :
                            <EntryList entries={entries} onPreviewClick={setSelectedEntry} onDelete={deleteEntry}/>}
        </div>
        {isAddingEntry && <EntryEditor onSave={addEntry} onCancel={() => setIsAddingEntry(false)} />}
        <BottomBar />
    </div>
}