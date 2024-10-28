import "./Entry.less"
import { IconButton } from "./IconButton"

export function Entry({entry, onClose}) {
    return <div class="Entry">
        <IconButton name="close" text="Close" onClick={onClose}/>
        <h1>{entry.title}</h1>
        <p>{entry.content}</p>
    </div>
}