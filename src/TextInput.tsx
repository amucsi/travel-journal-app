import { forwardRef } from "preact/compat";
import "./TextInput.less"

/**
 * value is the value of the input, onChange the method that gets called when value changes
 * type is the type of the text input, placeholder is a placeholder message, it may be null
 * onEnter and autofocus are self-explanatory
 */
export type TextInputProps = {
    value: string;
    onChange: (value: string) => void;
    type?: "text" | "password" | "email";
    placeholder?: string;
    onEnter?: () => void;
    autofocus?: boolean;
}

/**
 * The TextInput is a customizable input where the user can type text
 * The component is wrapped in a forwardRef to allow the use of autofocus
 * 
 * @export
 * @param {TextInputProps, ref}
 * @return TSX input field with label
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput({ value, onChange, type, placeholder, onEnter, autofocus }: TextInputProps, ref) {
    return <div class="TextInput">
        <input type={type} value={value} onInput={e => onChange(e.currentTarget.value)}
            autofocus={autofocus}
            onKeyDown={onEnter ? e => {
                if (e.key === "Enter")
                    onEnter!();
            } : undefined}
            ref={ref} />
        <label class={value ? "subsided" : undefined}>
            {placeholder}
        </label>
    </div>
});