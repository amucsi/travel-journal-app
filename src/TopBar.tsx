import { IconButton } from "./IconButton"
import "./TopBar.less"

export function TopBar({ username }: { username: string }) {
    function logout() {
        sessionStorage.removeItem('loggedInUser');
        window.location.reload();
    }

    return <header class="TopBar">
        <span>Welcome, {username}!</span>
        <span>{new Date().toLocaleDateString()}</span>
        <IconButton name="logout" text="Logout" onClick={logout} />
    </header>
}