import "./IconButton.less"

export function IconButton({ name, text, onClick }: { name: string, text: string, onClick: () => void }) {
    return <button type="button" onClick={onClick} class="IconButton">
        <span class="material-symbols-outlined">
            {name}
        </span>
        {text}
    </button>
}