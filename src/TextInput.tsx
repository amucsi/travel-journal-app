import { forwardRef } from "preact/compat";
import "./TextInput.less"

export type TextInputProps = {
    value: string;
    onChange: (value: string) => void;
    type?: "text" | "password" | "email";
    placeholder?: string;
    onEnter?: () => void;
    autofocus?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput({ value, onChange, type, placeholder, onEnter, autofocus }: TextInputProps, ref) {
    return <div class="TextInput">
        <input type={type} value={value} onInput={e => onChange(e.currentTarget.value)}
            autofocus={autofocus}
            onKeyDown={onEnter ? e => {
                if (e.key === "Enter")
                    onEnter!();
            } : undefined}
            ref={ref}/>
        <label class={value ? "subsided" : undefined}>
            {placeholder}
        </label>
    </div>
});