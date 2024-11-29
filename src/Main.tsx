import { useEffect, useState } from "preact/hooks";
import { BottomBar } from "./BottomBar";
import { EntryList } from "./EntryList";
import "./Main.less"
import { TopBar } from "./TopBar";
import { AddEntryButton } from "./AddEntryButton";
import { EntryView } from "./EntryView";
import { EntryEditor } from "./EntryEditor";
import { EntryData } from "./EntryData";

/**
 * The Main component is responsible for showing the content of the user after logging in
 * The default view is the user's list of entries, a button for adding new entries and a bottom and topbar
 *
 * @export
 * @return TSX Main component showing the user's data
 */
export function Main() {
    let [entries, setEntries] = useState<EntryData[]>([]);
    let [selectedEntry, setSelectedEntry] = useState(null);
    let [isAddingEntry, setIsAddingEntry] = useState(false);
    let loggedInUser = sessionStorage.getItem("loggedInUser");

    useEffect(() => { //filter the entries based on who is logged in
        let allEntries = JSON.parse(localStorage.getItem("entries") || "[]");
        setEntries(allEntries.filter((entry: EntryData) => entry.username === loggedInUser));
    }, [loggedInUser]);

    /**
     * Handles the logic of adding a new entry to the localStorage
     *
     * @param {EntryData} newEntry
     */
    function addEntry(newEntry: EntryData) {
        let updatedEntries = [...entries, newEntry];
        setEntries(updatedEntries);
        localStorage.setItem("entries", JSON.stringify([...JSON.parse(localStorage.getItem("entries") || "[]"), newEntry]));
        setIsAddingEntry(false);
    }

    /**
     * Handles deleting an entry based on the id given as a parameter
     *
     * @param {Date} id
     */
    function deleteEntry(id: Date) {
        let updatedEntries = entries.filter(entry => entry.id !== id);
        setEntries(updatedEntries);
        localStorage.setItem("entries", JSON.stringify(updatedEntries));
    }

    return <div>
        <TopBar username={loggedInUser} />
        <div class="Main">
            {!isAddingEntry && <AddEntryButton onAddEntry={() => setIsAddingEntry(true)} />}
            {!isAddingEntry && <div>
                {selectedEntry ? <EntryView entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
                    :
                    <EntryList entries={entries} onPreviewClick={setSelectedEntry} onDelete={deleteEntry} />}
            </div>}
            {isAddingEntry && <EntryEditor onSave={addEntry} onCancel={() => setIsAddingEntry(false)} />}
        </div>
        <BottomBar />
    </div>
}