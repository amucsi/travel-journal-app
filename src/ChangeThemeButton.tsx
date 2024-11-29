import { useEffect, useState } from "preact/hooks";
import { IconButton } from "./IconButton";

export function ChangeThemeButton() {
    const [isLightMode, setIsLightMode] = useState<boolean>(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "light";
    });

    function toggleTheme() {
        const newTheme = !isLightMode ? "light" : "dark";
        setIsLightMode(!isLightMode);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    }

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", isLightMode ? "light" : "dark");
    }, [isLightMode]);

    return <div>
        <IconButton name="light_mode" text="Change theme" onClick={toggleTheme}/>
    </div>
}