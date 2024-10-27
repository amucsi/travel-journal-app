import { useEffect, useState } from "preact/hooks";
import { BottomBar } from "./BottomBar";
import { EntryList } from "./EntryList";
import "./Main.less"
import { TopBar } from "./TopBar";
import { AddEntryButton } from "./AddEntryButton";

export function Main() {
    let [entries, setEntries] = useState([]);
    let loggedInUser = sessionStorage.getItem("loggedInUser");

    useEffect(() => {
        const allEntries = JSON.parse(localStorage.getItem("entries") || "[]");
        setEntries(allEntries.filter(entry => entry.username === loggedInUser));
    }, [loggedInUser]);

    function addEntry(newEntry) {
        const updatedEntries = [...entries, newEntry];
        setEntries(updatedEntries);
        localStorage.setItem("entries", JSON.stringify([...JSON.parse(localStorage.getItem("entries") || "[]"), newEntry]));
    }

    return <div class="Main">
        <TopBar username="Faszi" />
        <div class="contentWrapper">
            <EntryList entries={entries} />
            <AddEntryButton onAddEntry={addEntry} />
        </div>
        <BottomBar />
    </div>
}