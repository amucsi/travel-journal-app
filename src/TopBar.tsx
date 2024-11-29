import { IconButton } from "./IconButton"
import "./TopBar.less"
import { ChangeThemeButton } from "./ChangeThemeButton";

/**
 * The TopBar component is the bar that appear at the top of the page
 * It display the name of the logged in user and the date
 * It also contains the logout button which returns the user to the login screen
 *
 * @export
 * @param {{ username: string }} { username }
 * @return TSX header element with logout functionality
 */
export function TopBar({ username }: { username: string }) {
    function logout() {
        sessionStorage.removeItem('loggedInUser');
        window.location.reload();
    }

    return <header class="TopBar">
        <span>Welcome, {username}!</span>
        <span>{new Date().toLocaleDateString()}</span>
        <ChangeThemeButton/>
        <IconButton name="logout" text="Logout" onClick={logout} />
    </header>
}