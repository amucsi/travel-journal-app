import { useEffect, useState } from "preact/hooks";
import { IconButton } from "./IconButton";

/**
 * The ChangeThemeButton is an IconButton that changes the theme of the app
 * It also contains the logic for changing the theme
 *
 * @export
 * @return TSX button theme change element
 */
export function ChangeThemeButton() {
    const [isLightMode, setIsLightMode] = useState<boolean>(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "light";
    });

    /**
     * Updates isLightMode variable and sets the new value in localStorage
     *
     */
    function toggleTheme() {
        const newTheme = isLightMode ? "dark" : "light";
        setIsLightMode(!isLightMode);
        localStorage.setItem("theme", newTheme);
    }

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", isLightMode ? "light" : "dark");
    }, [isLightMode]);

    return <div>
        <IconButton name="light_mode" text="Change theme" onClick={toggleTheme} />
    </div>
}