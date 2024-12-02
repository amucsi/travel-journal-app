import "./IconButton.less"

/**
 * Props for IconButton
 * name is the material symbol icon name, text is the button text
 * onClick is self-explanatory
 */
export type IconButtonProps = {
    name: string;
    text: string;
    onClick: () => void;
}

/**
 * The IconButton element returns a button with a Google Material Symbol icon and some text
 *
 * @export
 * @param {IconButtonProps} { name, text, onClick }
 * @return TSX button component with icon and text
 */
export function IconButton({ name, text, onClick }: IconButtonProps) {
    return <button type="button" onClick={onClick} class="IconButton">
        <span class="material-symbols-outlined">
            {name}
        </span>
        {text}
    </button>
}